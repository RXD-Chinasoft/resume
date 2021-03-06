package httphandler

import (
	"strconv"
	"strings"
	"net/http"
	"log"
	"encoding/json"
	"resume/server/db"
	. "resume/server/entities"
)

func requirementCandidatesHandleFunc(w http.ResponseWriter, r *http.Request) {
	requirementCandidate := RequirementsCandidates{}
	requirements, err := db.GetRequirements()
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	// candidates, err := db.GetCandidates()
	candidates, err := db.GetCandidatesByRequirements(requirements)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	requirementCandidate.Requirements = requirements
	requirementCandidate.RequirementCandidates = make(map[int64][][]Candidate)
	
	for _, requirement := range requirements {
		relateCandidates := [][]Candidate{}
		log.Println("append candidate into requirement: ", requirement.Id, "Matrix :", requirement.Matrix)
		for _, mx := range requirement.Matrix {
			arrC := []Candidate{}
			if len(mx) > 0 { //strings.Index(mx, ",") != -1
				ids := strings.Split(mx, ",")
				for _, id := range ids {
					if i, err := strconv.Atoi(id);err == nil {
						for _, candidate := range candidates {
							if int64(i) == candidate.Id {
								arrC = append(arrC, candidate)
								log.Printf("candidate %v \n", int64(i))
							}
						}
					} else {
						log.Printf("append candidate error")
						continue
					}
				}
			}
			relateCandidates = append(relateCandidates, arrC)
		}
		requirementCandidate.RequirementCandidates[requirement.Id] = relateCandidates
	} 
	
	if err := json.NewEncoder(w).Encode(&requirementCandidate); err != nil {
		http.Error(w, http.StatusText(500), 500)
	}
}