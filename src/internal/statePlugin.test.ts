import { badgePlugin, getMessages, log } from '1log';
import { pipe, rootView } from 'antiutils';

test('basic usage', () => {
  const view = pipe(
    rootView(42),
    ({ get, set }) => ({
      get: Object.assign(() => '0' + String(get()), { a: 1 }),
      set: Object.assign((value: string) => set(Number(value)), { b: 2 }),
      c: 3,
    }),
    log(badgePlugin('myView')),
  );
  expect(getMessages()).toMatchInlineSnapshot(`
    [myView] [create 1] +0ms
      Object {
        "c": 3,
        "get": [Function],
        "set": [Function],
      }
  `);
  expect(view.get()).toMatchInlineSnapshot(`"042"`);
  expect(getMessages()).toMatchInlineSnapshot(`
    [myView] [create 1] [get 1] +0ms
    [myView] [create 1] [get 1] [return] +0ms "042"
  `);
  expect(view.get()).toMatchInlineSnapshot(`"042"`);
  expect(getMessages()).toMatchInlineSnapshot(`
    [myView] [create 1] [get 2] +0ms
    [myView] [create 1] [get 2] [return] +0ms "042"
  `);
  expect(view.set('043')).toMatchInlineSnapshot(`43`);
  expect(getMessages()).toMatchInlineSnapshot(`
    [myView] [create 1] [set 1] +0ms "043"
    [myView] [create 1] [set 1] [return] +0ms 43
  `);
  expect(view.set('044')).toMatchInlineSnapshot(`44`);
  expect(getMessages()).toMatchInlineSnapshot(`
    [myView] [create 1] [set 2] +0ms "044"
    [myView] [create 1] [set 2] [return] +0ms 44
  `);
  expect(view).toMatchInlineSnapshot(`
    Object {
      "c": 3,
      "get": [Function],
      "set": [Function],
    }
  `);
  expect({ ...view.get }).toMatchInlineSnapshot(`
    Object {
      "a": 1,
    }
  `);
  expect({ ...view.set }).toMatchInlineSnapshot(`
    Object {
      "b": 2,
    }
  `);
});

test('correct handling on nullish values', () => {
  log(undefined);
  log(null);
  log({});
  log({ get: null, set: null });
  expect(getMessages()).toMatchInlineSnapshot(`
    +0ms undefined
    +0ms null
    +0ms Object {}
    +0ms
      Object {
        "get": null,
        "set": null,
      }
  `);
});
