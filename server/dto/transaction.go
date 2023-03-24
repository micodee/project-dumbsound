package dto

type TransactionResponse struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	StartDate string `json:"start_date"`
	DueDate   string `json:"due_date"`
	Status    string `json:"status"`
	Active    int    `json:"active"`
}

type CreateTransactionRequest struct {
	Status    string `json:"status" form:"status"`
	Active    int    `json:"active" form:"active"`
}

type UpdateTransactionRequest struct {
	Status    string `json:"status" form:"status"`
	Active    int    `json:"active" form:"active"`
}
