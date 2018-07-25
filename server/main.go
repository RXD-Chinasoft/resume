package main

import (
	_ "resume/server/db"
	server "resume/server/httphandler"
	"log"
)

func main() {
	defer func() {
		if err := recover(); err != nil {
			log.Printf("panic : %v", err)
		}
	}()
	server.RouteAndListen()
}