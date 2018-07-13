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
			&requirement.Interviewaddr, &requirement.Projectaddr, &requirement.Createtime, pq.Array(&requirement.Descrpition), pq.Array(&requirement.Matrix), &requirement.Clientrequirment, &requirement.Department,
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
	_, err := db.Exec("INSERT INTO requirement (requirement, area, count, saler, dm, priority, english, rqtype, rqstatus, client, salaryscope, challengetarget, resumetarget, turn, teamrange, candidate, contact," + 
		" interviewaddr, projectaddr, createtime, descrpition, matrix, clientrequirment, department) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)", 
		rqmt.Requirement, rqmt.Area, rqmt.Count, rqmt.Saler, rqmt.Dm, rqmt.Priority, rqmt.English, rqmt.Rqtype, rqmt.Rqstatus, rqmt.Client, rqmt.Salaryscope, rqmt.Challengetarget, rqmt.Resumetarget, 
		rqmt.Turn, rqmt.Teamrange, rqmt.Candidate, rqmt.Contact, rqmt.Interviewaddr, rqmt.Projectaddr, rqmt.Createtime, pq.Array(rqmt.Descrpition), pq.Array(rqmt.Matrix), rqmt.Clientrequirment, rqmt.Department)
	if err != nil {
		log.Printf("insert error %s", err)
		return err
	}
	return nil
}

func UpdateRequirement(rqmt Requirement) error {
	log.Printf("update %v", rqmt)
	_, err := db.Exec("UPDATE requirement SET requirement=$1, area=$2, count=$3, saler=$4, dm=$5, priority=$6, english=$7, rqtype=$8, rqstatus=$9, client=$10, salaryscope=$11," + 
		" challengetarget=$12, resumetarget=$13, turn=$14, teamrange=$15, candidate=$16, contact=$17, interviewaddr=$18, projectaddr=$19, createtime=$20, descrpition=$21, matrix=$22, clientrequirment=$23, department=$24 WHERE id=$25", 
		rqmt.Requirement, rqmt.Area, rqmt.Count, rqmt.Saler, rqmt.Dm, rqmt.Priority, rqmt.English, rqmt.Rqtype, rqmt.Rqstatus, rqmt.Client, rqmt.Salaryscope, rqmt.Challengetarget, rqmt.Resumetarget, 
		rqmt.Turn, rqmt.Teamrange, rqmt.Candidate, rqmt.Contact, rqmt.Interviewaddr, rqmt.Projectaddr, rqmt.Createtime, pq.Array(rqmt.Descrpition), pq.Array(rqmt.Matrix), rqmt.Clientrequirment, rqmt.Department, rqmt.Id)
	if err != nil {
		log.Printf("update error %s", err)
		return err
	}
	return nil
}

func DeleteRequirement(id int) error {
	log.Printf("delete %d", id)
	_, err := db.Exec("DELETE FROM requirement WHERE id=$1", id)
	if err != nil {
		log.Printf("delete error %s", err)
		return err
	}
	return nil
}