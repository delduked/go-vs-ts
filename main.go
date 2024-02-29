package main

import (
	"encoding/csv"
	"flag"
	"fmt"
	"os"
	"time"
)

func main() {

	var fileName string
	flag.StringVar(&fileName, "file", "sample.csv", "CSV file to be parsed")
	flag.Parse()

	startTime := time.Now()

	file, err := os.Open(fileName)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	_, err = reader.ReadAll()
	if err != nil {
		panic(err)
	}

	// Process records
	// for _, record := range records {
	// 	fmt.Println(record) // Print each row, you can process as needed
	// }

	fmt.Println("Execution time: ", time.Since(startTime))
}
