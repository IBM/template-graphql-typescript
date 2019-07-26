import * as fs from 'fs';
import * as path from 'path';
import * as EasyGraphQLTester from 'easygraphql-tester';
import {buildGraphqlSchema} from '../../src/schema';

describe('project schema', () => {
  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  let tester: EasyGraphQLTester;
  beforeAll(async () => {
    const schema = await buildGraphqlSchema();

    tester = new EasyGraphQLTester(schema);
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
