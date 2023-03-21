package routes

import (
	"dumbsound/controllers"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(mysql.ConnDB)
	h := controllers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
}
