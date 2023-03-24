package main

import (
	"dumbsound/database"
	"dumbsound/pkg/mysql"
	"dumbsound/routes"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	mysql.DatabaseInit()
	database.RunMigration()

	routes.Routes(e.Group("api/v1"))
	e.Static("/uploads", "./uploads")

	port := os.Getenv("PORT")
	fmt.Println("server running on port", port)
	e.Logger.Fatal(e.Start(":" + port))
}
