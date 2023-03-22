package controllers

import (
	"dumbsound/dto"
	"dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/pkg/bcrypt"
	jwtToken "dumbsound/pkg/jwt"
	"dumbsound/repositories"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// SETUP CONTROL STRUCT
type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

// SETUP CONTROL FUNCTION
func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

// FUNCTION REGISTER
func (h *handlerAuth) Register(c echo.Context) error {
	// get request form input
	request := new(dto.RegisterRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// validasi form request input
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// hashing password from req password
	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// create role
	var role = "user"
	if request.IsAdmin {
		role = "admin"
	}

	// give value to struct models user
	user := models.User{
		Fullname: request.Fullname,
		Email:    request.Email,
		Password: password,
		Gender:   request.Gender,
		Phone:    request.Phone,
		Address:  request.Address,
		Role:     role,
	}

	// run REPOSITORY register
	register, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "register success", Data: ResponAuth(register)})
}

func (h *handlerAuth) Login(c echo.Context) error {
	// get request form input
	request := new(dto.LoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}

	// check email
	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// check password
	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: "wrong email or password"})
	}

	// generate token create interface
	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["role"] = user.Role
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix() // 2 hours expired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	// login respon
	loginResponse := dto.LoginResponse{
		Name:  user.Fullname,
		Email: user.Email,
		Role:  user.Role,
		Token: token,
	}

	return c.JSON(http.StatusOK, result.SuccessResult{Status: "login success", Data: loginResponse})
}

// auth respon
func ResponAuth(u models.User) dto.RegisterRespon {
	return dto.RegisterRespon{
		Fullname: u.Fullname,
		Email:    u.Email,
		Password: u.Password,
		Gender:   u.Gender,
		Phone:    u.Phone,
		Address:  u.Address,
	}
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, result.SuccessResult{Status: "check user", Data: user})
}
