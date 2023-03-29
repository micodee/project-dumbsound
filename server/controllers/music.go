package controllers

import (
	"context"
	"dumbsound/dto"
	"dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/repositories"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
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
	// get file IMAGE
	fileImage := c.Get("image").(string)
	fileMusic := c.Get("music").(string)
	fmt.Println(fileImage, "upload successfully")
	fmt.Println(fileMusic, "upload successfully")

	year, _ := strconv.Atoi(c.FormValue("year"))
	artis, _ := strconv.Atoi(c.FormValue("artis_id"))

	// get request
	request := dto.CreateMusicRequest{
		Title:     c.FormValue("title"),
		Year:      year,
		Thumbnail: fileImage,
		Attach:    fileMusic,
		ArtisID:   artis,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// cloudinary
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// cloudinary
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	cloudThumb, err := cld.Upload.Upload(ctx, fileImage, uploader.UploadParams{Folder: "dumbsound/thumbnail"})
	cloudMusic, err := cld.Upload.Upload(ctx, fileMusic, uploader.UploadParams{Folder: "dumbsound/music"})
	if err != nil {
		fmt.Println(err.Error())
	}

	// data form pattern submit to pattern entity db music
	music := models.Music{
		Title:             request.Title,
		Year:              request.Year,
		Thumbnail:         cloudThumb.SecureURL,
		ThumbnailPublicID: cloudThumb.PublicID,
		Attach:            cloudMusic.SecureURL,
		AttachPublicID:    cloudMusic.PublicID,
		ArtisID:           request.ArtisID,
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

	music, err := h.MusicRepository.GetMusics(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

		// cloudinary
		var ctx = context.Background()
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")
	
		// create a new cloudinary
		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	
		fileNameThumb := music.ThumbnailPublicID
		fileNameMusic := music.AttachPublicID
		delMusic, err := cld.Upload.Destroy(ctx, uploader.DestroyParams{PublicID: fileNameMusic})
		delThumb, err := cld.Upload.Destroy(ctx, uploader.DestroyParams{PublicID: fileNameThumb})
		if err != nil {
			fmt.Println("Failed to delete file"+fileNameThumb+":", err)
			return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
		}
		if err != nil {
			fmt.Println("Failed to delete file"+fileNameMusic+":", err)
			return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
		}
		fmt.Println(fileNameThumb+" deleted successfully", delMusic)
		fmt.Println(fileNameThumb+" deleted successfully", delThumb)

	data, err := h.MusicRepository.DeleteMusic(music, id)
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
