package models

import "time"

type Transaction struct {
	ID        int           `json:"id" gorm:"primary_key: auto_increment"`
	StartDate time.Time     `json:"start_date"`
	DueDate   time.Time     `json:"due_date"`
	UserID    int           `json:"user_id"`
	User      UsersRelation `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Attach    string        `json:"attach" gorm:"type: varchar(50)"`
	Status    string        `json:"status" gorm:"type: varchar(20)"`
}

type TransactionRelation struct {
	ID        int       `json:"id" gorm:"primary_key: auto_increment" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	StartDate time.Time `json:"start_date"`
	DueDate   time.Time `json:"due_date"`
	Attach    string    `json:"attach" gorm:"type: varchar(50)"`
	Status    string    `json:"status" gorm:"type: varchar(20)"`
	UserID    int       `json:"-"`
}

// so as not to create a new relation table
func (TransactionRelation) TableName() string {
	return "transactions"
}
