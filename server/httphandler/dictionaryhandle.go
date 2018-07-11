package httphandler

import (
	"net/http"
	"log"
	"io/ioutil"
	"encoding/json"
	"resume/server/db"
)

func dictionaryHandlFunc(w http.ResponseWriter, r *http.Request){
	res, err := ioutil.ReadAll(r.Body)
	r.Body.Close()
	log.Printf("from %s \n", res)
	ds, err := db.GetCommonConfigs()
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
	} else {
		if err := json.NewEncoder(w).Encode(&ds); err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
}