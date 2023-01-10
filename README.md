# api-mock-app

Emulates REST API services by mapping API Request endpoints to predefined API Response values.

## Version

1.0.0

## Installation

Using NPM:

```bash
npm install -D api-mock-app
```

or

```bash
npm install -g api-mock-app
```

to instal it globally.

## Usage

### CLI Usage:

```bash
api-mock-app [options]
```

### Options:

| Options      | Alias | Description                                               | Type      | Required   | Default |
| ------------ | ----- | --------------------------------------------------------- | --------- | ---------- | ------- |
| --configFile | -f    | The path to the API Configuration file                    | [string]  | [required] |         |
| --port       | -p    | The port on which the server will listen for API requests | [number]  | [optional] | 3000    |
| --version    |       | Show version number                                       | [boolean] |            |         |
| --help       |       | Show help                                                 | [boolean] |            |         |

### The API Configuration File

The API Configuration file is a JSON document that maps endpoint requests to their corresponding response values, and it is to be passed to the application as the `--configFile` (alias `-f`) launch parameter or as the `CONFIG_FILE` environment variable.

This JSON document must match the following JSON Schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "endPoints": {
      "type": "array",
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/APIServiceEndPoint"
      }
    }
  },

  "required": ["name", "endPoints"],

  "$defs": {
    "APIServiceEndPointRequest": {
      "type": "object",
      "properties": {
        "path": {
          "type": "string"
        },
        "method": {
          "type": "string",
          "enum": ["GET", "POST", "PUT", "DELETE"]
        },
        "queryParams": {
          "type": "object"
        },
        "headers": {
          "type": "object"
        },
        "body": {
          "type": "object"
        }
      },
      "required": ["url"]
    },

    "APIServiceEndPoint": {
      "type": "object",
      "properties": {
        "request": {
          "$ref": "#/$defs/APIServiceEndPointRequest"
        },
        "response": {
          "anyOf": [
            { "type": "string" },
            { "type": "number" },
            { "type": "integer" },
            { "type": "boolean" },
            { "type": "object" },
            { "type": "null" }
          ]
        }
      },
      "required": ["request", "response"]
    },

    "APIServiceError": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "code": {
          "type": "string"
        },
        "stack": {
          "type": "string"
        }
      },
      "required": ["message"]
    }
  }
}
```

As the JSON Schema above indicates, the API Configuration document consists of

- `name` field - a `string` which is the name the service,
- `endPoints` field - an `array` which contains the collection of API endpoints to emulate.

Each API endpoint must contain a `request` field and a `response` field.

The `request` field must contain the `path` (or the url) of the API endpoint
and the HTTP `method`, as one of `"GET" | "POST" | "PUT" | "DELETE"` options.
If the method is not provided, the `"GET"` option will be used by default.

Additionally, the `request` may contain optional fields like:

- `queryParams` - a key-value pair map of URL Query parameters,
- `headers` - a key-value pair map of HTTP Request Headers,
- `body` - a key-value pair map of HTTP Request body

The `response` field, on the other hand, is an object containing the type of CRUD action performed (as `string`), the status code (as `number`), and the payload. The payload can be either an error, in case of failure, or, in case of success, the predefined value of any valid JSON type, such as `string`, `number`, `boolean`, `object`, `null`, etc.

### Examples

#### Defining an API Configuration File example

Here is an example of API Configuration File:

```json
{
  "name": "demo",
  "endPoints": [
    {
      "request": {
        "path": "/"
      },
      "response": {
        "value": "Welcome!"
      }
    },
    {
      "request": {
        "path": "/user/admin",
        "method": "GET"
      },
      "response": {
        "id": 1,
        "name": "Admin User"
      }
    },
    {
      "request": {
        "path": "/user",
        "method": "POST"
      },
      "response": {
        "id": 3,
        "name": "New User"
      }
    },
    {
      "request": {
        "path": "/user/3",
        "method": "PUT"
      },
      "response": {
        "id": 3,
        "name": "Updated New User"
      }
    },
    {
      "request": {
        "path": "/user/:id",
        "method": "PUT"
      },
      "response": {
        "id": 4,
        "name": "Updated a User"
      }
    },
    {
      "request": {
        "path": "/user/1",
        "method": "GET"
      },
      "response": {
        "id": 1,
        "name": "John"
      }
    },
    {
      "request": {
        "path": "/user/2",
        "method": "GET"
      },
      "response": {
        "id": 1,
        "name": "Jane Doe"
      }
    }
  ]
}
```

#### Launching the app with an API Configuration file

```bash
api-mock-app -f ~/config.json
```

#### Launching the app with an API Configuration file and a port number

```bash
api-mock-app -f ~/config.json -p 1234
```

#### Launching the app with another service in parallel

A module, such as `concurrently`, can help launch the `api-mock-app` service in parallel with another app development service, such as a React development server (in the case of a React app).

```bash
concurrently --kill-others "npm start" "api-mock-app -f configFile.json -p 9009"
```

The command above can easily be defined as a `NPM` script, such as the following

```json
"start:dev": "concurrently --kill-others \"npm start\" \"api-mock-app -f ~/configFile.json -p 1234\"",
```

and included in the `package.json` file, as in the following example:

```json
// package.json
{
  ...
  "scripts": {
    ...
    "start": "react-app-rewired start",
    "start:dev": "concurrently --kill-others \"npm start\" \"api-mock-app -f ~/configFile.json -p 1234\"",
    ...
  },
  ...
}
```

### Request examples

Response examples for requests to an instance using the API Configuration file in the example above:

- GET request

```js
http://localhost:3000/
```

returns this documentation page.

- GET request

```js
http://localhost:3000/ping
//or
http://localhost:3000/api/ping
```

returns

```json
{
  "action": "PING",
  "payload": {
    "message": "PING: PONG"
  },
  "status": 200
}
```

- GET request

```js
http://localhost:3000/api/user/1
```

returns

```json
{
  "action": "GET_DATA",
  "payload": {
    "id": 1,
    "name": "John"
  },
  "status": 404
}
```

- GET request

```js
http://localhost:3000/api/user/
```

returns

```json
{
  "action": "GET_DATA",
  "payload": {
    "error": "GET_DATA: Resource not found"
  },
  "status": 404
}
```

- POST request

```js
http://localhost:3000/api/user/
```

returns

```json
{
  "action": "DATA",
  "payload": {
    "id": 3,
    "name": "New User"
  },
  "status": 200
}
```
