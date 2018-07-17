FROM golang:latest

WORKDIR $GOPATH/src/server

ADD .$GOPATH/src/server

RUN go get github.com/lib/pq

ENV PORT 8000

EXPOSE 8000
RUN go build .

ENTRYPOINT ["./server"]