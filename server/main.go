package main

import (
	"dumbsound/database"
	"dumbsound/pkg/mysql"
	"dumbsound/routes"
	"fmt"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	mysql.DatabaseInit()
	database.RunMigration()

	routes.Routes(e.Group("api/v1"))

	port := "8000"
	fmt.Println("server running on port", port)
	e.Logger.Fatal(e.Start("localhost:" + port))
}
