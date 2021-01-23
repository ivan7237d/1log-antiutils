import { badgePlugin, getMessages, log } from '1log';
import { applyPipe, rootView } from 'antiutils';

test('basic usage', () => {
  const view = applyPipe(
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
    [myView] [create 1] [get] [call] +0ms
    [myView] [create 1] [get] [return] +0ms "042"
  `);
  expect(view.set('043')).toMatchInlineSnapshot(`43`);
  expect(getMessages()).toMatchInlineSnapshot(`
    [myView] [create 1] [set] [call] +0ms "043"
    [myView] [create 1] [set] [return] +0ms 43
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
