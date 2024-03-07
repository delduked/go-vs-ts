package main

import (
	"encoding/csv"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {

	csvData, err := Get()
	if err != nil {
		fmt.Println("Error getting data 😭", err)
	}

	reader := strings.NewReader(csvData)
	csvReader := csv.NewReader(reader)

	startTime := time.Now()
	_, err = csvReader.ReadAll()
	if err != nil {
		panic(err)
	}
	executionTime := time.Since(startTime)

	fmt.Fprint(w, fmt.Sprint("Execution time: ", executionTime.Seconds()*1000))

}

func main() {
	listenAddr := ":8080"
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
		listenAddr = ":" + val
	}
	http.HandleFunc("/api/HttpTrigger1", helloHandler)
	log.Printf("About to listen on %s. Go to https://127.0.0.1%s/", listenAddr, listenAddr)
	log.Fatal(http.ListenAndServe(listenAddr, nil))
}
func Get() (string, error) {
	url := "https://raw.githubusercontent.com/RandomFractals/chicago-crimes/main/data/crimes-2022.csv"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return "nil", err
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return "nil", err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return "nil", err
	}

	return string(body), err
}
