package models

import "time"

type Artis struct {
	ID          int       `json:"id"`
	Name        string    `json:"name" gorm:"type: varchar(255)"`
	Old         int       `json:"old" gorm:"type: int"`
	Type        string    `json:"type" gorm:"type: varchar(255)"`
	StartCareer int       `json:"start_career" gorm:"type: int"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
