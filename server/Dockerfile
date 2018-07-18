FROM golang:latest

WORKDIR $GOPATH/src/resume/server

ADD . $GOPATH/src/resume/server

RUN go get github.com/lib/pq

#ENV PORT 8000

EXPOSE 8000
RUN go build .

ENTRYPOINT ["./server"]