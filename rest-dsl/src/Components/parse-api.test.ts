import { parseApiSpec } from './parse-api';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yaml';

describe('parseApiSpec', () => {
  it('should parse an OpenAPI spec', async () => {
    const filename = resolve('src/Components/test/open-api_wso-mock.yaml');
    const openApiSpec = await readFile(filename, { encoding: 'utf8' });

    const spec = await parseApiSpec(parse(openApiSpec));

    expect(spec).toMatchSnapshot();
  });
});
