# api-mock-up

Emulates REST API services by mapping API Request endpoints to predefined API Response values.

## Version

1.0.7

## Installation

Using NPM:

```bash
npm install -D api-mock-up
```

or

```bash
npm install -g api-mock-up
```

to install it globally.

## Usage

### CLI Usage

```bash
api-mock-up[options]
```

### Options:

| Options      | Alias | Description                                               | Type      | Required   | Default |
| ------------ | ----- | --------------------------------------------------------- | --------- | ---------- | ------- |
| --configFile | -f    | The path to the API Configuration file                    | [string]  | [required] |         |
| --port       | -p    | The port on which the server will listen for API requests | [number]  | [optional] | 3000    |
| --version    | -v    | Show version number                                       | [boolean] |            |         |
| --help       | -h    | Show help                                                 | [boolean] |            |         |

### The API Configuration File

The API Configuration file is a JSON (or YAML) document that maps endpoint requests to their corresponding response values, and it is to be passed to the application as the `--configFile` (alias `-f`) launch parameter or as the `CONFIG_FILE` environment variable.

This JSON document must match the following JSON Schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string",
    },
    "endPoints": {
      "type": "array",
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/ServiceEndPoint"
      }
    }
  },

  "required": ["name", "endPoints"],

  "$defs": {
    "ServiceEndPointRequest": {
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
      "required": ["path"]
    },

    "ServiceEndPointResponse": {
      "type": "object",
      "properties": {
        "payload": {
          "anyOf": [
            { "type": "array" },
            { "type": "string" },
            { "type": "number" },
            { "type": "integer" },
            { "type": "boolean" },
            { "type": "object" },
            { "type": "null" },
          ],
        },
      },
      "required": ["payload"],
    }

    "ServiceEndPoint": {
      "type": "object",
      "properties": {
        "request": {
          "$ref": "#/$defs/ServiceEndPointRequest"
        },
        "response": {
          "$ref": "#/$defs/ServiceEndPointResponse",
        }
      },
      "required": ["request", "response"]
    },

    "ServiceError": {
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
- `description` field - an optional `string` which describes the service
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

Here is an example of API Configuration File in JSON format:

```json
{
  "name": "demo",
  "description": "Api Mockup Demo",
  "endPoints": [
    {
      "request": {
        "path": "/api"
      },
      "response": {
        "payload": [
          {
            "value": "Hello!"
          },
          {
            "value": "Welcome!"
          }
        ]
      }
    },
    {
      "request": {
        "path": "/api/joke"
      },
      "response": {
        "payload": {
          "$ref": "https://v2.jokeapi.dev/joke/Programming"
        }
      }
    },
    {
      "request": {
        "path": "/api/jokes"
      },
      "response": {
        "payload": [
          {
            "$ref": "https://v2.jokeapi.dev/joke/Programming"
          },
          {
            "$ref": "https://v2.jokeapi.dev/joke/Programming"
          }
        ]
      }
    },
    {
      "request": {
        "path": "/api/admin",
        "method": "GET"
      },
      "response": {
        "payload": {
          "id": 1,
          "name": "Admin User"
        }
      }
    },
    {
      "request": {
        "path": "/api/users",
        "queryParams": {}
      },
      "response": {
        "payload": [
          {
            "id": 1,
            "name": "John"
          },
          {
            "id": 2,
            "name": "Jane Doe"
          }
        ]
      }
    },
    {
      "request": {
        "path": "/api/user",
        "method": "POST"
      },
      "response": {
        "payload": {
          "$ref": "test/responses/new-user.json"
        }
      }
    },
    {
      "request": {
        "path": "/api/user/3",
        "method": "PUT"
      },
      "response": {
        "payload": {
          "id": 3,
          "name": "Updated New User"
        }
      }
    },
    {
      "request": {
        "path": "/api/user/:id",
        "method": "PUT"
      },
      "response": {
        "payload": {
          "$ref": "test/responses/updated-user.json"
        }
      }
    },
    {
      "request": {
        "path": "/api/user/1",
        "method": "GET"
      },
      "response": {
        "payload": {
          "id": 1,
          "name": "John"
        }
      }
    },
    {
      "request": {
        "path": "/api/user/2",
        "method": "GET"
      },
      "response": {
        "payload": {
          "id": 2,
          "name": "Jane Doe"
        }
      }
    },
    {
      "request": {
        "path": "/api/user/:key",
        "method": "GET"
      },
      "response": {
        "payload": {
          "id": "xyz",
          "name": "Any One"
        }
      }
    }
  ]
}
```

And the same Configuration File in YAML format:

```yml
name: demo
description: Api Mockup Demo
endPoints:
  - request:
      path: "/api"
    response:
      payload:
        - value: Hello!
        - value: Welcome!
  - request:
      path: "/api/joke"
    response:
      payload:
        "$ref": https://v2.jokeapi.dev/joke/Programming
  - request:
      path: "/api/jokes"
    response:
      payload:
        - "$ref": https://v2.jokeapi.dev/joke/Programming
        - "$ref": https://v2.jokeapi.dev/joke/Programming
  - request:
      path: "/api/admin"
      method: GET
    response:
      payload:
        id: 1
        name: Admin User
  - request:
      path: "/api/users"
      queryParams: {}
    response:
      payload:
        - id: 1
          name: John
        - id: 2
          name: Jane Doe
  - request:
      path: "/api/user"
      method: POST
    response:
      payload:
        "$ref": test/responses/new-user.json
  - request:
      path: "/api/user/3"
      method: PUT
    response:
      payload:
        id: 3
        name: Updated New User
  - request:
      path: "/api/user/:id"
      method: PUT
    response:
      payload:
        "$ref": test/responses/updated-user.json
  - request:
      path: "/api/user/1"
      method: GET
    response:
      payload:
        id: 1
        name: John
  - request:
      path: "/api/user/2"
      method: GET
    response:
      payload:
        id: 2
        name: Jane Doe
  - request:
      path: "/api/user/:key"
      method: GET
    response:
      payload:
        id: xyz
        name: Any One
```

Note: If the `payload` contains the field `$ref`, the `$ref` is expected to be the path or the url to an external resource located in the local file system or on the web. All relative paths will be resolved based on the `process.cwd()` (the current working directory).

#### Launching the app with an API Configuration file

```bash
api-mock-up -f ~/config.json
```

#### Launching the app with an API Configuration file and a port number

```bash
api-mock-up -f ~/config.json -p 1234
```

#### Launching the app with another service in parallel

A module, such as `concurrently`, can help launch the `api-mock-up` service in parallel with another app development service, such as a React development server (in the case of a React app).

```bash
concurrently --kill-others "npm start" "api-mock-up -f configFile.json -p 9009"
```

The command above can easily be defined as a `NPM` script, such as the following

```json
"start:dev": "concurrently --kill-others \"npm start\" \"api-mock-up -f ~/configFile.json -p 1234\"",
```

and included in the `package.json` file, as in the following example:

```json
// package.json
{
  ...
  "scripts": {
    ...
    "start": "react-app-rewired start",
    "start:dev": "concurrently --kill-others \"npm start\" \"api-mock-up -f ~/configFile.json -p 1234\"",
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
  "action": "DATA",
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
  "action": "DATA",
  "payload": {
    "error": "Resource not found"
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
