package dto

type UserResponse struct {
	ID       int                    `json:"id"`
	Name     string                 `json:"fullName"`
	Email    string                 `json:"email"`
	Password string                 `json:"password"`
}

type UpdateUserRequest struct {
	Name     string `json:"name" form:"name"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
}