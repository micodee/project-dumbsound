package controllers

import (
	"context"
	"dumbsound/dto"
	"dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/pkg/bcrypt"
	"dumbsound/repositories"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// SETUP CONTROL STRUC
type userControl struct {
	UserRepository repositories.UserRepository
	AuthRepository repositories.AuthRepository
}

// SETUP CONTROL FUNCTION
func ControlUser(UserRepository repositories.UserRepository, AuthRepository repositories.AuthRepository) *userControl {
	return &userControl{
		UserRepository: UserRepository,
		AuthRepository: AuthRepository,
	}
}

// FUNCTION FIND USER
func (h *userControl) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "find success", Data: users})
}

// FUNCTION GET USER BY ID
func (h *userControl) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "get success", Data: convUser(user)})
}

func (h *userControl) UpdateUser(c echo.Context) error {
	filePP := c.Get("photo_profile").(string)

	request := dto.UpdateUserRequest{
		Name: c.FormValue("fullname"),
		Email: c.FormValue("email"),
		Gender: c.FormValue("gender"),
		Phone: c.FormValue("phone"),
		Address: c.FormValue("address"),
		PhotoProfile: filePP,
	}

	// get user FROM JWT TOKEN
	userId := c.Get("userLogin").(jwt.MapClaims)["id"].(float64)

	user, err := h.UserRepository.GetUser(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		user.Fullname = request.Name
	}

	if request.Email != "" {
		user.Email = request.Email
	}

	if request.Password != "" {
		user.Password = password
	}

	if request.Gender != "" {
		user.Gender = request.Gender
	}

	if request.Phone != "" {
		user.Phone = request.Phone
	}

	if request.Address != "" {
		user.Address = request.Address
	}

	if filePP != "" {
		// cloudinary
		var ctx = context.Background()
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")

		// cloudinary upload new image
		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
		resp, err := cld.Upload.Upload(ctx, filePP, uploader.UploadParams{Folder: "dumbsound/profile"})
		if err != nil {
			fmt.Println(err.Error())
		}
		fmt.Println(resp.SecureURL + " update successfully")

		user.PhotoProfile = resp.SecureURL
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, result.SuccessResult{Status: "updated success", Data: convUser(data)})
}

func (h *userControl) DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.UserRepository.DeleteUser(user, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, result.SuccessResult{Status: "deleted success", Data: convUser(data)})
}

func convUser(u models.User) dto.UserResponse {
	return dto.UserResponse{
		ID:           u.ID,
		Name:         u.Fullname,
		Email:        u.Email,
		Password:     u.Password,
		Gender:       u.Gender,
		Phone:        u.Phone,
		Address:      u.Address,
		PhotoProfile: u.PhotoProfile,
	}
}
