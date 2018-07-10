package main

import (
	server "resume/httphandler"
)

type Result struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}

func main() {
	server.RouteAndListen()
}