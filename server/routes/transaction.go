package routes

import (
	"dumbsound/controllers"
	"dumbsound/pkg/middleware"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTrasaction(mysql.ConnDB)
	h := controllers.ControlTransaction(transactionRepository)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.PATCH("/transaction/:id", middleware.Auth(middleware.Admin(h.UpdateTransaction)))
	e.DELETE("/transaction/:id", middleware.Auth(middleware.Admin(h.DeleteTransaction)))
}
