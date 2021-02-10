# 1log-antiutils

[![npm version](https://img.shields.io/npm/v/1log-antiutils.svg?style=flat-square&color=brightgreen)](https://www.npmjs.com/package/1log-antiutils)
[![gzip size](https://badgen.net/bundlephobia/minzip/1log-antiutils?color=green&style=flat-square)](https://bundlephobia.com/result?p=1log-antiutils)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/1log-antiutils?style=flat-square)](https://bundlephobia.com/result?p=1log-antiutils)
[![types](https://img.shields.io/npm/types/1log-antiutils?color=brightgreen&style=flat-square)](https://www.npmjs.com/package/1log-antiutils)
[![coverage status](https://img.shields.io/coveralls/github/ivan7237d/1log-antiutils/master.svg?style=flat-square)](https://coveralls.io/github/ivan7237d/1log-antiutils?branch=master)

Provides [1log](https://github.com/ivan7237d/1log) plugin `statePlugin` for logging [Antiutils](https://github.com/ivan7237d/antiutils) views.

## Installing

Assuming you have Antiutils installed,

1. [Install 1log](https://github.com/ivan7237d/1log#installing).

2. Install the npm package:

   ```
   yarn add 1log-antiutils
   ```

   or

   ```
   npm install 1log-antiutils --save
   ```

3. Where you import `'1log/defaultConfig'` or `'1log/defaultJestConfig'`, also `import '1log-antiutils/defaultConfig'`, which runs `installPlugins(statePlugin)`.

## Usage

```ts
import { log } from '1log';
import { applyPipe, objectProp, rootView } from 'antiutils';

const view = applyPipe(rootView({ a: 42 }), objectProp('a'), log);
view.set(view.get() + 1);
```

<img src="https://github.com/ivan7237d/1log-antiutils/raw/master/images/view-adjusted.png" alt="screenshot">

---

[Contributing guidelines](https://github.com/ivan7237d/antiutils/blob/master/.github/CONTRIBUTING.md)
