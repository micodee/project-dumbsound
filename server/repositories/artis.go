package repositories

import (
	"dumbsound/models"

	"gorm.io/gorm"
)

type ArtisRepository interface {
	FindArtis() ([]models.Artis, error)
	GetArtis(ID int) (models.Artis, error)
	CreateArtis(artis models.Artis) (models.Artis, error)
	UpdateArtis(artis models.Artis, ID int) (models.Artis, error)
	DeleteArtis(artis models.Artis, ID int) (models.Artis, error)
}

func RepositoryArtis(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindArtis() ([]models.Artis, error) {
	var artis []models.Artis
	err := r.db.Find(&artis).Error
	return artis, err
}

func (r *repository) GetArtis(ID int) (models.Artis, error) {
	var artis models.Artis
	err := r.db.First(&artis, ID).Error
	return artis, err
}

func (r *repository) CreateArtis(artis models.Artis) (models.Artis, error) {
	err := r.db.Create(&artis).Error
	return artis, err
}

func (r *repository) UpdateArtis(artis models.Artis, ID int) (models.Artis, error) {
	err := r.db.Save(&artis).Error
	return artis, err
}

func (r *repository) DeleteArtis(artis models.Artis, ID int) (models.Artis, error) {
	err := r.db.Delete(&artis).Error
	return artis, err
}