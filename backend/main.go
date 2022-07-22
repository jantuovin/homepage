package main

import (
	"cv/controller"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Post("/api/person", controller.CreatePerson)
	app.Get("/api/person/:id", controller.GetPersonById)

	log.Fatal(app.Listen("localhost:3000"))
}
