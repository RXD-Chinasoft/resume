package entities
// common
type HttpResult struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}


//logic

type RequirementsCandidates struct {
	Requirements	[]Requirement	`json:"requirements"`
	RequirementCandidates	map[int64][][]Candidate	`json:"relateCandidates"`
}

