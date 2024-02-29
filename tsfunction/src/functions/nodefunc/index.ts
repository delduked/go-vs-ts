import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
const fs = require("fs");
const csv = require("csv-parser");
 
export async function tsfunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
try {
    const results = [];

const startTime = process.hrtime();

fs.createReadStream("sample.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        //console.log(results); // Process records as needed
        const [seconds, nanoseconds] = process.hrtime(startTime);
        context.info(`Execution time: ${seconds * 1000 + nanoseconds / 1e6}ms`);
    });
    
} catch (error) {
    return error
}
}
app.http('tsfunction', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: tsfunction,
});