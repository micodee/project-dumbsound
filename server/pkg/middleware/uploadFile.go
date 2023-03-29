package middleware

import (
	"io"
	"io/ioutil"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var method = c.Request().Method
		fileImg, imageErr := c.FormFile("thumbnail")
		fileMusic, musicErr := c.FormFile("attach")

		if imageErr != nil {
			if method == "PATCH" && imageErr.Error() == "http: no such file" {
				c.Set("image", "")
				return next(c)
			}
			if method == "POST" && imageErr.Error() == "http: no such file" {
				c.Set("image", "")
				return next(c)
			}
			return c.JSON(http.StatusBadRequest, imageErr.Error())
		}

		if musicErr != nil {
			if method == "PATCH" && musicErr.Error() == "http: no such file" {
				c.Set("music", "")
				return next(c)
			}
			if method == "POST" && musicErr.Error() == "http: no such file" {
				c.Set("music", "")
				return next(c)
			}
			return c.JSON(http.StatusBadRequest, musicErr.Error())
		}

		img := filepath.Ext(fileImg.Filename)
		if img == ".png" || img == ".jpg" || img == ".jpeg" || img == ".webp" {
			src, imageErr := fileImg.Open()
			if imageErr != nil {
				return c.JSON(http.StatusBadRequest, imageErr)
			}
			defer src.Close()

			tempFile, imageErr := ioutil.TempFile("uploads", "image-*.png")
			if imageErr != nil {
				return c.JSON(http.StatusBadRequest, imageErr)
			}
			defer tempFile.Close()

			if _, imageErr = io.Copy(tempFile, src); imageErr != nil {
				return c.JSON(http.StatusBadRequest, imageErr)
			}

			data := tempFile.Name()

			c.Set("image", data)
		} else {
			return c.JSON(http.StatusBadRequest, "The file extension is wrong. Allowed file extensions are images (.png, .jpg, .jpeg, .webp)")
		}

		audio := filepath.Ext(fileMusic.Filename)
		if audio == ".mp3" || audio == ".wav" || audio == ".flac" || audio == ".m4a" {
			src, musicErr := fileMusic.Open()
			if musicErr != nil {
				return c.JSON(http.StatusBadRequest, musicErr)
			}
			defer src.Close()

			tempFile, musicErr := ioutil.TempFile("uploads", "music-*.mp3")
			if musicErr != nil {
				return c.JSON(http.StatusBadRequest, musicErr)
			}
			defer tempFile.Close()

			if _, musicErr = io.Copy(tempFile, src); musicErr != nil {
				return c.JSON(http.StatusBadRequest, musicErr)
			}

			data := tempFile.Name()

			c.Set("music", data)
		} else {
			return c.JSON(http.StatusBadRequest, "The file extension is wrong. Allowed file extensions are audio files (.mp3, .wav, .flac, .m4a)")
		}

		return next(c)
	}
}