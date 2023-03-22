package controllers

import (
	"dumbsound/dto"
	"dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
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

	// get user FROM JWT TOKEN
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	// data form pattern submit to pattern entity db transaction
	transaction := models.Transaction{
		StartDate: request.StartDate,
		DueDate:   request.DueDate,
		Attach:    request.Attach,
		Status:    request.Status,
		UserID:    int(userId),
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "created success", Data: respTransaction(data)})
}

func (h *transactionControl) UpdateTransaction(c echo.Context) error {
	request := new(dto.UpdateTransactionRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	if request.StartDate != "" {
		transaction.StartDate = request.StartDate
	}
	if request.DueDate != "" {
		transaction.DueDate = request.DueDate
	}
	if request.Attach != "" {
		transaction.Attach = request.Attach
	}
	if request.Status != "" {
		transaction.Status = request.Status
	}

	data, err := h.TransactionRepository.UpdateTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "updated success", Data: respTransaction(data)})
}

func (h *transactionControl) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "deleted success", Data: respTransaction(data)})
}

func respTransaction(u models.Transaction) dto.TransactionResponse {
	return dto.TransactionResponse{
		ID:        u.ID,
		StartDate: u.StartDate,
		DueDate:   u.DueDate,
		Attach:    u.Attach,
		Status:    u.Status,
	}
}