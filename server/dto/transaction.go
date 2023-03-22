package dto

type TransactionResponse struct {
	ID        int    `json:"id"`
	StartDate string `json:"start_date"`
	DueDate   string `json:"due_date"`
	Attach    string `json:"attach"`
	Status    string `json:"status"`
}

type CreateTransactionRequest struct {
	StartDate string `json:"start_date" form:"start_date"`
	DueDate   string `json:"due_date" form:"due_date"`
	Attach    string `json:"attach" form:"attach"`
	Status    string `json:"status" form:"status"`
}

type UpdateTransactionRequest struct {
	StartDate string `json:"start_date" form:"start_date"`
	DueDate   string `json:"due_date" form:"due_date"`
	Attach    string `json:"attach" form:"attach"`
	Status    string `json:"status" form:"status"`
}
