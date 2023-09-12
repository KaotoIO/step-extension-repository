import { OpenAPI } from 'openapi-types';
import { IEndpoint } from './RestStep';
import SwaggerParser from '@apidevtools/swagger-parser';

export async function parseApiSpec(
  input: string | OpenAPI.Document
): Promise<IEndpoint[]> {
  let swaggerParser: SwaggerParser = new SwaggerParser();

  const e: Array<IEndpoint> = [];
  try {
    await swaggerParser.validate(input, { dereference: { circular: 'ignore' } });
    const paths = swaggerParser.api.paths;
    if (paths) {
      Object.keys(paths).forEach((key: string) => {
        const path = paths[key];
        if (path) {
          const operations: Map<string, OpenAPI.Operation> = new Map<string, OpenAPI.Operation>();

          Object.entries(path).forEach((method: [string, OpenAPI.Operation]) => {
            operations.set(method[0], method[1]);
          });

          operations.forEach((op: OpenAPI.Operation, verb: string) => {
            let produces: Map<string, string[]> = new Map<string, string[]>();
            let consumes: Map<string, string[]> = new Map<string, string[]>();
            let produce: Map<string, string> = new Map<string, string>();
            let consume: Map<string, string> = new Map<string, string>();
            let operation: Map<string, OpenAPI.Operation> = new Map<string, OpenAPI.Operation>();
            operation.set(verb, op);
            const producesMediaType: string[] = [];

            if (typeof op !== 'object') {
              return;
            }

            if ('produces' in op) {
              op.produces?.forEach((prod: string) => producesMediaType.push(prod));
              if (producesMediaType.length > 0) {
                produce.set(verb, producesMediaType[0]);
              }
            } else if (op.responses) {
              Object.values(op.responses).forEach((response) => {
                if (response.content) {
                  producesMediaType.push.apply(producesMediaType, (Object.keys(response.content)));
                }
              });
            }

            produces.set(verb, producesMediaType);

            if ('consumes' in op) {
              const consumesMediaTypes: string[] = [];
              consumes.set(verb, consumesMediaTypes);
              op.consumes?.forEach((con: string) => consumesMediaTypes.push(con));
              if (consumesMediaTypes.length > 0) {
                consume.set(verb, consumesMediaTypes[0]);
              }
            }

            // @ts-expect-error | The problem comes from `verb` not being recognized as a HttpMethods from OpenAPIV2, OpenAPIV3, OpenAPIV3_1
            e.push({ name: key, path: path[verb].operationId, operations: operation, produces, consumes, produce, consume });
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
  return e;
}
