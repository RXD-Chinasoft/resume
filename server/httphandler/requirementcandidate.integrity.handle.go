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
	requirementCandidate := RequirementCandidates{}
	requirements, err := db.GetRequirements()
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	candidates, err := db.GetCandidates()
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	requirementCandidate.Requirements = requirements
	var filterCandidates []Candidate = []Candidate{}
	for _, candidate := range candidates {
		for _, requirement := range requirements {
			for _, mx := range requirement.Matrix {
				ids := strings.Split(mx, ",")
				if len(ids) > 0 {
					log.Printf("ids %v \n", ids)
					for _, id := range ids {
						if i, err := strconv.Atoi(id);err == nil {
							if int64(i) == candidate.Id {
								filterCandidates = append(filterCandidates, candidate)
							}
						} else {
							continue
						}
					}
				}
			}
		} 
	}
	requirementCandidate.Candidates = filterCandidates
	if err := json.NewEncoder(w).Encode(&requirementCandidate); err != nil {
		http.Error(w, http.StatusText(500), 500)
	}
}