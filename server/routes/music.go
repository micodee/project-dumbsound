package routes

import (
	"dumbsound/controllers"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/labstack/echo/v4"
)

func MusicRoutes(e *echo.Group) {
	musicRepository := repositories.RepositoryMusic(mysql.ConnDB)
	h := controllers.ControlMusic(musicRepository)

	e.GET("/musics", h.FindMusic)
	e.GET("/music/:id", h.GetMusics)
	e.POST("/music", h.CreateMusic)
	e.PATCH("/music/:id", h.UpdateMusic)
	e.DELETE("/music/:id", h.DeleteMusic)
}
