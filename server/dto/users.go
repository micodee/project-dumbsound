package dto

type UserResponse struct {
	ID           int    `json:"id"`
	Name         string `json:"fullName"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	Gender       string `json:"gender"`
	Phone        string `json:"phone"`
	Address      string `json:"address"`
	PhotoProfile string `json:"photo"`
}

type UpdateUserRequest struct {
	Name         string `json:"name" form:"name"`
	Email        string `json:"email" form:"email"`
	Password     string `json:"password" form:"password"`
	Gender       string `json:"gender" form:"gender"`
	Phone        string `json:"phone" form:"phone"`
	Address      string `json:"address" form:"address"`
	PhotoProfile string `json:"photo" form:"photo_profile"`
}
