## Running the Go Azure Function

The Go Azure Function is located in the `gofunction/` directory. Follow the steps below to run it:

### Prerequisites

1. [Go](https://golang.org/dl/) (Version 1.11 or later)
2. [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash#v2) (Version 3.x)
3. [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) (Version 2.x)

### Steps

1. Navigate to the `gofunction/` directory:

    ```bash
    cd gofunction/
    ```

2. Build the function app:

    ```bash
    go build
    ```

3. Start the function app:

    ```bash
    func start
    ```

The Azure Function should now be running locally. You can call it using HTTP requests to `http://localhost:7071/api/{FunctionName}`.

Replace `{FunctionName}` with the name of your function.