package dto

type MusicResponse struct {
	ID        int    `json:"id"`
	Title     string `json:"title" form:"title" validate:"required"`
	Year      int    `json:"year" form:"year" validate:"required"`
	Thumbnail string `json:"thumbnail" form:"thumbnail" validate:"required"`
	Attach    string `json:"attach" form:"attach" validate:"required"`
}

type CreateMusicRequest struct {
	Title     string `json:"title" form:"title" validate:"required"`
	Year      int    `json:"year" form:"year" validate:"required"`
	Thumbnail string `json:"thumbnail" form:"thumbnail" validate:"required"`
	Attach    string `json:"attach" form:"attach" validate:"required"`
}

type UpdateMusicRequest struct {
	Title     string `json:"title" form:"title"`
	Year      int    `json:"year" form:"year"`
	Thumbnail string `json:"thumbnail" form:"thumbnail"`
	Attach    string `json:"attach" form:"attach"`
}
