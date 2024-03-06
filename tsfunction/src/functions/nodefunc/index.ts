import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext
} from "@azure/functions";
import axios from "axios";
import { exec } from "child_process";

export async function tsfunction(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    try {
        const csvData = await getCSVData();

        const startTime = process.hrtime.bigint(); // More precise timing

        parseCsv(csvData);

        const endTime = process.hrtime.bigint();
        const executionTime = (endTime - startTime) / BigInt(1e6); // Convert to milliseconds

        return {
            status: 200,
            body: `Execution time: ${executionTime.toString()}ms` ,
            headers: { "Content-Type": "application/json" }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: error.toString(),
        };
    }
}
app.http("tsfunction", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: tsfunction
});

async function getCSVData(): Promise<string> {
    const url =
        "https://raw.githubusercontent.com/RandomFractals/chicago-crimes/main/data/crimes-2022.csv";
    
    try {
        const response = await axios.get(url);

        // Axios response data is directly accessible, no need to call .text() like with fetch
        return response.data;
    } catch (error) {
        // Axios wraps the error as an object, you can access the detailed error message through error.message
        throw new Error(`Error fetching CSV: ${error.message}`);
    }
}

type ParsedCsvRow = { [key: string]: string };

function parseCsv(csvData: string): ParsedCsvRow[] {
    // Split the CSV data into lines
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    
    // Extract the first line to use as column headers
    const headers = lines.shift()?.split(',').map(header => header.trim()) || [];
    
    // Map each line to an object with header keys
    const rows: ParsedCsvRow[] = lines.map(line => {
        const values = line.split(',').map(value => value.trim());
        const row: ParsedCsvRow = {};
        headers.forEach((header, index) => {
            row[header] = values[index];
        });
        return row;
    });
    
    return rows;
}