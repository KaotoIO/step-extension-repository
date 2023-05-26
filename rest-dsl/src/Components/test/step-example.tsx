import { IStepProps } from "../../../../try-catch-eip/kaoto/types/dts/src/types";

export const exampleStep: IStepProps = {
    "name": "rest",
    "type": "START",
    "id": "CAMEL-REST-DSL",
    "kind": "CAMEL-REST-DSL",
    "title": "REST DSL",
    "description": "This step represents a REST API.",
    "group": "REST DSL",
    "parameters": [
        {
            "type": "string",
            "id": "path",
            "title": "Path of the endpoint",
            "description": "Path where this endpoint is listening."
        },
        {
            "type": "string",
            "id": "description",
            "title": "Description of the endpoint",
            "description": "Human readable description of this endpoint."
        }
    ],
    "required": [],
    "branches": [
        {
            "steps": [
                {
                    "name": "get",
                    "type": "MIDDLE",
                    "id": "camel-rest-verb-get",
                    "kind": "CAMEL-REST-VERB",
                    "title": "HTTP GET",
                    "description": "This step represents a GET HTTP endpoint in the REST API.",
                    "group": "REST DSL",
                    "parameters": [],
                    "required": [],
                    "branches": [
                        {
                            "steps": [
                                {
                                    "name": "consumes",
                                    "type": "MIDDLE",
                                    "id": "CAMEL-REST-CONSUMES",
                                    "kind": "CAMEL-REST-ENDPOINT",
                                    "parameters": [
                                        {
                                            "type": "string",
                                            "id": "consumes",
                                            "title": "Consumes Media Type",
                                            "description": "What kind of Media Type this endpoint consumes."
                                        },
                                        {
                                            "type": "string",
                                            "id": "produces",
                                            "path": false,
                                            "value": "application/json",
                                            "title": "Produces Media Type",
                                            "description": "What kind of Media Type this endpoint produces."
                                        },
                                        {
                                            "type": "string",
                                            "id": "id",
                                            "path": false,
                                            "title": "Identifier",
                                            "description": "Identifier of this endpoint."
                                        },
                                        {
                                            "type": "string",
                                            "id": "uri",
                                            "path": false,
                                            "value": "/jokes/search",
                                            "title": "Uri Path",
                                            "description": "Uri path of this endpoint",
                                            "defaultValue": "/"
                                        },
                                        {
                                            "type": "string",
                                            "id": "description",
                                            "path": false,
                                            "title": "Description",
                                            "description": "Description of the endpoint."
                                        },
                                        {
                                            "type": "object",
                                            "id": "param",
                                            "path": false,
                                            "title": "Parameters",
                                            "description": "Parameters of the endpoint."
                                        }
                                    ],
                                    "required": [],
                                    "branches": [],
                                },
                                {
                                    "name": "direct",
                                    "type": "END",
                                    "id": "direct-producer",
                                    "kind": "Camel-Connector",
                                    "icon": "",
                                    "title": "Direct",
                                    "description": "Call another endpoint from the same Camel Context synchronously.",
                                    "group": "Camel-Component",
                                    "parameters": [
                                        {
                                            "type": "string",
                                            "id": "name",
                                            "path": true,
                                            "value": "searchUsingGET",
                                            "title": "Name",
                                            "description": "Name of direct endpoint"
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "bridgeErrorHandler",
                                            "path": false,
                                            "title": "Bridge Error Handler",
                                            "description": "Allows for bridging the consumer to the Camel routing Error Handler, which mean any exceptions occurred while the consumer is trying to pickup incoming messages, or the likes, will now be processed as a message and handled by the routing Error Handler. By default the consumer will use the org.apache.camel.spi.ExceptionHandler to deal with exceptions, that will be logged at WARN or ERROR level and ignored.",
                                            "defaultValue": false
                                        },
                                        {
                                            "type": "object",
                                            "id": "exceptionHandler",
                                            "path": false,
                                            "title": "Exception Handler",
                                            "description": "To let the consumer use a custom ExceptionHandler. Notice if the option bridgeErrorHandler is enabled then this option is not in use. By default the consumer will deal with exceptions, that will be logged at WARN or ERROR level and ignored."
                                        },
                                        {
                                            "type": "object",
                                            "id": "exchangePattern",
                                            "path": false,
                                            "title": "Exchange Pattern",
                                            "description": "Sets the exchange pattern when the consumer creates an exchange."
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "block",
                                            "path": false,
                                            "title": "Block",
                                            "defaultValue": true
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "failIfNoConsumers",
                                            "path": false,
                                            "title": "Fail If No Consumers",
                                            "description": "Whether the producer should fail by throwing an exception, when sending to a DIRECT endpoint with no active consumers."
                                        },
                                        {
                                            "type": "number",
                                            "id": "timeout",
                                            "path": false,
                                            "title": "Timeout",
                                            "description": "The timeout value to use if block is enabled."
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "lazyStartProducer",
                                            "path": false,
                                            "title": "Lazy Start Producer",
                                            "description": "Whether the producer should be started lazy (on the first message). By starting lazy you can use this to allow CamelContext and routes to startup in situations where a producer may otherwise fail during starting and cause the route to fail being started. By deferring this startup to be lazy then the startup failure can be handled during routing messages via Camel's routing error handlers. Beware that when the first message is processed then creating and starting the producer may take a little time and prolong the total processing time of the processing."
                                        }
                                    ],
                                    "required": [
                                        "name"
                                    ],
                                    "branches": [],
                                    "UUID": "Camel Route-1_rest-0_branch-0_get-0_branch-0_direct-1"
                                }
                            ],
                            "parameters": [],
                            "identifier": "searchUsingGET"
                        }
                    ],
                }
            ],
            "parameters": [],
            "identifier": "get"
        },
        {
            "steps": [
                {
                    "name": "post",
                    "type": "MIDDLE",
                    "id": "camel-rest-verb-post",
                    "kind": "CAMEL-REST-VERB",
                    "title": "HTTP POST",
                    "description": "This step represents a POST HTTP endpoint in the REST API.",
                    "group": "REST DSL",
                    "parameters": [],
                    "required": [],
                    "branches": [
                        {
                            "steps": [
                                {
                                    "name": "consumes",
                                    "type": "MIDDLE",
                                    "id": "CAMEL-REST-CONSUMES",
                                    "kind": "CAMEL-REST-ENDPOINT",
                                    "parameters": [
                                        {
                                            "type": "string",
                                            "id": "consumes",
                                            "path": false,
                                            "value": "application/x-www-form-urlencoded",
                                            "title": "Consumes Media Type",
                                            "description": "What kind of Media Type this endpoint consumes."
                                        },
                                        {
                                            "type": "string",
                                            "id": "produces",
                                            "path": false,
                                            "value": "application/json",
                                            "title": "Produces Media Type",
                                            "description": "What kind of Media Type this endpoint produces."
                                        },
                                        {
                                            "type": "string",
                                            "id": "id",
                                            "path": false,
                                            "title": "Identifier",
                                            "description": "Identifier of this endpoint."
                                        },
                                        {
                                            "type": "string",
                                            "id": "uri",
                                            "path": false,
                                            "value": "/jokes/slack",
                                            "title": "Uri Path",
                                            "description": "Uri path of this endpoint"
                                        },
                                        {
                                            "type": "string",
                                            "id": "description",
                                            "path": false,
                                            "title": "Description",
                                            "description": "Description of the endpoint."
                                        },
                                        {
                                            "type": "object",
                                            "id": "param",
                                            "path": false,
                                            "title": "Parameters",
                                            "description": "Parameters of the endpoint."
                                        }
                                    ],
                                    "required": [],
                                    "branches": [],
                                },
                                {
                                    "name": "direct",
                                    "type": "END",
                                    "id": "direct-producer",
                                    "kind": "Camel-Connector",
                                    "icon": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNDAuOTc4NDU4bW0iCiAgIGhlaWdodD0iNDAuOTc4NDU4bW0iCiAgIHZpZXdCb3g9IjAgMCA0MC45Nzg0NTkgNDAuOTc4NDU4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcyMzQzIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjEuMiAoMGEwMGNmNTMzOSwgMjAyMi0wMi0wNCkiCiAgIHNvZGlwb2RpOmRvY25hbWU9IkFwYWNoZV9DYW1lbF9Mb2dvLnN2ZyIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIzMzciPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0iU1ZHSURfMV8tMCIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeDE9Ii00MjI5LjY2NTUiCiAgICAgICB5MT0iLTQxNDMuNjQwMSIKICAgICAgIHgyPSItMzk4Ny41ODg2IgogICAgICAgeTI9Ii0zODYwLjU3MyIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMC40MjI2LC0wLjkwNjMsMC45MDYzLDAuNDIyNiw2MTg5LjAzNTYsLTE5MzYuODM2MSkiPgogICAgICA8c3RvcAogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNGNjk5MjMiCiAgICAgICAgIGlkPSJzdG9wMzI4Ni04IiAvPgogICAgICA8c3RvcAogICAgICAgICBvZmZzZXQ9IjAuMTA5OTU4MjciCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNGNzlBMjMiCiAgICAgICAgIGlkPSJzdG9wMzI4OC0yIiAvPgogICAgICA8c3RvcAogICAgICAgICBvZmZzZXQ9IjAuOTQ1MDIwNTYiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNFOTc4MjYiCiAgICAgICAgIGlkPSJzdG9wMzI5MC0yIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLjQyMjYsLTAuOTA2MywwLjkwNjMsMC40MjI2LDYxODkuMDM1NiwtMTkzNi44MzYxKSIKICAgICAgIHkyPSItMzg2MC41NzMiCiAgICAgICB4Mj0iLTM5ODcuNTg4NiIKICAgICAgIHkxPSItNDE0My42NDAxIgogICAgICAgeDE9Ii00MjI5LjY2NTUiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDM5NDkiPgogICAgICA8c3RvcAogICAgICAgICBpZD0ic3RvcDM5NTEiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNGNjk5MjMiCiAgICAgICAgIG9mZnNldD0iMCIgLz4KICAgICAgPHN0b3AKICAgICAgICAgaWQ9InN0b3AzOTUzIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojRjc5QTIzIgogICAgICAgICBvZmZzZXQ9IjAuMDgwNDc4NDQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wMzk1NSIKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I0U5NzgyNiIKICAgICAgICAgb2Zmc2V0PSIwLjQxODc0Mjg3IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLjQyMjYsLTAuOTA2MywwLjkwNjMsMC40MjI2LDYxODkuMDM1NiwtMTkzNi44MzYxKSIKICAgICAgIHkyPSItMzg2MC41NzMiCiAgICAgICB4Mj0iLTM5ODcuNTg4NiIKICAgICAgIHkxPSItNDE0My42NDAxIgogICAgICAgeDE9Ii00MjI5LjY2NTUiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQ1NTYiPgogICAgICA8c3RvcAogICAgICAgICBpZD0ic3RvcDQ1NTgiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmNmU0MjM7c3RvcC1vcGFjaXR5OjEiCiAgICAgICAgIG9mZnNldD0iMCIgLz4KICAgICAgPHN0b3AKICAgICAgICAgaWQ9InN0b3A0NTYwIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojRjc5QTIzIgogICAgICAgICBvZmZzZXQ9IjAuNDExOTA4MzkiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wNDU2MiIKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I0U5NzgyNiIKICAgICAgICAgb2Zmc2V0PSIwLjczMjcwNzQ0IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjMuNjIwMzg2NyIKICAgICBpbmtzY2FwZTpjeD0iODEuMzQ0OTAyIgogICAgIGlua3NjYXBlOmN5PSI5My42MzY0MDYiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9Imc0ODAxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBmaXQtbWFyZ2luLXRvcD0iMCIKICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiCiAgICAgZml0LW1hcmdpbi1yaWdodD0iMCIKICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTA0MyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMjM0MCI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjEwLjQ1ODQ2LC0xOC40NjQzMTgpIj4KICAgIDxnCiAgICAgICBpZD0iZzQ4MzkiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjMxNTIwNDAxLDAsMCwwLjMxNTIwNDAxLC0yNTMuNDY0MDEsLTE3My43MDA5OCkiPgogICAgICA8ZwogICAgICAgICBpZD0iZzQ3NjMiCiAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDczLjkxODk2MSwxOS41MTAwNSkiCiAgICAgICAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iL2hvbWUvenJlZ3ZhcnQvd29ya3NwYWNlcy9jYW1lbC1zYWxlc2ZvcmNlL2NhbWVsL2RvY3MvaW1nL2xvZ28tbWVkaXVtLnBuZyIKICAgICAgICAgaW5rc2NhcGU6ZXhwb3J0LXhkcGk9IjEwNi45NiIKICAgICAgICAgaW5rc2NhcGU6ZXhwb3J0LXlkcGk9IjEwNi45NiI+CiAgICAgICAgPGcKICAgICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzIuMDIzMTUyLDIwLjE2MDA0NikiCiAgICAgICAgICAgaWQ9Imc0NzY1Ij4KICAgICAgICAgIDxnCiAgICAgICAgICAgICBzdHlsZT0iZm9udC1zaXplOjI3LjkyMDNweDtmb250LWZhbWlseTpTYW5zO2xldHRlci1zcGFjaW5nOjBweDt3b3JkLXNwYWNpbmc6MHB4O2ZpbGw6IzZjNWQ1MyIKICAgICAgICAgICAgIGlkPSJnNDc2NyIgLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcKICAgICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNS40MDE3NDA4LDcuMzk3NjMzNSkiCiAgICAgICAgICAgaWQ9Imc0Nzk1IiAvPgogICAgICA8L2c+CiAgICAgIDxnCiAgICAgICAgIGlkPSJnNDgwMSIKICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM4Ni44NzM5NSwtMTY5LjQwMjU4KSI+CiAgICAgICAgPGNpcmNsZQogICAgICAgICAgIGN5PSI4NDQuMDU2MjciCiAgICAgICAgICAgY3g9IjU4OC41MTc2NCIKICAgICAgICAgICBzdHlsZT0iZmlsbDojZjY5OTIzO3N0cm9rZTojZjY5OTIzO3N0cm9rZS13aWR0aDo0Ljk2MTg2NTgxO3N0cm9rZS1saW5lam9pbjpyb3VuZDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICAgIGlkPSJwYXRoNDgwNSIKICAgICAgICAgICByPSI2Mi41MTk4NTIiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBpZD0icGF0aDQ4MDkiCiAgICAgICAgICAgZD0ibSA1NjYuNTYyNSw4MTguMzQzNzUgYyAtMTYuMDI2ODgsNi40Njc2MiAtMjkuODQ0MTksMTcuMTYyNTQgLTQzLDI4LjE1NjI1IDAuNTUyNzIsMjkuMjY2MTMgMjMuNTU1MzgsNTYuMjA5MzQgNTIuMzk5MSw2MS4zMDc1OCA1Ljk1MDQ5LDEuNDYwODMgMTIuOTY3NTIsMi43MjY4MiAxMy44NjE1NCwtNS4xOTA0NSAxMC4zNDI0NCwtMjQuNzk5MDIgNS4yMDMzOSwtNTUuMjIxMzggLTEzLjEyNzM1LC03NC45NTc5NCAtMy4wNzQ3NiwtMy40MTQ2MiAtNi40NzIzMywtNi41Mzg1IC0xMC4xMzMyOSwtOS4zMTU0NCB6IgogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjAuNzU7ZmlsbDojMjgxNzBiIgogICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICAgICAgPGcKICAgICAgICAgICBpZD0iZzQ4MTEiPgogICAgICAgICAgPHBhdGgKICAgICAgICAgICAgIGlkPSJwYXRoNDgxMyIKICAgICAgICAgICAgIGQ9Im0gNTkwLjMxMTE0LDgwNi4zMDg3OCBjIC05LjQwNTQ3LDIuNDI4NzggMi44ODQwMywxMy45MTgxMSAtNS4xNjgwMSwxNy44NjA3OSAtOC4zNjIwMiw4Ljg4OTcxIC05LjkwMTExLDIyLjE1MDU4IC0xOC40NjE0NywzMC44MzAyNiAtNy4xODcxNiw1LjkwNzgxIC0xNy43NzUzLDMuNTMzODkgLTI0LjQzNzgsLTIuMDA0OTkgLTYuNDY3MDEsLTQuNDU1MTUgLTEyLjE1NSwtOS45Mzg1OCAtMTguNjgyNzIsLTE0LjMxMTA2IC0yLjQ3Mzg1LDI0LjkxNjQ2IDExLjI3NzE4LDUwLjQ3NjQgMzMuMjE4NzUsNjIuNDM3NTEgMTQuMDAwNywtMC44MDcwMSAyNS4wMjg3NSwtMTEuMTkyNDggMzIuMjUyNTksLTIyLjQxNjIgNy45NTI3NywtMTIuMDYxNzcgMTIuMTE2MTksLTI2LjEzMjU2IDE5LjUzMjg2LC0zOC40NjUzMyA1Ljg0MzgsLTYuNjI0NDEgMTUuNDM4NTksLTYuNzAyOTIgMjMuNDkxODksLTguMjE0OTQgNi41MzkyNywwLjQ4NzkzIDE0LjUzMTYxLC01LjEzOTY1IDguNTAzNTMsLTExLjUyNjEyIC0zLjIxNTExLC02LjI4MzE3IC0xMC41NTgyNSwtNS45NTU0MyAtMTYuNTQyNDIsLTUuNTQwMzMgLTguMTY1NDksMS41MjI2OSAtMTUuMDIxNDcsLTIuMDE5NzUgLTIyLjY4NTY2LC0yLjc3NDU5IC01LjA5NDYsMS42ODM0NiAtNi41MjA5LC01LjM5MTYxIC0xMS4wMjE1NCwtNS44NzUgeiIKICAgICAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiCiAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgICAgIDwvZz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==\\n",
                                    "title": "Direct",
                                    "description": "Call another endpoint from the same Camel Context synchronously.",
                                    "group": "Camel-Component",
                                    "parameters": [
                                        {
                                            "type": "string",
                                            "id": "name",
                                            "path": true,
                                            "value": "commandUsingPOST",
                                            "title": "Name",
                                            "description": "Name of direct endpoint"
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "bridgeErrorHandler",
                                            "path": false,
                                            "title": "Bridge Error Handler",
                                            "description": "Allows for bridging the consumer to the Camel routing Error Handler, which mean any exceptions occurred while the consumer is trying to pickup incoming messages, or the likes, will now be processed as a message and handled by the routing Error Handler. By default the consumer will use the org.apache.camel.spi.ExceptionHandler to deal with exceptions, that will be logged at WARN or ERROR level and ignored.",
                                            "defaultValue": false
                                        },
                                        {
                                            "type": "object",
                                            "id": "exceptionHandler",
                                            "path": false,
                                            "title": "Exception Handler",
                                            "description": "To let the consumer use a custom ExceptionHandler. Notice if the option bridgeErrorHandler is enabled then this option is not in use. By default the consumer will deal with exceptions, that will be logged at WARN or ERROR level and ignored."
                                        },
                                        {
                                            "type": "object",
                                            "id": "exchangePattern",
                                            "path": false,
                                            "title": "Exchange Pattern",
                                            "description": "Sets the exchange pattern when the consumer creates an exchange."
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "block",
                                            "path": false,
                                            "title": "Block",
                                            "description": "If sending a message to a direct endpoint which has no active consumer, then we can tell the producer to block and wait for the consumer to become active."
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "failIfNoConsumers",
                                            "path": false,
                                            "title": "Fail If No Consumers",
                                            "description": "Whether the producer should fail by throwing an exception, when sending to a DIRECT endpoint with no active consumers.",
                                            "defaultValue": true
                                        },
                                        {
                                            "type": "number",
                                            "id": "timeout",
                                            "path": false,
                                            "title": "Timeout",
                                            "defaultValue": 30000
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "lazyStartProducer",
                                            "path": false,
                                            "title": "Lazy Start Producer",
                                            "defaultValue": false
                                        },
                                        {
                                            "type": "boolean",
                                            "id": "synchronous",
                                            "path": false,
                                            "title": "Synchronous",
                                            "description": "Whether synchronous processing is forced. If enabled then the producer thread, will be forced to wait until the message has been completed before the same thread will continue processing. If disabled (default) then the producer thread may be freed and can do other work while the message is continued processed by other threads (reactive)."
                                        },
                                        {
                                            "type": "string",
                                            "id": "step-id-kaoto",
                                            "path": false,
                                            "title": "Step ID"
                                        }
                                    ],
                                    "required": [
                                        "name"
                                    ],
                                    "branches": [],
                                    "UUID": "Camel Route-1_rest-0_branch-1_post-0_branch-0_direct-1"
                                }
                            ],
                            "parameters": [],
                            "identifier": "commandUsingPOST"
                        }
                    ],
                }
            ],
            "parameters": [],
            "identifier": "post"
        }
    ],
    "UUID": "Camel Route-1_rest-0"
};