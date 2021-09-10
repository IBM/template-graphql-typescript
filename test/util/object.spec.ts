import {omit} from '../../src/util/object';

describe('object utils', () => {
  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  describe('given omit', () => {
    describe('when one omit field provided', () => {
      test('then remove field from object', async () => {
        const a = 'value1';
        expect(omit({a, b: 'value2'}, 'b')).toEqual({a});
      });
    });
    describe('when one omit field provided that does not match', () => {
      test('then do not remove field from object', async () => {
        const a = 'value1';
        const b = 'value2';
        expect(omit<{a: string, b: string, c?: string}>({a, b}, 'c')).toEqual({a, b});
      });
    });
    describe('when two omit fields provided as an array', () => {
      test('then remove both fields from object', async () => {
        const a = 'value1';
        expect(omit({a, b: 'value2', c: 'value3'}, ['b', 'c'])).toEqual({a});
      });
    });
  });
});