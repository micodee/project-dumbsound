package routes

import "github.com/labstack/echo/v4"

func Routes(e *echo.Group) {
	AuthRoutes(e)
	UserRoutes(e)
	MusicRoutes(e)
	ArtisRoutes(e)
	TransactionRoutes(e)
}
