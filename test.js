const fs = require("fs");
const csv = require("csv-parser");
const results = [];

const fileName = process.argv[2] || 'sample.csv'; // Default to 'sample.csv' if no argument is given

const startTime = process.hrtime();

fs.createReadStream(fileName)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        //console.log(results); // Process records as needed
        const [seconds, nanoseconds] = process.hrtime(startTime);
        console.log(`Execution time: ${seconds * 1000 + nanoseconds / 1e6}ms`);
    });