# Running Project

## Frontend :
- React JS
- SCSS
- Bootstrap

## Backend :
- Golang (echo)
- Postgres
- Gorm
- JWT
- Midtrans (payment gateway)
- Cloudinary


## Deployment :
- Frontend Vercel https://dumbsound-two.vercel.app/
- Backend Railways

```bash
npm start
```

- Import and Setup the echo/middleware package for CORS

  > File: `main.go`

  - Import package

    ```go
    import (
      "fmt"

      "github.com/joho/godotenv"
      "github.com/labstack/echo/v4"
      "github.com/labstack/echo/v4/middleware"
    )
    ```

  - Setup for CORS

    ```go
	  e := echo.New()

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
      AllowOrigins: []string{"*"},
      AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
      AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
    }))

    mysql.DatabaseInit()
    database.RunMigration()

    routes.RouteInit(e.Group("/api/v1"))

    e.Static("/uploads", "./uploads")

    fmt.Println("server running localhost:5000")
    e.Logger.Fatal(e.Start("localhost:5000"))
    ```