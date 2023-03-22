package models

import "time"

type User struct {
	ID          int                   `json:"id" gorm:"primary_key: auto_increment"`
	Email       string                `json:"email" gorm:"type: varchar(100)"`
	Password    string                `json:"password" gorm:"type: varchar(255)"`
	Role        string                `json:"role" gorm:"type: varchar(255)"`
	Fullname    string                `json:"fullname" gorm:"type: varchar(50)"`
	Gender      string                `json:"gender" gorm:"type: varchar(20)"`
	Phone       string                `json:"phone" gorm:"type: varchar(20)"`
	Address     string                `json:"address" gorm:"type: varchar(255)"`
	Transaction []TransactionRelation `json:"transaction"`
	CreatedAt   time.Time             `json:"created_at"`
	UpdatedAt   time.Time             `json:"updated_at"`
}

// Associated with (Profile, Cart, Transaction)
type UsersRelation struct {
	ID       int    `json:"id" gorm:"primary_key: auto_increment"`
	Email    string `json:"email"`
	Fullname string `json:"fullname"`
}

func (UsersRelation) TableName() string {
	return "users"
}
