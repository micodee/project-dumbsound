package dto

type RegisterRequest struct {
	Fullname string `json:"fullname" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Gender   string `json:"gender" validate:"required"`
	Phone    string `json:"phone" validate:"required"`
	Address  string `json:"address" validate:"required"`
	IsAdmin  bool   `json:"is_admin"`
}

type RegisterRespon struct {
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Gender   string `json:"gender"`
	Phone    string `json:"phone"`
	Address  string `json:"address"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type LoginResponse struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
	Token string `json:"token"`
}
