package routes

import (
	"dumbsound/controllers"
	"dumbsound/pkg/middleware"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.ConnDB)
	AuthRepository := repositories.RepositoryAuth(mysql.ConnDB)
	h := controllers.ControlUser(userRepository, AuthRepository)

	e.GET("/users", middleware.Auth(h.FindUsers))
	e.GET("/user/:id", middleware.Auth(h.GetUser))
	e.PATCH("/user", middleware.Auth(h.UpdateUser))
	e.DELETE("/user/:id", middleware.Auth(middleware.Admin(h.DeleteUser)))
}
