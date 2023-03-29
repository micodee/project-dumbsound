package models

import "time"

type Artis struct {
	ID          int       `json:"id" gorm:"primary_key: auto_increment"`
	Name        string    `json:"name" gorm:"type: varchar(255)"`
	Old         int       `json:"old" gorm:"type: int"`
	Type        string    `json:"type" gorm:"type: varchar(255)"`
	StartCareer int       `json:"start_career" gorm:"type: int"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type ArtisRelation struct {
	ID          int    `json:"id" gorm:"primary_key: auto_increment" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Name        string `json:"name"`
	Old         int    `json:"old"`
	Type        string `json:"type"`
	StartCareer int    `json:"start_career"`
}

// so as not to create a new relation table
func (ArtisRelation) TableName() string {
	return "artis"
}
