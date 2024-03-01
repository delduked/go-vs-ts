package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {

	startTime := time.Now()

	file, err := os.Open("sample.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	_, err = reader.ReadAll()
	if err != nil {
		panic(err)
	}

	fmt.Println("Execution time: ", time.Since(startTime))
}

func main() {
	listenAddr := ":8080"
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
		listenAddr = ":" + val
	}
	http.HandleFunc("/api/HttpExample", helloHandler)
	log.Printf("About to listen on %s. Go to https://127.0.0.1%s/", listenAddr, listenAddr)
	log.Fatal(http.ListenAndServe(listenAddr, nil))
}
