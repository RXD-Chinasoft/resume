package httphandler


import (
	"net/http"
	"log"
	"time"
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

const (
	POST = "POST"
	DELETE = "DELETE"
	PUT = "PUT"
)
func RouteAndListen() {
	http.Handle("/apis/dictionaries", corsDecrator(http.HandlerFunc(methodFilter(dictionaryHandlFunc, POST))))
	http.Handle("/apis/requirements", corsDecrator(http.HandlerFunc(methodFilter(requirementHandlFunc, POST))))
	http.Handle("/apis/requirement", corsDecrator(http.HandlerFunc(methodFilter(requirementHandlFunc, POST))))
	http.ListenAndServe(":8000", nil)
}