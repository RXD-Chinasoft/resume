FROM golang

WORKDIR $GOPATH/src/server

COPY ..

RUN go get github.com/lib/pq

RUN go build

CMD["./server"]