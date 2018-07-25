package main

import (
	_ "resume/server/db"
	server "resume/server/httphandler"
	"log"
)

func main() {
	defer func() {
		err := recover()
		if err != nil {
			log.Printf("panic : %v", err)
		}
	}()
	server.RouteAndListen()
}