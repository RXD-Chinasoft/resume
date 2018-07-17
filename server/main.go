package main

import (
	_ "resume/server/db"
	server "resume/server/httphandler"
)

func main() {
	server.RouteAndListen()
}