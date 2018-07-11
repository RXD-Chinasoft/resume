package db

import (
	"database/sql"
	_ "github.com/lib/pq"
	"fmt"
	"log"
)

const (
	host 	 = "192.168.15.100"
	port     = 54321
	user     = "postgres"
	password = "password"
	dbname   = "postgres"
)

var db *sql.DB
var psqlInfo string

func init() {
	psqlInfo = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Printf("open db err %s", err)
	}
	err = db.Ping()
	if err != nil {
        log.Printf("ping db err %s", err)
    } else {
		fmt.Println("Successfully connected!")
	}
}