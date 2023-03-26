package controllers

import (
	"dumbsound/dto"
	"dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/repositories"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type transactionControl struct {
	TransactionRepository repositories.TransactionRepository
}

func ControlTransaction(TransactionRepository repositories.TransactionRepository) *transactionControl {
	return &transactionControl{TransactionRepository}
}

func (h *transactionControl) FindTransactions(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "find success", Data: transaction})
}

func (h *transactionControl) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "get success", Data: respTransaction(transaction)})
}

func (h *transactionControl) CreateTransaction(c echo.Context) error {
	request := new(dto.CreateTransactionRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// convert time to string
	dateNow := time.Now()
	sDate := dateNow.Format("02 January 2006")

	// get user FROM JWT TOKEN
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	// create ID
	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	// total price
	totalPrice := 3000

	// data form pattern submit to pattern entity db transaction
	transaction := models.Transaction{
		ID:         transactionId,
		StartDate:  sDate,
		Status:     "pending",
		TotalPrice: totalPrice,
		Active:     request.Active,
		UserID:     int(userId),
	}

	dataTransactions, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}



	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataTransactions.ID),
			GrossAmt: int64(dataTransactions.TotalPrice),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransactions.User.Fullname,
			Email: dataTransactions.User.Email,
		},
	}

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, result.SuccessResult{Status: "created success", Data: snapResp})
}

func (h *transactionControl) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_id, _ := strconv.Atoi(orderId)

	fmt.Print("payload: ", notificationPayload)

	transaction, _ := h.TransactionRepository.GetTransaction(order_id)
	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("pending", order_id)
		} else if fraudStatus == "accept" {
			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", order_id)
	} else if transactionStatus == "deny" {
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "pending" {
		h.TransactionRepository.UpdateTransaction("pending", order_id)
	}

	return c.JSON(http.StatusOK, result.SuccessResult{Status: "transaction snap success", Data: notificationPayload})
}

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "Waysbeans <waysbeans.admin@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var totalPrice = strconv.Itoa(transaction.TotalPrice)
		var isActive = strconv.Itoa(transaction.Active)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", "tommymh21@gmail.com")
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
			<html lang="en">
					<head>
					<meta charset="UTF-8" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Document</title>
					<style>
							h1 {
							color: brown;
							}
					</style>
					</head>
					<body>
					<h2>Product payment :</h2>
					<ul style="list-style-type:none;">
							<li>Active : <b>%s</b></li>
							<li>Total payment: Rp.%s</li>
							<li>Status : <b>%s</b></li>
					</ul>
					</body>
			</html>`, isActive, totalPrice, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + CONFIG_AUTH_EMAIL)
	}
}

func respTransaction(u models.Transaction) dto.TransactionResponse {
	return dto.TransactionResponse{
		ID:        u.ID,
		UserID:    u.UserID,
		StartDate: u.StartDate,
		DueDate:   u.DueDate,
		Status:    u.Status,
		Active:    u.Active,
	}
}
