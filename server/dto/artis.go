package dto

type ArtisResponse struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Old         int    `json:"old"`
	Type        string `json:"type"`
	StartCareer int    `json:"start_career"`
}

type CreateArtisRequest struct {
	Name        string `json:"name" form:"name" validate:"required"`
	Old         int    `json:"old" form:"old" validate:"required"`
	Type        string `json:"type" form:"type" validate:"required"`
	StartCareer int    `json:"start_career" form:"start_career" validate:"required"`
}

type UpdateArtisRequest struct {
	Name        string `json:"name" form:"name"`
	Old         int    `json:"old" form:"old"`
	Type        string `json:"type" form:"type"`
	StartCareer int    `json:"start_career" form:"start_career"`
}
