# DumbSound

Dumbsound is a website designed to provide users with an immersive music listening experience. 
With Dumbsound, users can stream and enjoy their favorite music anytime, anywhere. Whether you are a music enthusiast or just looking for a convenient way to enjoy your favorite tunes, Dumbsound is the perfect platform for you.

This website was created using [Bootstrap](https://getbootstrap.com/) and [SCSS](https://sass-lang.com/) for styling, [React JS](https://react.dev/) for the frontend framework, [GO](https://go.dev/) for the backend with the [Echo](https://echo.labstack.com/) framework, [Gorm](https://gorm.io/) for querying the database, [PostgreSQL](https://postgresql.org/) as the database, and [Cloudinary](https://cloudinary.com/) as as the file storage.

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