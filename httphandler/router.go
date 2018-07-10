package httphandler


import (
	"net/http"
	"fmt"
	"log"
	"io/ioutil"
	"encoding/json"
	_ "resume/db"
)

type Result struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}

func RouteAndListen() {
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request){
		w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
		w.Header().Set("content-type", "application/json")             //返回数据格式是json
		fmt.Println(r.Method)
		if r.Method == "POST" {
			res, err := ioutil.ReadAll(r.Body)
			r.Body.Close()
			log.Printf("from %s \n", res)
			if err != nil {
				http.Error(w, http.StatusText(500), 500)
			} else {
				result := Result{}
				result.Success = true
				result.Message = "ok"
				fmt.Println(result)
				if err1 := json.NewEncoder(w).Encode(&result); err1 != nil {
					http.Error(w, http.StatusText(500), 500)
				}
			}
		} else {
			fmt.Fprintf(w, "hello world")
		}
	})
	http.ListenAndServe(":8000", nil)
}