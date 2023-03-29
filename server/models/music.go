package models

import "time"

type Music struct {
	ID                int           `json:"id" gorm:"primary_key: auto_increment"`
	Title             string        `json:"title" gorm:"type: varchar(255)"`
	Year              int           `json:"year" gorm:"type: int"`
	Thumbnail         string        `json:"thumbnail" gorm:"type: varchar(255)"`
	ThumbnailPublicID string        `json:"thumb_public_id"`
	Attach            string        `json:"attach" gorm:"type: varchar(255)"`
	AttachPublicID    string        `json:"attach_public_id"`
	ArtisID           int           `json:"artis_id"`
	Artis             ArtisRelation `json:"artis" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt         time.Time     `json:"created_at"`
	UpdatedAt         time.Time     `json:"updated_at"`
}
