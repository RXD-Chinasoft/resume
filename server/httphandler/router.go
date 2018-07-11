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

func corsWrapperHandler(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){//force to HandlerFunc
		start := time.Now()
		addCors(&w)
		next.ServeHTTP(w, r)
		log.Printf("Comleted %s in %v", r.URL.Path, time.Since(start))
	})
}

func post(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			log.Printf("Started %s %s", r.Method, string(r.URL.Path))
			next.ServeHTTP(w, r)
		}
	})
}

func RouteAndListen() {
	http.Handle("/apis/dictionaries", post(corsWrapperHandler(http.HandlerFunc(dictionaryHandlFunc))))
	http.Handle("/apis/requirements", post(corsWrapperHandler(http.HandlerFunc(requirementHandlFunc))))
	http.ListenAndServe(":8000", nil)
}