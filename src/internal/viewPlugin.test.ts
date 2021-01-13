import { badgePlugin, getMessages, log } from '1log';
import { applyPipe, rootView, View } from 'antiutils';
import { viewPlugin } from './viewPlugin';

test('basic usage', () => {
  const view = applyPipe(
    rootView(42),
    ({ get, set }): View<number, string> => ({
      get: () => '0' + String(get()),
      set: (value) => set(Number(value)),
    }),
    log(badgePlugin('myView'))(viewPlugin),
  );
  expect(getMessages()).toMatchInlineSnapshot(`
    [myView] [create 1] +0ms
      Object {
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
});
