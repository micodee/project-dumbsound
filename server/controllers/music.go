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

type musicControl struct {
	MusicRepository repositories.MusicRepository
}

func ControlMusic(MusicRepository repositories.MusicRepository) *musicControl {
	return &musicControl{MusicRepository}
}

func (h *musicControl) FindMusic(c echo.Context) error {
	musics, err := h.MusicRepository.FindMusic()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "find success", Data: musics})
}

func (h *musicControl) GetMusics(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	music, err := h.MusicRepository.GetMusics(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "get success", Data: respMusic(music)})
}

func (h *musicControl) CreateMusic(c echo.Context) error {
	request := new(dto.CreateMusicRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// data form pattern submit to pattern entity db music
	music := models.Music{
		Title:     request.Title,
		Year:      request.Year,
		Thumbnail: request.Thumbnail,
		Attach:    request.Attach,
	}

	data, err := h.MusicRepository.CreateMusic(music)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "created success", Data: respMusic(data)})
}

func (h *musicControl) UpdateMusic(c echo.Context) error {
	request := new(dto.UpdateMusicRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	music, err := h.MusicRepository.GetMusics(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		music.Title = request.Title
	}
	if request.Year != 0 {
		music.Year = request.Year
	}
	if request.Thumbnail != "" {
		music.Thumbnail = request.Thumbnail
	}
	if request.Attach != "" {
		music.Attach = request.Attach
	}

	data, err := h.MusicRepository.UpdateMusic(music, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "updated success", Data: respMusic(data)})
}

func (h *musicControl) DeleteMusic(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.MusicRepository.GetMusics(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.MusicRepository.DeleteMusic(user, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: "deleted success", Data: respMusic(data)})
}

func respMusic(u models.Music) dto.MusicResponse {
	return dto.MusicResponse{
		ID:        u.ID,
		Title:     u.Title,
		Year:      u.Year,
		Thumbnail: u.Thumbnail,
		Attach:    u.Attach,
	}
}
