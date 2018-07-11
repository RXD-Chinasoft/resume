package httphandler

import (
	"net/http"
	"log"
	"io/ioutil"
	"encoding/json"
	"resume/server/db"
)

func requirementHandlFunc(w http.ResponseWriter, r *http.Request){
	if r.Method == "POST" {
		res, err := ioutil.ReadAll(r.Body)
		r.Body.Close()
		log.Printf("from %s \n", res)
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