package httphandler

import (
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
		m := make(map[int64][]Dictionary)
		for _, v := range ds {
			if m[v.Type] == nil {
				m[v.Type] = []Dictionary{}
			} else {
				m[v.Type] = append(m[v.Type], v)
			}
		}
		log.Printf("dictionary %v \n", m)
		if err := json.NewEncoder(w).Encode(m); err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
}