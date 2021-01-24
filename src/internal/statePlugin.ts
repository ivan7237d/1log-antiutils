import {
  excludeFromTimeDelta,
  includeInTimeDelta,
  increaseStackLevel,
  LogBadge,
  logPalette,
  PluginLogger,
  pluginSymbol,
  PluginType,
  ProxyPlugin,
} from '1log';
import { applyPipe } from 'antiutils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFunction = (value: any) => value?.constructor === Function;

const logFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalFunction: any,
  badge: LogBadge,
  log: PluginLogger,
) =>
  Object.assign(
    excludeFromTimeDelta((...args: unknown[]) => {
      log([badge, { caption: 'call', color: logPalette.green }], ...args);
      const result = applyPipe(
        originalFunction,
        includeInTimeDelta,
        increaseStackLevel,
      )(...args);
      log([badge, { caption: 'return', color: logPalette.purple }], result);
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
    isFunction(value?.get) &&
    isFunction(value?.set),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (log) => ({ get, set, ...rest }: any): any => ({
    get: logFunction(get, { caption: 'get', color: logPalette.yellow }, log),
    set: logFunction(set, { caption: 'set', color: logPalette.orange }, log),
    ...rest,
  }),
};
