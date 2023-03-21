package database

import (
	"dumbsound/models"
	"dumbsound/pkg/mysql"
	"fmt"
)

func RunMigration() {
	err := mysql.ConnDB.AutoMigrate(
		&models.Music{},
		&models.Artis{},
		&models.User{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
