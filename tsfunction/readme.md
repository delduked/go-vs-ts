## Running the TypeScript Azure Function

The TypeScript Azure Function is located in the `tsfunction/` directory. Follow the steps below to run it:

### Prerequisites

1. [Node.js](https://nodejs.org/en/download/) (Version 10.x or later)
2. [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash#v2) (Version 3.x)
3. [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) (Version 2.x)

### Steps

1. Navigate to the `tsfunction/` directory:

    ```bash
    cd tsfunction/
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the function app:

    ```bash
    func start
    ```

The Azure Function should now be running locally. You can call it using HTTP requests to `http://localhost:7071/api/{FunctionName}`.

Replace `{FunctionName}` with the name of your function.