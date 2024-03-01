import { app, HttpRequest, HttpResponse, HttpResponseInit, InvocationContext } from '@azure/functions';
const fs = require("fs");
const csv = require("csv-parser");

export async function tsfunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const results = [];

        const startTime = process.hrtime();

        let res: string;
        fs.createReadStream("sample.csv")
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                const [seconds, nanoseconds] = process.hrtime(startTime);
                res = `Execution time: ${seconds * 1000 + nanoseconds / 1e6}ms`
                console.log(res);
            });

        return { status: 200, body: res };
        

    } catch (error) {
        return error
    }
}
app.http('tsfunction', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: tsfunction,
});