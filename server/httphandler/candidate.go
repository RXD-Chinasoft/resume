package httphandler

import (
	"strings"
	"net/http"
	"log"
	"io/ioutil"
	"encoding/json"
	"resume/server/db"
	. "resume/server/entities"
)

func candidatesHandleFunc(w http.ResponseWriter, r *http.Request){
	res, err := ioutil.ReadAll(r.Body)
	r.Body.Close()
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
	} else {
		log.Printf("params %s \n", res)
		candidates, err := db.GetCandidates()
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		} else {
			if err := json.NewEncoder(w).Encode(&candidates); err != nil {
				http.Error(w, http.StatusText(500), 500)
			}
		}
	}
}

func newCandidateHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	// log.Printf("new params %s \n", string(bodyBytes))
	candidate := Candidate{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&candidate)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		if candidate.File != "" {
			filepath, err := uploadbase64(candidate.File, candidate.Filename)
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			candidate.File = filepath
		}
		err = db.NewCandidate(candidate)
		if err != nil {
			http.Error(w, err.Error(), 500)
		}
	}
	
}

func updateCandidateHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("update params %s \n", string(bodyBytes))
	candidate := Candidate{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&candidate)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		if candidate.File != "" {
			filepath, err := uploadbase64(candidate.File, candidate.Filename)
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			candidate.File = filepath
		}
		err = db.UpdateCandidate(candidate)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
	
}

func removeCandidateHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("remove params %s \n", string(bodyBytes))
	key := struct {Id int `json:"id" db:"id"`}{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&key)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		err = db.DeleteCandidate(key.Id)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
	
}