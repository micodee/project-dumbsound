package dto

type MusicResponse struct {
	ID                int    `json:"id"`
	Title             string `json:"title"`
	Year              int    `json:"year"`
	Thumbnail         string `json:"thumbnail"`
	ThumbnailPublicID string `json:"thumb_public_id"`
	Attach            string `json:"attach"`
	AttachPublicID    string `json:"attach_public_id"`
}

type CreateMusicRequest struct {
	Title     string `json:"title" form:"title" validate:"required"`
	Year      int    `json:"year" form:"year" validate:"required"`
	Thumbnail string `json:"thumbnail" form:"thumbnail" validate:"required"`
	Attach    string `json:"attach" form:"attach" validate:"required"`
	ArtisID   int    `json:"artis_id" form:"artis_id"`
}

type UpdateMusicRequest struct {
	Title     string `json:"title" form:"title"`
	Year      int    `json:"year" form:"year"`
	Thumbnail string `json:"thumbnail" form:"thumbnail"`
	Attach    string `json:"attach" form:"attach"`
}
