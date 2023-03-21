package models

import "time"

type Music struct {
	ID        int       `json:"id"`
	Title     string    `json:"title" gorm:"type: varchar(255)"`
	Year      int       `json:"year" gorm:"type: int"`
	Thumbnail string    `json:"thumbnail" gorm:"type: varchar(255)"`
	Attach    string    `json:"attach" gorm:"type: varchar(100)"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
