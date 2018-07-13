package db

import (
	"log"
	. "resume/server/entities"
	"errors"
)

func GetCandidates() ([]Candidate, error) {
	rows, err := db.Query("SELECT * FROM candidate")
	if err != nil {
		log.Printf("get list error %s :", err)
	}
	defer rows.Close()
	list := []Candidate{}
	for rows.Next() {
		candidate := Candidate{}
		err = rows.Scan(&candidate.Id, &candidate.Requirement, &candidate.Candidate, &candidate.Hiringmanager, &candidate.Saler, &candidate.Dm, &candidate.Status, 
			&candidate.Risk, &candidate.Descrpition, &candidate.File, &candidate.Filename, &candidate.Filesize, &candidate.Filetype, &candidate.Createtime, &candidate.Message,
		)
		if err != nil {
			log.Printf("scan candidate error %s :", err)
			break
		}
		list = append(list, candidate)
	}
	return list, err
}

func NewCandidate(candidate Candidate) error {
	log.Printf("require %v", candidate)
	requirement, err := GetRequirement(candidate.Requirement)
	if err != nil {
		return err
	}
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	var id int64
	err0 := tx.QueryRow("INSERT INTO candidate (requirement, candidate, hiringmanager, saler, dm, status, risk, descrpition, file, filename, filesize, filetype, createtime, message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id",
		candidate.Requirement, candidate.Candidate, candidate.Hiringmanager, candidate.Saler, candidate.Dm, candidate.Status, candidate.Risk, candidate.Descrpition, candidate.File, candidate.Filename, candidate.Filesize, candidate.Filetype, candidate.Createtime, candidate.Message).Scan(&id)
	log.Printf("LastInsertId %d", id)
	err1 := AppendRequirementMatrix(tx, requirement, id)
	err2 := tx.Commit()
	hasErr := err0 != nil || err1 != nil || err2 != nil
	if hasErr {
		log.Println("insert error , roll back")
		err = tx.Rollback()
		return errors.New("transation error")
	}
	return nil
}

func UpdateCandidate(candidate Candidate) (err error) {
	log.Printf("update %v", candidate)
	if candidate.File != "" {
		_, err = db.Exec("UPDATE candidate SET requirement=$1, candidate=$2, hiringmanager=$3, saler=$4, dm=$5, status=$6, risk=$7, descrpition=$8, file=$9, filename=$10, filesize=$11, filetype=$12, createtime=$13, message=$14 WHERE id=$15", 
			candidate.Requirement, candidate.Candidate, candidate.Hiringmanager, candidate.Saler, candidate.Dm, candidate.Status, candidate.Risk, candidate.Descrpition, candidate.File, candidate.Filename, candidate.Filesize, candidate.Filetype, candidate.Createtime, candidate.Message, candidate.Id)
	} else {
		_, err = db.Exec("UPDATE candidate SET requirement=$1, candidate=$2, hiringmanager=$3, saler=$4, dm=$5, status=$6, risk=$7, descrpition=$8, filename=$9, filesize=$10, filetype=$11, createtime=$12, message=$13 WHERE id=$14", 
			candidate.Requirement, candidate.Candidate, candidate.Hiringmanager, candidate.Saler, candidate.Dm, candidate.Status, candidate.Risk, candidate.Descrpition, candidate.Filename, candidate.Filesize, candidate.Filetype, candidate.Createtime, candidate.Message, candidate.Id)
	}
	if err != nil {
		log.Printf("update error %s", err)
	}
	return
}

func DeleteCandidate(id int) error {
	log.Printf("delete %d", id)
	_, err := db.Exec("DELETE FROM candidate WHERE id=$1", id)
	if err != nil {
		log.Printf("delete error %s", err)
		return err
	}
	return nil
}