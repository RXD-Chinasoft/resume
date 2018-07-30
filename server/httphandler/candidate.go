package httphandler

import (
	"fmt"
	"strconv"
	"strings"
	"net/http"
	"log"
	"io/ioutil"
	"encoding/json"
	"resume/server/db"
	. "resume/server/entities"
)

func candidatesHandleFunc(w http.ResponseWriter, r *http.Request){
	res, err := ioutil.ReadAll(r.Body)
	r.Body.Close()
	if err != nil {
		http.Error(w, http.StatusText(400), 400)
	} else {
		log.Printf("params %s \n", res)
		candidates, err := db.GetCandidates()
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		} else {
			if err := json.NewEncoder(w).Encode(&candidates); err != nil {
				http.Error(w, http.StatusText(500), 500)
			}
		}
	}
}

func newCandidateHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	// log.Printf("new params %s \n", string(bodyBytes))
	candidate := Candidate{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&candidate)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		if candidate.File != "" {
			filepath, err := uploadbase64(candidate.File, candidate.Filename)
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			candidate.File = filepath
		}
		err = db.NewCandidate(candidate)
		if err != nil {
			http.Error(w, err.Error(), 500)
		}
	}
	
}

func createCandidateWithFormHandleFunc(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20) // 32M
	mp := r.MultipartForm
	paths := []string{}
	names := []string{}
	log.Printf("mp %v \n", mp)
	fileHeaders := mp.File["files[]"]
	log.Printf("fileHeaders %v %d \n", fileHeaders, len(fileHeaders))
	if len(fileHeaders) != 0 {
		for _, v := range fileHeaders {
			fileName := v.Filename
			names = append(names, fileName)
			f, err := v.Open()
			if err != nil {
				continue
			}
			defer f.Close()
			log.Printf("upload %v \n", fileName)
			path, err := uploadfile(fileName, f)
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			paths = append(paths, path)

		}
	}
	candidate := Candidate{}
	candidate.Requirement = int64(parseFormInt(r.FormValue("requirement")))
	candidate.Candidate = r.FormValue("candidate")
	candidate.Hiringmanager = int64(parseFormInt(r.FormValue("hiringmanager")))
	candidate.Saler = int64(parseFormInt(r.FormValue("saler")))
	candidate.Dm = int64(parseFormInt(r.FormValue("dm")))
	candidate.Status = int64(parseFormInt(r.FormValue("status")))
	candidate.Risk = int64(parseFormInt(r.FormValue("risk")))
	candidate.Descrpition = r.FormValue("describe")
	candidate.File = strings.Join(paths, ";")
	candidate.Filename = strings.Join(names, ";")
	candidate.Filesize = 0
	candidate.Filetype = ""
	candidate.Createtime = ""
	candidate.Message = r.FormValue("msg")
	candidate.InterviewTime = r.FormValue("interviewtime")
	candidate.Price = r.FormValue("price")
	candidate.Gp = r.FormValue("gp")
	candidate.TakeinTime = r.FormValue("takeintime")
	err := db.NewCandidate(candidate)
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
	
}

func updateCandidateWithFormHandleFunc(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20) // 32M
	mp := r.MultipartForm
	paths := []string{}
	names := []string{}
	log.Printf("mp %v \n", mp)
	fileHeaders := mp.File["files[]"]
	log.Printf("fileHeaders %v %d \n", fileHeaders, len(fileHeaders))
	if len(fileHeaders) != 0 {
		for _, v := range fileHeaders {
			fileName := v.Filename
			names = append(names, fileName)
			f, err := v.Open()
			if err != nil {
				continue
			}
			defer f.Close()
			log.Printf("upload %v \n", fileName)
			path, err := uploadfile(fileName, f)
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			paths = append(paths, path)

		}
	}
	candidate := Candidate{}
	candidate.Requirement = int64(parseFormInt(r.FormValue("requirement")))
	candidate.Candidate = r.FormValue("candidate")
	candidate.Hiringmanager = int64(parseFormInt(r.FormValue("hiringmanager")))
	candidate.Saler = int64(parseFormInt(r.FormValue("saler")))
	candidate.Dm = int64(parseFormInt(r.FormValue("dm")))
	candidate.Status = int64(parseFormInt(r.FormValue("status")))
	candidate.Risk = int64(parseFormInt(r.FormValue("risk")))
	candidate.Descrpition = r.FormValue("describe")
	candidate.File = strings.Join(paths, ";")
	candidate.Filename = strings.Join(names, ";")
	candidate.Filesize = 0
	candidate.Filetype = ""
	candidate.Createtime = ""
	candidate.Message = r.FormValue("msg")
	candidate.InterviewTime = r.FormValue("interviewtime")
	candidate.Price = r.FormValue("price")
	candidate.Gp = r.FormValue("gp")
	candidate.TakeinTime = r.FormValue("takeintime")
	candidate.Id = int64(parseFormInt(r.FormValue("id")))
	log.Printf("candidate updating.. %v \n", candidate)
	err := db.UpdateCandidate(candidate)
	if err != nil {
		http.Error(w, err.Error(), 500)
	} else {
		fmt.Fprint(w, candidate)
	}
	
}

func updateCandidateHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("update params %s \n", string(bodyBytes))
	candidate := Candidate{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&candidate)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		if candidate.File != "" {
			filepath, err := uploadbase64(candidate.File, candidate.Filename)
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			candidate.File = filepath
		}
		err = db.UpdateCandidate(candidate)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
	
}

func removeCandidateHandleFunc(w http.ResponseWriter, r *http.Request, bodyBytes []byte) {
	log.Printf("remove params %s \n", string(bodyBytes))
	key := struct {Id int `json:"id" db:"id"`}{}
	err := json.NewDecoder(strings.NewReader(string(bodyBytes))).Decode(&key)
	if err != nil {
		log.Printf("error ===> %s \n", err)
		http.Error(w, http.StatusText(400), 400)
	} else {
		err = db.DeleteCandidate(key.Id)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
		}
	}
	
}

func parseFormInt(str string) int {
	result, err := strconv.Atoi(str)
	if err != nil {
		panic(err)
	}
	return result
}