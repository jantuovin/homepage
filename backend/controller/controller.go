package controller

import (
	"cv/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreatePerson(c *fiber.Ctx) error {
	person := new(model.Person)
	if err := c.BodyParser(person); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Bad request")
	}

	model.CreatePerson(person)
	if err := c.JSON(person); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Internal server error")
	}
	c.Set("Content-Type", "application/json")
	return c.JSON(person)
}

func GetPersonById(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Bad request")
	}

	person := model.GetPerson(id)
	if err := c.JSON(person); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Internal server error")
	}
	c.Set("Content-Type", "application/json")
	return c.JSON(person)
}
