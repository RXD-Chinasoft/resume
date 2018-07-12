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

func requirementsHandleFunc(w http.ResponseWriter, r *http.Request){
	res, err := ioutil.ReadAll(r.Body)
	r.Body.Close()
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
	} else {
		log.Printf("params %s \n", res)
		requirements, err := db.GetRequirements()
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		} else {
			if err := json.NewEncoder(w).Encode(&requirements); err != nil {
				http.Error(w, http.StatusText(500), 500)
			}
		}
	}
}

func newRequirementHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("new params %s \n", string(bodyBytes))
	requirement := Requirement{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&requirement)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		err = db.NewRequirement(requirement)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
	
}

func updateRequirementHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("update params %s \n", string(bodyBytes))
	requirement := Requirement{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&requirement)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		err = db.UpdateRequirement(requirement)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
	
}