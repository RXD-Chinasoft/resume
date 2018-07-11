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

	return nil
}