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
		lastId, err := db.CreateRequirement(requirement)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
		result := struct{LastId int64 `json:"lastId"`}{lastId}
		if err := json.NewEncoder(w).Encode(result);err != nil {
			log.Printf("err ===> %v \n", err)
			http.Error(w, err.Error(), 500)
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
		} else {
			if err := json.NewEncoder(w).Encode(&requirement);err != nil {
				http.Error(w, err.Error(), 500)
			}
		}
	}
	
}

func removeRequirementHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("remove params %s \n", string(bodyBytes))
	key := struct {Id int `json:"id" db:"id"`}{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&key)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		err = db.DeleteRequirement(key.Id)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
	
}

func resetMatrixHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("resetMatrixHandleFunc %s \n", string(bodyBytes))
	mapping := make(map[int64][]string)
	err := json.Unmarshal(bodyBytes, &mapping)
	if err != nil {
		log.Printf("resetMatrixHandleFunc Unmarshal error %s \n", err)
		return
	}
	log.Printf("resetMatrixHandleFunc Unmarshal %v \n", mapping)
	if err := db.ResetMatrix(mapping);err != nil {
		http.Error(w, err.Error(), 500)
	}
}