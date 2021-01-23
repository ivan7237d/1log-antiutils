import '1log/defaultJestConfig';
import { installPlugins } from '1log';
import { statePlugin } from './src';

installPlugins(statePlugin);
