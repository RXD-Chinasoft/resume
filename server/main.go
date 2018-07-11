package main

import (
	_ "resume/server/db"
	server "resume/server/httphandler"
)

type Result struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}

func main() {
	server.RouteAndListen()
}