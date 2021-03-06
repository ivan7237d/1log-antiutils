import {
  addNumberedBadge,
  excludeFromTimeDelta,
  includeInTimeDelta,
  increaseStackLevel,
  logPalette,
  PluginLogger,
  pluginSymbol,
  PluginType,
  ProxyPlugin,
} from '1log';
import { pipe } from 'antiutils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFunction = (value: any) => value?.constructor === Function;

const logFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalFunction: any,
  addBadge: (log: PluginLogger) => PluginLogger,
  log: PluginLogger,
) =>
  Object.assign(
    excludeFromTimeDelta((...args: unknown[]) => {
      const logWithBadge = addBadge(log);
      logWithBadge([], ...args);
      const result = pipe(
        originalFunction,
        includeInTimeDelta,
        increaseStackLevel,
      )(...args);
      logWithBadge([{ caption: 'return', color: logPalette.purple }], result);
      return result;
    }),
    originalFunction,
  );

/**
 * For a view, logs its creation and `get`/`set` calls.
 */
export const statePlugin: ProxyPlugin = {
  [pluginSymbol]: PluginType.Proxy,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scope: (value: any) =>
    value !== null &&
    value !== undefined &&
    value.constructor === Object &&
    isFunction(value.get) &&
    isFunction(value.set),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (log) => ({ get, set, ...rest }: any): any => ({
    get: logFunction(get, addNumberedBadge('get', logPalette.yellow), log),
    set: logFunction(set, addNumberedBadge('set', logPalette.orange), log),
    ...rest,
  }),
};
