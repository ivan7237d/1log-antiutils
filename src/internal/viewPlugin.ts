import {
  ClosingPlugin,
  closingPluginSymbol,
  excludeFromTimeDelta,
  includeInTimeDelta,
  logPalette,
} from '1log';
import { applyPipe, View } from 'antiutils';

/**
 * For a view, logs its creation and calls to `get` and `set`.
 */
export const viewPlugin: ClosingPlugin<<S, A>(
  view: View<S, A>,
) => View<S, A>> = {
  type: closingPluginSymbol,
  transform: (log) => ({ get, set }) => ({
    get: excludeFromTimeDelta(() => {
      const badgeGet = { caption: 'get', color: logPalette.yellow };
      const increaseStackLevel = log([
        badgeGet,
        { caption: 'call', color: logPalette.green },
      ]);
      const result = applyPipe(get, includeInTimeDelta, increaseStackLevel)();
      log([badgeGet, { caption: 'return', color: logPalette.purple }], result);
      return result;
    }),
    set: excludeFromTimeDelta((value) => {
      const badgeSet = { caption: 'set', color: logPalette.orange };
      const increaseStackLevel = log(
        [badgeSet, { caption: 'call', color: logPalette.green }],
        value,
      );
      const result = applyPipe(
        set,
        includeInTimeDelta,
        increaseStackLevel,
      )(value);
      log([badgeSet, { caption: 'return', color: logPalette.purple }], result);
      return result;
    }),
  }),
};
