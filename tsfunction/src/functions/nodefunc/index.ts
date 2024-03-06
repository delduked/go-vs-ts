import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext
} from "@azure/functions";
import axios from "axios";

export async function tsfunction(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    try {
        const csvData = await getCSVData();
        const startTime = process.hrtime.bigint(); // More precise timing

        // Assuming you want to process the CSV data here. Since you're not using papaparse now, 
        // you might need to manually parse the CSV data or find another way to handle it as per your requirement.

        const endTime = process.hrtime.bigint();
        const executionTime = (endTime - startTime) / BigInt(1e6); // Convert to milliseconds

        return {
            status: 200,
            body: `Execution time: ${executionTime}ms` ,
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
        "https://raw.githubusercontent.com/curran/data/gh-pages/Rdatasets/csv/COUNT/affairs.csv";
    
    try {
        const response = await axios.get(url);

        // Axios response data is directly accessible, no need to call .text() like with fetch
        return response.data;
    } catch (error) {
        // Axios wraps the error as an object, you can access the detailed error message through error.message
        throw new Error(`Error fetching CSV: ${error.message}`);
    }
}
