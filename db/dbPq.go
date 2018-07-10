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

type Dictionary struct {
	Id int64 `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
	Type int64 `json:"type" db:"type"`
	Descrpition string `json:"descrpition" db:"descrpition"`
	ExtendedField string `json:"extendedfield" db:"extendedfield"`
	PrimaryKey string `json:"pKey" db:"pKey"`
}

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
	
	rows, err1 := db.Query("SELECT * FROM dictionary")
	if err1 != nil {
		log.Printf("get list error %s :", err1)
	}
	defer rows.Close()
	for rows.Next() {
		dictionary := Dictionary{}
		err = rows.Scan(&dictionary.Id, &dictionary.Name, &dictionary.Type, &dictionary.Descrpition, &dictionary.ExtendedField, &dictionary.PrimaryKey)
		if err != nil {
			log.Printf("scan friend error %s :", err)
			break
		}
		log.Printf("dictionary %v", dictionary)
	}
}