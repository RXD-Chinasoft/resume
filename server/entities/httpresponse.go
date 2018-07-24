package entities

type HttpResult struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}


type RequirementCandidates struct {
	Requirements	[]Requirement	`json:"requirements"`
	Candidates []Candidate	`json:"candidates"`
}