package routes

import "github.com/labstack/echo/v4"

func Routes(e *echo.Group) {
	MusicRoutes(e)
	ArtisRoutes(e)
}
