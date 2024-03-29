package dto

type TransactionResponse struct {
	ID         int    `json:"id"`
	UserID     int    `json:"user_id"`
	StartDate  string `json:"start_date"`
	DueDate    string `json:"due_date"`
	Status     string `json:"status"`
	Active     int    `json:"active"`
	TotalPrice int    `json:"total_price"`
}

type CreateTransactionRequest struct {
	Active     int    `json:"active" form:"active"`
	TotalPrice int    `json:"total_price" form:"total_price"`
	Fullname   string `json:"fullname"`
	Email      string `json:"email"`
}

type UpdateTransactionRequest struct {
	Active     int `json:"active" form:"active"`
	TotalPrice int `json:"total_price" form:"total_price"`
}
