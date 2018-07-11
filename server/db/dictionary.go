package db

import (
	"log"
	. "resume/server/entities"
)

func GetAll() {
	rows, err := db.Query("SELECT * FROM dictionary")
	if err != nil {
		log.Printf("get list error %s :", err)
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