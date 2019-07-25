import * as fs from 'fs';
import * as path from 'path';
import * as EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(path.join(__dirname, '../../schema.gql'), 'utf8')

const tester = new EasyGraphQLTester(schemaCode);

describe('project.resolver', () => {
  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  describe('given `query projects`', () => {
    describe('when query scalar data', () => {
      test('returns values', () => {
        const query = `query {
          projects {
            id
            name
          }
        }`;

        tester.test(true, query);
      });
    });

    describe('when query fieldResolver data', () => {
      test('returns values', () => {
        const query = `query {
          projects {
            tasks {
              title
            }
          }
        }`;

        tester.test(true, query);
      });
    });
  });

  describe('given `query project`', () => {
    describe('when called', () => {
      test('return values', () => {
        const query = `query {
          project(name: "test") {
            id
            name
          }
        }`;

        tester.test(true, query);
      });
    });
  });
});
