package database

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

func init() {
	environment := os.Getenv("APP_ENV")
	var loadDotEnvFileErr error
	if strings.TrimSpace(environment) == "development" {
		loadDotEnvFileErr = godotenv.Load("../database/.env")
	}
	if loadDotEnvFileErr != nil {
		log.Fatal(loadDotEnvFileErr)
	}

	username := os.Getenv("HOMEPAGE_DB_USER")
	password := os.Getenv("HOMEPAGE_DB_USER_PASSWORD")
	host := "127.0.0.1"
	port := 3307
	dbName := os.Getenv("HOMEPAGE_DB_NAME")
	timeout := "10s"
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local&timeout=%s", username, password, host, port, dbName, timeout)

	var dbOpenErr error
	db, dbOpenErr = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if dbOpenErr != nil {
		panic(dbOpenErr)
	}
}

func GetDB() *gorm.DB {
	return db
}
