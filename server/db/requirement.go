package db

import (
	"log"
	. "resume/server/entities"
	"github.com/lib/pq"
)

func GetRequirements() ([]Requirement, error) {
	rows, err := db.Query("SELECT * FROM requirement")
	if err != nil {
		log.Printf("get list error %s :", err)
	}
	defer rows.Close()
	list := []Requirement{}
	for rows.Next() {
		requirement := Requirement{}
		err = rows.Scan(&requirement.Id, &requirement.Requirement, &requirement.Area, &requirement.Count, &requirement.Saler, &requirement.Dm,
			&requirement.Priority, &requirement.English, &requirement.Rqtype, &requirement.Rqstatus, &requirement.Client, &requirement.Salaryscope,
			&requirement.Challengetarget, &requirement.Resumetarget, &requirement.Turn, &requirement.Teamrange, &requirement.Candidate, &requirement.Contact,
			&requirement.Interviewaddr, &requirement.Projectaddr, &requirement.Createtime, pq.Array(&requirement.Descrpition),
		)
		if err != nil {
			log.Printf("scan requirement error %s :", err)
			break
		}
		list = append(list, requirement)
	}
	return list, err
}

func NewRequirement(rqmt Requirement) error {
	log.Printf("require %v", rqmt)
	_, err := db.Exec("INSERT INTO requirement (requirement, area, count, saler, dm, priority, english, rqtype, rqstatus, client, salaryscope, challengetarget, resumetarget, turn," + 
		" teamrange, candidate, contact, interviewaddr, projectaddr, createtime, descrpition) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)", 
		rqmt.Requirement, rqmt.Area, rqmt.Count, rqmt.Saler, rqmt.Dm, rqmt.Priority, rqmt.English, rqmt.Rqtype, rqmt.Rqstatus, rqmt.Client, rqmt.Salaryscope, rqmt.Challengetarget, rqmt.Resumetarget, 
		rqmt.Turn, rqmt.Teamrange, rqmt.Candidate, rqmt.Contact, rqmt.Interviewaddr, rqmt.Projectaddr, rqmt.Createtime, pq.Array(rqmt.Descrpition))
	if err != nil {
		log.Printf("insert error %s", err)
		return err
	}
	return nil
}