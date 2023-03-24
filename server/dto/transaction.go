package dto

type TransactionResponse struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	StartDate string `json:"start_date"`
	DueDate   string `json:"due_date"`
	Status    string `json:"status"`
	Active    string `json:"active"`
}

type CreateTransactionRequest struct {
	StartDate string `json:"start_date" form:"start_date"`
	DueDate   string `json:"due_date" form:"due_date"`
	Status    string `json:"status" form:"status"`
}

type UpdateTransactionRequest struct {
	StartDate string `json:"start_date" form:"start_date"`
	DueDate   string `json:"due_date" form:"due_date"`
	Status    string `json:"status" form:"status"`
}
