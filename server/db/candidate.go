package db

import (
	"log"
	. "resume/server/entities"
	// "github.com/lib/pq"
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
		err = rows.Scan(&candidate.Id, &candidate.Requirement, &candidate.Candidate, &candidate.Hiringmanager, 
			&candidate.Saler, &candidate.Dm, &candidate.Status, &candidate.Risk, &candidate.Descrpition, &candidate.Filepath, &candidate.Createtime, &candidate.Message,
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
	_, err := db.Exec("INSERT INTO candidate (requirement, candidate, hiringmanager, saler, dm, status, risk, descrpition, filepath, createtime, message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
		candidate.Requirement, candidate.Candidate, candidate.Hiringmanager, candidate.Saler, candidate.Dm, candidate.Status, candidate.Risk, candidate.Descrpition, candidate.Filepath, candidate.Createtime, candidate.Message)
	if err != nil {
		log.Printf("insert error %s", err)
		return err
	}
	return nil
}

func UpdateCandidate(candidate Candidate) error {
	log.Printf("update %v", candidate)
	_, err := db.Exec("UPDATE candidate SET requirement=$1, candidate=$2, hiringmanager=$3, saler=$4, dm=$5, status=$6, risk=$7, descrpition=$8, filepath=$9, createtime=$10, message=$11 WHERE id=$12", 
		candidate.Requirement, candidate.Candidate, candidate.Hiringmanager, candidate.Saler, candidate.Dm, candidate.Status, candidate.Risk, candidate.Descrpition, candidate.Filepath, candidate.Createtime, candidate.Message, candidate.Id)
	if err != nil {
		log.Printf("update error %s", err)
		return err
	}
	return nil
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