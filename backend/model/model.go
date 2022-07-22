package model

import (
	"cv/database"

	"gorm.io/gorm"
)

type Person struct {
	gorm.Model
	Name        string       `json:"name"`
	Title       string       `json:"title"`
	Email       string       `json:"email"`
	Skills      []Skill      `json:"skills"`
	Experiences []Experience `json:"experiences"`
}

type Skill struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Level       string `json:"level"`
	Type        string `json:"type"`
	PersonId    uint   `json:"person_id"`
}

type Experience struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	From        string `json:"from"`
	To          string `json:"to"`
	Type        string `json:"type"`
	PersonId    uint   `json:"person_id"`
}

func init() {
	db := database.GetDB()
	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Skill{})
	db.AutoMigrate(&Experience{})
}

func CreatePerson(person *Person) *Person {
	db := database.GetDB()
	db.Create(&person)
	return person
}

func GetPerson(id int) *Person {
	db := database.GetDB()
	var person Person
	db.Where("ID = ?", id).Find(&person)
	db.Model(&person).Association("Skills").Find(&person.Skills)
	db.Model(&person).Association("Experiences").Find(&person.Experiences)
	return &person
}
