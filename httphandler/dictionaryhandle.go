package httphandler
import (
	"net/http"
	"fmt"
	"log"
	"io/ioutil"
	"encoding/json"
	. "resume/entities"
)

func dictionaryHandlFunc(w http.ResponseWriter, r *http.Request){
	fmt.Println(r.Method)
	if r.Method == "POST" {
		res, err := ioutil.ReadAll(r.Body)
		r.Body.Close()
		log.Printf("from %s \n", res)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		} else {
			result := HttpResult{}
			result.Success = true
			result.Message = "ok"
			fmt.Println(result)
			if err1 := json.NewEncoder(w).Encode(&result); err1 != nil {
				http.Error(w, http.StatusText(500), 500)
			}
		}
	}
}

type dictionaryHandler struct {}

func (dh *dictionaryHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    dictionaryHandlFunc(w, r)
}