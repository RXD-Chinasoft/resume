package httphandler


import (
	"io/ioutil"
	"net/http"
	"log"
	"time"
	"syscall"
	"fmt"
)

func addCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	(*w).Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	(*w).Header().Set("content-type", "application/json")             //返回数据格式是json
}

func corsDecrator(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){//force to HandlerFunc
		log.Printf("Started %s %s", r.Method, string(r.URL.Path))
		start := time.Now()
		addCors(&w)
		next.ServeHTTP(w, r)
		log.Printf("Comleted %s %s in %v", r.Method, r.URL.Path, time.Since(start))
	})
}

func methodFilter(handleFunc func(w http.ResponseWriter, r *http.Request), method string) func (w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == method {
			handleFunc(w, r)
		}
	}
}

func parseBodyWithBytes(handleFunc func(w http.ResponseWriter, r *http.Request, bbs []byte), errorString string, errorCode int) func (w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("body %v", r.Body)
		res, err := ioutil.ReadAll(r.Body)
		r.Body.Close()
		if err != nil {
			http.Error(w, errorString, errorCode)
		} else {
			handleFunc(w, r, res)
		}
	}
}

func RouteAndListen() {
	http.Handle("/apis/dictionaries", corsDecrator(http.HandlerFunc(methodFilter(dictionaryHandleFunc, http.MethodPost))))
	http.Handle("/apis/requirements", corsDecrator(http.HandlerFunc(methodFilter(requirementsHandleFunc, http.MethodPost))))
	http.Handle("/apis/requirement", corsDecrator(http.HandlerFunc(methodFilter(parseBodyWithBytes(newRequirementHandleFunc, 
		http.StatusText(http.StatusBadRequest), http.StatusBadRequest), http.MethodPost))))
	http.Handle("/apis/requirementrenewal", corsDecrator(http.HandlerFunc(methodFilter(parseBodyWithBytes(updateRequirementHandleFunc, 
		http.StatusText(http.StatusBadRequest), http.StatusBadRequest), http.MethodPost))))
	http.Handle("/apis/requirementoff", corsDecrator(http.HandlerFunc(methodFilter(parseBodyWithBytes(removeRequirementHandleFunc, 
		http.StatusText(http.StatusBadRequest), http.StatusBadRequest), http.MethodPost))))

	http.Handle("/apis/candidates", corsDecrator(http.HandlerFunc(methodFilter(candidatesHandleFunc, http.MethodPost))))
	http.Handle("/apis/candidate", corsDecrator(http.HandlerFunc(methodFilter(parseBodyWithBytes(newCandidateHandleFunc, 
		http.StatusText(http.StatusBadRequest), http.StatusBadRequest), http.MethodPost))))
	http.Handle("/apis/candidaterenewal", corsDecrator(http.HandlerFunc(methodFilter(parseBodyWithBytes(updateCandidateHandleFunc, 
		http.StatusText(http.StatusBadRequest), http.StatusBadRequest), http.MethodPost))))
	http.Handle("/apis/candidateoff", corsDecrator(http.HandlerFunc(methodFilter(parseBodyWithBytes(removeCandidateHandleFunc, 
		http.StatusText(http.StatusBadRequest), http.StatusBadRequest), http.MethodPost))))

	http.Handle("/apis/requirementCandidates", corsDecrator(http.HandlerFunc(methodFilter(requirementCandidatesHandleFunc, http.MethodPost))))
	
	//static file handler.
    http.Handle("/staticfile/", http.StripPrefix("/staticfile/", http.FileServer(http.Dir(UPLOAD_PATH))))
	port, found := syscall.Getenv("ENV_PORT")
	if found != true {
		log.Println("docker port not found")
		port = "8999"
	}
	port = fmt.Sprintf(":%s", port)
	log.Printf("docker port is %s", port)
	http.ListenAndServe(port, nil)
}