package entities

import (
	// "github.com/lib/pq"
)

type Dictionary struct {
	Id int64 `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
	Type int64 `json:"type" db:"type"`
	Descrpition string `json:"descrpition" db:"descrpition"`
	ExtendedField string `json:"extendedfield" db:"extendedfield"`
	PrimaryKey string `json:"pKey" db:"pKey"`
}

type Requirement struct {
	Id int64 `json:"id" db:"id"`
    Requirement string `json:"requirement" db:"requirement"`
    Area string `json:"area" db:"area"`
    Count int64 `json:"count" db:"count"`
    Saler int64 `json:"saler" db:"saler"`
    Dm int64 `json:"dm" db:"dm"`
    Priority int64 `json:"priority" db:"priority"`
    English int64 `json:"english" db:"english"`
    Rqtype int64 `json:"rqtype" db:"rqtype"`
    Rqstatus int64 `json:"rqstatus" db:"rqstatus"`
    Client string `json:"client" db:"client"`
    Salaryscope string `json:"salaryscope" db:"salaryscope"`
    Challengetarget string `json:"challengetarget" db:"challengetarget"`
    Resumetarget string `json:"resumetarget" db:"resumetarget"`
    Turn int64 `json:"turn" db:"turn"`
    Teamrange string `json:"teamrange" db:"teamrange"`
    Candidate string `json:"candidate" db:"candidate"`
    Contact string `json:"contact" db:"contact"`
    Interviewaddr string `json:"interviewaddr" db:"interviewaddr"`
    Projectaddr string `json:"projectaddr" db:"projectaddr"`
    Createtime string `json:"createtime" db:"createtime"`
    Descrpition []string `json:"descrpition" db:"descrpition"`
}

type Candidate struct {
	Id int64 `json:"id" db:"id"`
    Requirement int64 `json:"requirement" db:"requirement"`
    Candidate string `json:"candidate" db:"candidate"`
    Hiringmanager int64 `json:"hiringmanager" db:"hiringmanager"`
    Saler int64 `json:"saler" db:"saler"`
    Dm int64 `json:"dm" db:"dm"`
    Status int64 `json:"status" db:"status"`
    Risk int64 `json:"risk" db:"risk"`
    Descrpition string `json:"descrpition" db:"descrpition"`
    File string `json:"file" db:"file"`
    Filename string `json:"filename" db:"filename"`
    Filesize string `json:"filesize" db:"filesize"`
    Filetype string `json:"filetype" db:"filetype"`
    Createtime string `json:"createtime" db:"createtime"`
    Message string `json:"message" db:"message"`
}