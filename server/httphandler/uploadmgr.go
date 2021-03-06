package httphandler

import (
	"io"
	"mime/multipart"
	"encoding/base64"
	"io/ioutil"
	"errors"
	"fmt"
	"os"
)

const (
	UPLOAD_PATH = "/tmp/go_file_uploads/"
)

func uploadbase64(content string, filename string) (filepath string, err error) {
	decodeBytes, err := base64.StdEncoding.DecodeString(content)
	if err != nil {
		err = errors.New(fmt.Sprintf("decode error ===> %s \n", err))
		return
	}
	err = os.MkdirAll(UPLOAD_PATH, 0777)
	if err != nil {
		err = errors.New(fmt.Sprintf("system path error ===> %s \n", err))
		return
	}
	filepath = UPLOAD_PATH + filename
	dst, err := os.Create(filepath)
	defer dst.Close()
	if err != nil {
		err = errors.New(fmt.Sprintf("create file error ===> %s \n", err))
		return
	}
	err = ioutil.WriteFile(filepath, decodeBytes, 0777)
	if err != nil {
		err = errors.New(fmt.Sprintf("append file content error ===> %s \n", err))
		return
	}
	return
}

func uploadfile(filename string, file multipart.File) (filepath string, err error) {
	err = os.MkdirAll(UPLOAD_PATH, 0777)
	if err != nil {
		err = errors.New(fmt.Sprintf("system path error ===> %s \n", err))
		return
	}
	filepath = UPLOAD_PATH + filename
	dst, err := os.OpenFile(filepath, os.O_WRONLY | os.O_CREATE, 0777)
	if err != nil {
		err = errors.New(fmt.Sprintf("create file error ===> %s \n", err))
		return
	}
	defer dst.Close()
	_, err1 := io.Copy(dst, file)
	if err1 != nil {
		err = errors.New(fmt.Sprintf("write file error ===> %s \n", err))
		return
	}
	return
}