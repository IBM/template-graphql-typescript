import * as fs from 'fs';
import * as path from 'path';
import * as EasyGraphQLTester from 'easygraphql-tester';

const schemaCode = fs.readFileSync(path.join(__dirname, '../../schema.gql'), 'utf8')

const tester = new EasyGraphQLTester(schemaCode);

describe('task.resolver', () => {
  test('canary test verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  describe('given `query tasks`', () => {
    describe('when query scalar data', () => {
      test('returns values', () => {
        const query = `query {
          tasks {
            id
            title
            completed
          }
        }`;

        tester.test(true, query);
      });
    });

    describe('when query fieldResolver data', () => {
      test('returns values', () => {
        const query = `query {
          tasks {
            project {
              id
              name
            }
          }
        }`;

        tester.test(true, query);
      });
    });
  });

  describe('given `query task`', () => {
    describe('when called', () => {
      test('return values', () => {
        const query = `query {
          task(id: 1) {
            id
            title
          }
        }`;

        tester.test(true, query);
      });
    });
  });

  describe('given `mutation markTaskAsCompleted`', () => {
    describe('when called', () => {
      test('return values', () => {
        const mutation = `mutation {
          markTaskAsCompleted(id: 1) {
            id
            title
            completed
          }
        }`
      });
    });
  });
});
