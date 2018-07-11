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

func requirementsHandlFunc(w http.ResponseWriter, r *http.Request){
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

func newRequirementHandlFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("params %s \n", string(bodyBytes))
	requirement := Requirement{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&requirement)
	if err != nil {
		log.Printf("error ===> %s \n", err)
	} else {
		db.NewRequirement(requirement)
	}
	
}