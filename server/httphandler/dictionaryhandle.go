package httphandler

import (
	"strconv"
	"net/http"
	"log"
	"io/ioutil"
	"encoding/json"
	"resume/server/db"
	. "resume/server/entities"
)

func dictionaryHandleFunc(w http.ResponseWriter, r *http.Request){
	res, err := ioutil.ReadAll(r.Body)
	r.Body.Close()
	log.Printf("from %s \n", res)
	ds, err := db.GetCommonConfigs()
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
	} else {
		m := make(map[string][]Dictionary)
		for _, v := range ds {
			key := strconv.Itoa(v.Type)
			if m[key] == nil {
				m[key] = []Dictionary{}
			} else {
				m[key] = append(m[key], v)
			}
		}
		log.Printf("dictionary %v \n", m)
		if err := json.NewEncoder(w).Encode(m); err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
}