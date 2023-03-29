package controllers

import (
	"dumbsound/dto"
	"dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type artisControl struct {
	ArtisRepository repositories.ArtisRepository
}

func ControlArtis(ArtisRepository repositories.ArtisRepository) *artisControl {
	return &artisControl{ArtisRepository}
}

func (h *artisControl) FindArtis(c echo.Context) error {
	artis, err := h.ArtisRepository.FindArtis()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "find success", Data: artis})
}

func (h *artisControl) GetArtis(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	artis, err := h.ArtisRepository.GetArtis(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "get success", Data: respArtis(artis)})
}

func (h *artisControl) CreateArtis(c echo.Context) error {
	request := new(dto.CreateArtisRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// data form pattern submit to pattern entity db artis
	artis := models.Artis{
		Name:        request.Name,
		Old:         request.Old,
		Type:        request.Type,
		StartCareer: request.StartCareer,
	}

	data, err := h.ArtisRepository.CreateArtis(artis)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "created success", Data: respArtis(data)})
}

func (h *artisControl) UpdateArtis(c echo.Context) error {
	request := new(dto.UpdateArtisRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	artis, err := h.ArtisRepository.GetArtis(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		artis.Name = request.Name
	}
	if request.Old != 0 {
		artis.Old = request.Old
	}
	if request.Type != "" {
		artis.Type = request.Type
	}
	if request.StartCareer != 0 {
		artis.StartCareer = request.StartCareer
	}

	data, err := h.ArtisRepository.UpdateArtis(artis, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "updated success", Data: respArtis(data)})
}

func (h *artisControl) DeleteArtis(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	artis, err := h.ArtisRepository.GetArtis(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ArtisRepository.DeleteArtis(artis, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "deleted success", Data: respArtis(data)})
}

func respArtis(u models.Artis) dto.ArtisResponse {
	return dto.ArtisResponse{
		ID:          u.ID,
		Name:        u.Name,
		Old:         u.Old,
		Type:        u.Type,
		StartCareer: u.StartCareer,
	}
}
