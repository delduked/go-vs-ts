import { app, HttpRequest, HttpResponse, HttpResponseInit, InvocationContext } from '@azure/functions';
const csv = require("csv-parser");
import { parse } from 'papaparse';


export async function tsfunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const csvData = await getCSVData();
        const startTime = process.hrtime.bigint(); // More precise timing

        // Parse CSV data
        const parsedData = parse(csvData, { header: true });
        console.log(parsedData.data); // Assuming you want to do something with the data or check it

        const endTime = process.hrtime.bigint();
        const executionTime = (endTime - startTime) / BigInt(1e6); // Convert to milliseconds


        return { status: 200, body: `Execution time: ${executionTime}ms` };
        

    } catch (error) {
        return error
    }
}
app.http('tsfunction', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: tsfunction,
});

async function getCSVData(): Promise<string> {
    const url = "https://raw.githubusercontent.com/curran/data/gh-pages/Rdatasets/csv/COUNT/affairs.csv";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching CSV: ${response.statusText}`);
    }

    return await response.text();
}