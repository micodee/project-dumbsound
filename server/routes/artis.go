package routes

import (
	"dumbsound/controllers"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/labstack/echo/v4"
)

func ArtisRoutes(e *echo.Group) {
	artisRepository := repositories.RepositoryArtis(mysql.ConnDB)
	h := controllers.ControlArtis(artisRepository)

	e.GET("/artis", h.FindArtis)
	e.GET("/artis/:id", h.GetArtis)
	e.POST("/artis", h.CreateArtis)
	e.PATCH("/artis/:id", h.UpdateArtis)
	e.DELETE("/artis/:id", h.DeleteArtis)
}
