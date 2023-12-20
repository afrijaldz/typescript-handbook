<div class="tsconfig raised main-content-block markdown"><article id='Top Level'>

### Root Fields

Starting up are the root options in the TSConfig - these options relate to how your TypeScript or JavaScript project is set up.

<div>
<section class='compiler-option'>
<h3 id='files-config'><a aria-label="Link to the compiler option: files" id='files' href='#files' name='files' aria-labelledby="files-config">#</a> Files - <code>files</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specifies an allowlist of files to include in the program. An error occurs if any of the files can't be found.

```json tsconfig
{
  "compilerOptions": {},
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "tsc.ts"
  ]
}
```

This is useful when you only have a small number of files and don't need to use a glob to reference many files.
If you need that then use [`include`](#include).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>false</code></p>
</li>
<li><span>Related:</span><ul><li><p><a href='#include' aria-label="Jump to compiler option info for include" ><code>include</code></a></p>
</li><li><p><a href='#exclude' aria-label="Jump to compiler option info for exclude" ><code>exclude</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='extends-config'><a aria-label="Link to the compiler option: extends" id='extends' href='#extends' name='extends' aria-labelledby="extends-config">#</a> Extends - <code>extends</code></h3>
<div class='compiler-content'>
<div class='markdown'>

The value of `extends` is a string which contains a path to another configuration file to inherit from.
The path may use Node.js style resolution.

The configuration from the base file are loaded first, then overridden by those in the inheriting config file. All relative paths found in the configuration file will be resolved relative to the configuration file they originated in.

It's worth noting that [`files`](#files), [`include`](#include), and [`exclude`](#exclude) from the inheriting config file _overwrite_ those from the
base config file, and that circularity between configuration files is not allowed.

Currently, the only top-level property that is excluded from inheritance is [`references`](#references).

##### Example

`configs/base.json`:

```json tsconfig
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

`tsconfig.json`:

```json tsconfig
{
  "extends": "./configs/base",
  "files": ["main.ts", "supplemental.ts"]
}
```

`tsconfig.nostrictnull.json`:

```json tsconfig
{
  "extends": "./tsconfig",
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

Properties with relative paths found in the configuration file, which aren't excluded from inheritance, will be resolved relative to the configuration file they originated in.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>false</code></p>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.1" href="/docs/handbook/release-notes/typescript-2-1.html">2.1</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='include-config'><a aria-label="Link to the compiler option: include" id='include' href='#include' name='include' aria-labelledby="include-config">#</a> Include - <code>include</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specifies an array of filenames or patterns to include in the program.
These filenames are resolved relative to the directory containing the `tsconfig.json` file.

```json
{
  "include": ["src/**/*", "tests/**/*"]
}
```

Which would include:

<!-- TODO: #135
```diff
  .
- ├── scripts
- │   ├── lint.ts
- │   ├── update_deps.ts
- │   └── utils.ts
+ ├── src
+ │   ├── client
+ │   │    ├── index.ts
+ │   │    └── utils.ts
+ │   ├── server
+ │   │    └── index.ts
+ ├── tests
+ │   ├── app.test.ts
+ │   ├── utils.ts
+ │   └── tests.d.ts
- ├── package.json
- ├── tsconfig.json
- └── yarn.lock
``` -->

```
.
├── scripts                ⨯
│   ├── lint.ts            ⨯
│   ├── update_deps.ts     ⨯
│   └── utils.ts           ⨯
├── src                    ✓
│   ├── client             ✓
│   │    ├── index.ts      ✓
│   │    └── utils.ts      ✓
│   ├── server             ✓
│   │    └── index.ts      ✓
├── tests                  ✓
│   ├── app.test.ts        ✓
│   ├── utils.ts           ✓
│   └── tests.d.ts         ✓
├── package.json
├── tsconfig.json
└── yarn.lock
```

`include` and `exclude` support wildcard characters to make glob patterns:

- `*` matches zero or more characters (excluding directory separators)
- `?` matches any one character (excluding directory separators)
- `**/` matches any directory nested to any level

If the last path segment in a pattern does not contain a file extension or wildcard character, then it is treated as a directory, and files with supported extensions inside that directory are included (e.g. `.ts`, `.tsx`, and `.d.ts` by default, with `.js` and `.jsx` if [`allowJs`](#allowJs) is set to true).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>[]</code> if <a href="#files"><code>files</code></a> is specified; <code>**/*</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#files' aria-label="Jump to compiler option info for files" ><code>files</code></a></p>
</li><li><p><a href='#exclude' aria-label="Jump to compiler option info for exclude" ><code>exclude</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='exclude-config'><a aria-label="Link to the compiler option: exclude" id='exclude' href='#exclude' name='exclude' aria-labelledby="exclude-config">#</a> Exclude - <code>exclude</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specifies an array of filenames or patterns that should be skipped when resolving [`include`](#include).

**Important**: `exclude` _only_ changes which files are included as a result of the [`include`](#include) setting.
A file specified by `exclude` can still become part of your codebase due to an `import` statement in your code, a `types` inclusion, a `/// <reference` directive, or being specified in the [`files`](#files) list.

It is not a mechanism that **prevents** a file from being included in the codebase - it simply changes what the [`include`](#include) setting finds.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p>node_modules bower_components jspm_packages <a href="#outDir"><code>outDir</code></a></p>
</li>
<li><span>Related:</span><ul><li><p><a href='#include' aria-label="Jump to compiler option info for include" ><code>include</code></a></p>
</li><li><p><a href='#files' aria-label="Jump to compiler option info for files" ><code>files</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='references-config'><a aria-label="Link to the compiler option: references" id='references' href='#references' name='references' aria-labelledby="references-config">#</a> References - <code>references</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Project references are a way to structure your TypeScript programs into smaller pieces.
Using Project References can greatly improve build and editor interaction times, enforce logical separation between components, and organize your code in new and improved ways.

You can read more about how references works in the [Project References](/docs/handbook/project-references.html) section of the handbook

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>false</code></p>
</li></ul>
</div></section>
</div>
</article></div>
<div class="tsconfig raised main-content-block markdown"><article id='compilerOptions'>

### Compiler Options

These options make up the bulk of TypeScript's configuration and it covers how the language should work.

<nav id="sticky"><ul>
<li><a href="#Type_Checking_6248">Type Checking</a></li>
<li><a href="#Modules_6244">Modules</a></li>
<li><a href="#Emit_6246">Emit</a></li>
<li><a href="#JavaScript_Support_6247">JavaScript Support</a></li>
<li><a href="#Editor_Support_6249">Editor Support</a></li>
<li><a href="#Interop_Constraints_6252">Interop Constraints</a></li>
<li><a href="#Backwards_Compatibility_6253">Backwards Compatibility</a></li>
<li><a href="#Language_and_Environment_6254">Language and Environment</a></li>
<li><a href="#Compiler_Diagnostics_6251">Compiler Diagnostics</a></li>
<li><a href="#Projects_6255">Projects</a></li>
<li><a href="#Output_Formatting_6256">Output Formatting</a></li>
<li><a href="#Completeness_6257">Completeness</a></li>
<li><a href="#Command_line_Options_6171">Command Line</a></li>
<li><a href="#Watch_and_Build_Modes_6250">Watch Options</a></li>
</ul></nav>
<div>
<div class='category'>
<h2 id='Type_Checking_6248' ><a href='#Type_Checking_6248' name='Type_Checking_6248' aria-label="Link to the section Type Checking" aria-labelledby='Type_Checking_6248'>#</a>Type Checking</h2>

</div>
<section class='compiler-option'>
<h3 id='allowUnreachableCode-config'><a aria-label="Link to the compiler option: allowUnreachableCode" id='allowUnreachableCode' href='#allowUnreachableCode' name='allowUnreachableCode' aria-labelledby="allowUnreachableCode-config">#</a> Allow Unreachable Code - <code>allowUnreachableCode</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When:

- `undefined` (default) provide suggestions as warnings to editors
- `true` unreachable code is ignored
- `false` raises compiler errors about unreachable code

These warnings are only about code which is provably unreachable due to the use of JavaScript syntax, for example:

```ts
function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  return true;
}
```

With `"allowUnreachableCode": false`:

```ts twoslash
// @errors: 7027
// @allowUnreachableCode: false
function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  return true;
}
```

This does not affect errors on the basis of code which _appears_ to be unreachable due to type analysis.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.8" href="/docs/handbook/release-notes/typescript-1-8.html">1.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='allowUnusedLabels-config'><a aria-label="Link to the compiler option: allowUnusedLabels" id='allowUnusedLabels' href='#allowUnusedLabels' name='allowUnusedLabels' aria-labelledby="allowUnusedLabels-config">#</a> Allow Unused Labels - <code>allowUnusedLabels</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When:

- `undefined` (default) provide suggestions as warnings to editors
- `true` unused labels are ignored
- `false` raises compiler errors about unused labels

Labels are very rare in JavaScript and typically indicate an attempt to write an object literal:

```ts twoslash
// @errors: 7028
// @allowUnusedLabels: false
function verifyAge(age: number) {
  // Forgot 'return' statement
  if (age > 18) {
    verified: true;
  }
}
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.8" href="/docs/handbook/release-notes/typescript-1-8.html">1.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='alwaysStrict-config'><a aria-label="Link to the compiler option: alwaysStrict" id='alwaysStrict' href='#alwaysStrict' name='alwaysStrict' aria-labelledby="alwaysStrict-config">#</a> Always Strict - <code>alwaysStrict</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Ensures that your files are parsed in the ECMAScript strict mode, and emit "use strict" for each source file.

[ECMAScript strict](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Strict_mode) mode was introduced in ES5 and provides behavior tweaks to the runtime of the JavaScript engine to improve performance, and makes a set of errors throw instead of silently ignoring them.

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.1" href="/docs/handbook/release-notes/typescript-2-1.html">2.1</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='exactOptionalPropertyTypes-config'><a aria-label="Link to the compiler option: exactOptionalPropertyTypes" id='exactOptionalPropertyTypes' href='#exactOptionalPropertyTypes' name='exactOptionalPropertyTypes' aria-labelledby="exactOptionalPropertyTypes-config">#</a> Exact Optional Property Types - <code>exactOptionalPropertyTypes</code></h3>
<div class='compiler-content'>
<div class='markdown'>

With exactOptionalPropertyTypes enabled, TypeScript applies stricter rules around how it handles properties on `type` or `interfaces` which have a `?` prefix.

For example, this interface declares that there is a property which can be one of two strings: 'dark' or 'light' or it should not be in the object.

```ts
interface UserDefaults {
  // The absence of a value represents 'system'
  colorThemeOverride?: "dark" | "light";
}
```

Without this flag enabled, there are three values which you can set `colorThemeOverride` to be: "dark", "light" and `undefined`.

Setting the value to `undefined` will allow most JavaScript runtime checks for the existence to fail, which is effectively falsy. However, this isn't quite accurate; `colorThemeOverride: undefined` is not the same as `colorThemeOverride` not being defined. For example, `"colorThemeOverride" in settings` would have different behavior with `undefined` as the key compared to not being defined.

`exactOptionalPropertyTypes` makes TypeScript truly enforce the definition provided as an optional property:

```ts twoslash
// @exactOptionalPropertyTypes
// @errors: 2322 2412
interface UserDefaults {
  colorThemeOverride?: "dark" | "light";
}
declare function getUserSettings(): UserDefaults;
// ---cut---
const settings = getUserSettings();
settings.colorThemeOverride = "dark";
settings.colorThemeOverride = "light";

// But not:
settings.colorThemeOverride = undefined;
```

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.4" href="/docs/handbook/release-notes/typescript-4-4.html">4.4</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noFallthroughCasesInSwitch-config'><a aria-label="Link to the compiler option: noFallthroughCasesInSwitch" id='noFallthroughCasesInSwitch' href='#noFallthroughCasesInSwitch' name='noFallthroughCasesInSwitch' aria-labelledby="noFallthroughCasesInSwitch-config">#</a> No Fallthrough Cases In Switch - <code>noFallthroughCasesInSwitch</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Report errors for fallthrough cases in switch statements.
Ensures that any non-empty case inside a switch statement includes either `break`, `return`, or `throw`.
This means you won't accidentally ship a case fallthrough bug.

```ts twoslash
// @noFallthroughCasesInSwitch
// @errors: 7029
const a: number = 6;

switch (a) {
  case 0:
    console.log("even");
  case 1:
    console.log("odd");
    break;
}
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.8" href="/docs/handbook/release-notes/typescript-1-8.html">1.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noImplicitAny-config'><a aria-label="Link to the compiler option: noImplicitAny" id='noImplicitAny' href='#noImplicitAny' name='noImplicitAny' aria-labelledby="noImplicitAny-config">#</a> No Implicit Any - <code>noImplicitAny</code></h3>
<div class='compiler-content'>
<div class='markdown'>

In some cases where no type annotations are present, TypeScript will fall back to a type of `any` for a variable when it cannot infer the type.

This can cause some errors to be missed, for example:

```ts twoslash
// @noImplicitAny: false
function fn(s) {
  // No error?
  console.log(s.subtr(3));
}
fn(42);
```

Turning on `noImplicitAny` however TypeScript will issue an error whenever it would have inferred `any`:

```ts twoslash
// @errors: 7006
function fn(s) {
  console.log(s.subtr(3));
}
```

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noImplicitOverride-config'><a aria-label="Link to the compiler option: noImplicitOverride" id='noImplicitOverride' href='#noImplicitOverride' name='noImplicitOverride' aria-labelledby="noImplicitOverride-config">#</a> No Implicit Override - <code>noImplicitOverride</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When working with classes which use inheritance, it's possible for a sub-class to get "out of sync" with the functions it overloads when they are renamed in the base class.

For example, imagine you are modeling a music album syncing system:

```ts twoslash
class Album {
  download() {
    // Default behavior
  }
}

class SharedAlbum extends Album {
  download() {
    // Override to get info from many sources
  }
}
```

Then when you add support for machine-learning generated playlists, you refactor the `Album` class to have a 'setup' function instead:

```ts twoslash
class Album {
  setup() {
    // Default behavior
  }
}

class MLAlbum extends Album {
  setup() {
    // Override to get info from algorithm
  }
}

class SharedAlbum extends Album {
  download() {
    // Override to get info from many sources
  }
}
```

In this case, TypeScript has provided no warning that `download` on `SharedAlbum` _expected_ to override a function in the base class.

Using `noImplicitOverride` you can ensure that the sub-classes never go out of sync, by ensuring that functions which override include the keyword `override`.

The following example has `noImplicitOverride` enabled, and you can see the error received when `override` is missing:

```ts twoslash
// @noImplicitOverride
// @errors: 4114
class Album {
  setup() {}
}

class MLAlbum extends Album {
  override setup() {}
}

class SharedAlbum extends Album {
  setup() {}
}
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.3" href="/docs/handbook/release-notes/typescript-4-3.html">4.3</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noImplicitReturns-config'><a aria-label="Link to the compiler option: noImplicitReturns" id='noImplicitReturns' href='#noImplicitReturns' name='noImplicitReturns' aria-labelledby="noImplicitReturns-config">#</a> No Implicit Returns - <code>noImplicitReturns</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When enabled, TypeScript will check all code paths in a function to ensure they return a value.

```ts twoslash
// @errors: 2366 2322
function lookupHeadphonesManufacturer(color: "blue" | "black"): string {
  if (color === "blue") {
    return "beats";
  } else {
    ("bose");
  }
}
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.8" href="/docs/handbook/release-notes/typescript-1-8.html">1.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noImplicitThis-config'><a aria-label="Link to the compiler option: noImplicitThis" id='noImplicitThis' href='#noImplicitThis' name='noImplicitThis' aria-labelledby="noImplicitThis-config">#</a> No Implicit This - <code>noImplicitThis</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Raise error on 'this' expressions with an implied 'any' type.

For example, the class below returns a function which tries to access `this.width` and `this.height` – but the context
for `this` inside the function inside `getAreaFunction` is not the instance of the Rectangle.

```ts twoslash
// @errors: 2683
class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getAreaFunction() {
    return function () {
      return this.width * this.height;
    };
  }
}
```

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noPropertyAccessFromIndexSignature-config'><a aria-label="Link to the compiler option: noPropertyAccessFromIndexSignature" id='noPropertyAccessFromIndexSignature' href='#noPropertyAccessFromIndexSignature' name='noPropertyAccessFromIndexSignature' aria-labelledby="noPropertyAccessFromIndexSignature-config">#</a> No Property Access From Index Signature - <code>noPropertyAccessFromIndexSignature</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This setting ensures consistency between accessing a field via the "dot" (`obj.key`) syntax, and "indexed" (`obj["key"]`) and the way which the property is declared in the type.

Without this flag, TypeScript will allow you to use the dot syntax to access fields which are not defined:

```ts twoslash
// @errors: 4111
declare function getSettings(): GameSettings;
// ---cut---
interface GameSettings {
  // Known up-front properties
  speed: "fast" | "medium" | "slow";
  quality: "high" | "low";

  // Assume anything unknown to the interface
  // is a string.
  [key: string]: string;
}

const settings = getSettings();
settings.speed;
//       ^?
settings.quality;
//       ^?

// Unknown key accessors are allowed on
// this object, and are `string`
settings.username;
//       ^?
```

Turning the flag on will raise an error because the unknown field uses dot syntax instead of indexed syntax.

```ts twoslash
// @errors: 4111
// @noPropertyAccessFromIndexSignature
declare function getSettings(): GameSettings;
interface GameSettings {
  speed: "fast" | "medium" | "slow";
  quality: "high" | "low";
  [key: string]: string;
}
// ---cut---
const settings = getSettings();
settings.speed;
settings.quality;

// This would need to be settings["username"];
settings.username;
//       ^?
```

The goal of this flag is to signal intent in your calling syntax about how certain you are this property exists.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.2" href="/docs/handbook/release-notes/typescript-4-2.html">4.2</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noUncheckedIndexedAccess-config'><a aria-label="Link to the compiler option: noUncheckedIndexedAccess" id='noUncheckedIndexedAccess' href='#noUncheckedIndexedAccess' name='noUncheckedIndexedAccess' aria-labelledby="noUncheckedIndexedAccess-config">#</a> No Unchecked Indexed Access - <code>noUncheckedIndexedAccess</code></h3>
<div class='compiler-content'>
<div class='markdown'>

TypeScript has a way to describe objects which have unknown keys but known values on an object, via index signatures.

```ts twoslash
interface EnvironmentVars {
  NAME: string;
  OS: string;

  // Unknown properties are covered by this index signature.
  [propName: string]: string;
}

declare const env: EnvironmentVars;

// Declared as existing
const sysName = env.NAME;
const os = env.OS;
//    ^?

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env.NODE_ENV;
//    ^?
```

Turning on `noUncheckedIndexedAccess` will add `undefined` to any un-declared field in the type.

```ts twoslash
interface EnvironmentVars {
  NAME: string;
  OS: string;

  // Unknown properties are covered by this index signature.
  [propName: string]: string;
}
// @noUncheckedIndexedAccess
// ---cut---
declare const env: EnvironmentVars;

// Declared as existing
const sysName = env.NAME;
const os = env.OS;
//    ^?

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env.NODE_ENV;
//    ^?
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.1" href="/docs/handbook/release-notes/typescript-4-1.html">4.1</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noUnusedLocals-config'><a aria-label="Link to the compiler option: noUnusedLocals" id='noUnusedLocals' href='#noUnusedLocals' name='noUnusedLocals' aria-labelledby="noUnusedLocals-config">#</a> No Unused Locals - <code>noUnusedLocals</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Report errors on unused local variables.

```ts twoslash
// @noUnusedLocals
// @errors: 6133
const createKeyboard = (modelID: number) => {
  const defaultModelID = 23;
  return { type: "keyboard", modelID };
};
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noUnusedParameters-config'><a aria-label="Link to the compiler option: noUnusedParameters" id='noUnusedParameters' href='#noUnusedParameters' name='noUnusedParameters' aria-labelledby="noUnusedParameters-config">#</a> No Unused Parameters - <code>noUnusedParameters</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Report errors on unused parameters in functions.

```ts twoslash
// @noUnusedParameters
// @errors: 6133
const createDefaultKeyboard = (modelID: number) => {
  const defaultModelID = 23;
  return { type: "keyboard", modelID: defaultModelID };
};
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='strict-config'><a aria-label="Link to the compiler option: strict" id='strict' href='#strict' name='strict' aria-labelledby="strict-config">#</a> Strict - <code>strict</code></h3>
<div class='compiler-content'>
<div class='markdown'>

The `strict` flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness.
Turning this on is equivalent to enabling all of the _strict mode family_ options, which are outlined below.
You can then turn off individual strict mode family checks as needed.

Future versions of TypeScript may introduce additional stricter checking under this flag, so upgrades of TypeScript might result in new type errors in your program.
When appropriate and possible, a corresponding flag will be added to disable that behavior.

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Related:</span><ul><li><p><a href='#alwaysStrict' aria-label="Jump to compiler option info for alwaysStrict" ><code>alwaysStrict</code></a></p>
</li><li><p><a href='#strictNullChecks' aria-label="Jump to compiler option info for strictNullChecks" ><code>strictNullChecks</code></a></p>
</li><li><p><a href='#strictBindCallApply' aria-label="Jump to compiler option info for strictBindCallApply" ><code>strictBindCallApply</code></a></p>
</li><li><p><a href='#strictFunctionTypes' aria-label="Jump to compiler option info for strictFunctionTypes" ><code>strictFunctionTypes</code></a></p>
</li><li><p><a href='#strictPropertyInitialization' aria-label="Jump to compiler option info for strictPropertyInitialization" ><code>strictPropertyInitialization</code></a></p>
</li><li><p><a href='#noImplicitAny' aria-label="Jump to compiler option info for noImplicitAny" ><code>noImplicitAny</code></a></p>
</li><li><p><a href='#noImplicitThis' aria-label="Jump to compiler option info for noImplicitThis" ><code>noImplicitThis</code></a></p>
</li><li><p><a href='#useUnknownInCatchVariables' aria-label="Jump to compiler option info for useUnknownInCatchVariables" ><code>useUnknownInCatchVariables</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.3" href="/docs/handbook/release-notes/typescript-2-3.html">2.3</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='strictBindCallApply-config'><a aria-label="Link to the compiler option: strictBindCallApply" id='strictBindCallApply' href='#strictBindCallApply' name='strictBindCallApply' aria-labelledby="strictBindCallApply-config">#</a> Strict Bind Call Apply - <code>strictBindCallApply</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When set, TypeScript will check that the built-in methods of functions `call`, `bind`, and `apply` are invoked with correct argument for the underlying function:

```ts twoslash
// @strictBindCallApply: true
// @errors: 2345

// With strictBindCallApply on
function fn(x: string) {
  return parseInt(x);
}

const n1 = fn.call(undefined, "10");

const n2 = fn.call(undefined, false);
```

Otherwise, these functions accept any arguments and will return `any`:

```ts twoslash
// @strictBindCallApply: false

// With strictBindCallApply off
function fn(x: string) {
  return parseInt(x);
}

// Note: No error; return type is 'any'
const n = fn.call(undefined, false);
```

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.2" href="/docs/handbook/release-notes/typescript-3-2.html">3.2</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='strictFunctionTypes-config'><a aria-label="Link to the compiler option: strictFunctionTypes" id='strictFunctionTypes' href='#strictFunctionTypes' name='strictFunctionTypes' aria-labelledby="strictFunctionTypes-config">#</a> Strict Function Types - <code>strictFunctionTypes</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When enabled, this flag causes functions parameters to be checked more correctly.

Here's a basic example with `strictFunctionTypes` off:

```ts twoslash
// @strictFunctionTypes: false
function fn(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Unsafe assignment
let func: StringOrNumberFunc = fn;
// Unsafe call - will crash
func(10);
```

With `strictFunctionTypes` _on_, the error is correctly detected:

```ts twoslash
// @errors: 2322
function fn(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Unsafe assignment is prevented
let func: StringOrNumberFunc = fn;
```

During development of this feature, we discovered a large number of inherently unsafe class hierarchies, including some in the DOM.
Because of this, the setting only applies to functions written in _function_ syntax, not to those in _method_ syntax:

```ts twoslash
type Methodish = {
  func(x: string | number): void;
};

function fn(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

// Ultimately an unsafe assignment, but not detected
const m: Methodish = {
  func: fn,
};
m.func(10);
```

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.6" href="/docs/handbook/release-notes/typescript-2-6.html">2.6</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='strictNullChecks-config'><a aria-label="Link to the compiler option: strictNullChecks" id='strictNullChecks' href='#strictNullChecks' name='strictNullChecks' aria-labelledby="strictNullChecks-config">#</a> Strict Null Checks - <code>strictNullChecks</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When `strictNullChecks` is `false`, `null` and `undefined` are effectively ignored by the language.
This can lead to unexpected errors at runtime.

When `strictNullChecks` is `true`, `null` and `undefined` have their own distinct types and you'll get a type error if you try to use them where a concrete value is expected.

For example with this TypeScript code, `users.find` has no guarantee that it will actually find a user, but you can
write code as though it will:

```ts twoslash
// @strictNullChecks: false
// @target: ES2015
declare const loggedInUsername: string;

const users = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser.age);
```

Setting `strictNullChecks` to `true` will raise an error that you have not made a guarantee that the `loggedInUser` exists before trying to use it.

```ts twoslash
// @errors: 2339 2532 18048
// @target: ES2020
// @strictNullChecks
declare const loggedInUsername: string;

const users = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser.age);
```

The second example failed because the array's `find` function looks a bit like this simplification:

```ts
// When strictNullChecks: true
type Array = {
  find(predicate: (value: any, index: number) => boolean): S | undefined;
};

// When strictNullChecks: false the undefined is removed from the type system,
// allowing you to write code which assumes it always found a result
type Array = {
  find(predicate: (value: any, index: number) => boolean): S;
};
```

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='strictPropertyInitialization-config'><a aria-label="Link to the compiler option: strictPropertyInitialization" id='strictPropertyInitialization' href='#strictPropertyInitialization' name='strictPropertyInitialization' aria-labelledby="strictPropertyInitialization-config">#</a> Strict Property Initialization - <code>strictPropertyInitialization</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.

```ts twoslash
// @errors: 2564
class UserAccount {
  name: string;
  accountType = "user";

  email: string;
  address: string | undefined;

  constructor(name: string) {
    this.name = name;
    // Note that this.email is not set
  }
}
```

In the above case:

- `this.name` is set specifically.
- `this.accountType` is set by default.
- `this.email` is not set and raises an error.
- `this.address` is declared as potentially `undefined` which means it does not have to be set.

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.7" href="/docs/handbook/release-notes/typescript-2-7.html">2.7</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='useUnknownInCatchVariables-config'><a aria-label="Link to the compiler option: useUnknownInCatchVariables" id='useUnknownInCatchVariables' href='#useUnknownInCatchVariables' name='useUnknownInCatchVariables' aria-labelledby="useUnknownInCatchVariables-config">#</a> Use Unknown In Catch Variables - <code>useUnknownInCatchVariables</code></h3>
<div class='compiler-content'>
<div class='markdown'>

In TypeScript 4.0, support was added to allow changing the type of the variable in a catch clause from `any` to `unknown`. Allowing for code like:

```ts twoslash
// @useUnknownInCatchVariables
try {
  // ...
} catch (err: unknown) {
  // We have to verify err is an
  // error before using it as one.
  if (err instanceof Error) {
    console.log(err.message);
  }
}
```

This pattern ensures that error handling code becomes more comprehensive because you cannot guarantee that the object being thrown _is_ a Error subclass ahead of time. With the flag `useUnknownInCatchVariables` enabled, then you do not need the additional syntax (`: unknown`) nor a linter rule to try enforce this behavior.

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#strict"><code>strict</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#strict' aria-label="Jump to compiler option info for strict" ><code>strict</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.4" href="/docs/handbook/release-notes/typescript-4-4.html">4.4</a></p>
</li></ul>
</div></section>
<div class='category'>
<h2 id='Modules_6244' ><a href='#Modules_6244' name='Modules_6244' aria-label="Link to the section Modules" aria-labelledby='Modules_6244'>#</a>Modules</h2>

</div>
<section class='compiler-option'>
<h3 id='allowArbitraryExtensions-config'><a aria-label="Link to the compiler option: allowArbitraryExtensions" id='allowArbitraryExtensions' href='#allowArbitraryExtensions' name='allowArbitraryExtensions' aria-labelledby="allowArbitraryExtensions-config">#</a> Allow Arbitrary Extensions - <code>allowArbitraryExtensions</code></h3>
<div class='compiler-content'>
<div class='markdown'>

In TypeScript 5.0, when an import path ends in an extension that isn't a known JavaScript or TypeScript file extension, the compiler will look for a declaration file for that path in the form of `{file basename}.d.{extension}.ts`.
For example, if you are using a CSS loader in a bundler project, you might want to write (or generate) declaration files for those stylesheets:

```css
/* app.css */
.cookie-banner {
  display: none;
}
```

```ts
// app.d.css.ts
declare const css: {
  cookieBanner: string;
};
export default css;
```

```ts
// App.tsx
import styles from "./app.css";

styles.cookieBanner; // string
```

By default, this import will raise an error to let you know that TypeScript doesn't understand this file type and your runtime might not support importing it.
But if you've configured your runtime or bundler to handle it, you can suppress the error with the new `--allowArbitraryExtensions` compiler option.

Note that historically, a similar effect has often been achievable by adding a declaration file named `app.css.d.ts` instead of `app.d.css.ts` - however, this just worked through Node's `require` resolution rules for CommonJS.
Strictly speaking, the former is interpreted as a declaration file for a JavaScript file named `app.css.js`.
Because relative files imports need to include extensions in Node's ESM support, TypeScript would error on our example in an ESM file under `--moduleResolution node16` or `nodenext`.

For more information, read up [the proposal for this feature](https://github.com/microsoft/TypeScript/issues/50133) and [its corresponding pull request](https://github.com/microsoft/TypeScript/pull/51435).

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='allowImportingTsExtensions-config'><a aria-label="Link to the compiler option: allowImportingTsExtensions" id='allowImportingTsExtensions' href='#allowImportingTsExtensions' name='allowImportingTsExtensions' aria-labelledby="allowImportingTsExtensions-config">#</a> Allow Importing TS Extensions - <code>allowImportingTsExtensions</code></h3>
<div class='compiler-content'>
<div class='markdown'>

`--allowImportingTsExtensions` allows TypeScript files to import each other with a TypeScript-specific extension like `.ts`, `.mts`, or `.tsx`.

This flag is only allowed when `--noEmit` or `--emitDeclarationOnly` is enabled, since these import paths would not be resolvable at runtime in JavaScript output files.
The expectation here is that your resolver (e.g. your bundler, a runtime, or some other tool) is going to make these imports between `.ts` files work.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='allowUmdGlobalAccess-config'><a aria-label="Link to the compiler option: allowUmdGlobalAccess" id='allowUmdGlobalAccess' href='#allowUmdGlobalAccess' name='allowUmdGlobalAccess' aria-labelledby="allowUmdGlobalAccess-config">#</a> Allow Umd Global Access - <code>allowUmdGlobalAccess</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When set to true, `allowUmdGlobalAccess` lets you access UMD exports as globals from inside module files. A module file is a file that has imports and/or exports. Without this flag, using an export from a UMD module requires an import declaration.

An example use case for this flag would be a web project where you know the particular library (like jQuery or Lodash) will always be available at runtime, but you can’t access it with an import.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.5" href="/docs/handbook/release-notes/typescript-3-5.html">3.5</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='baseUrl-config'><a aria-label="Link to the compiler option: baseUrl" id='baseUrl' href='#baseUrl' name='baseUrl' aria-labelledby="baseUrl-config">#</a> Base URL - <code>baseUrl</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Sets a base directory from which to resolve bare specifier module names. For example, in the directory structure:

```
project
├── ex.ts
├── hello
│   └── world.ts
└── tsconfig.json
```

With `"baseUrl": "./"`, TypeScript will look for files starting at the same folder as the `tsconfig.json`:

```ts
import { helloWorld } from "hello/world";

console.log(helloWorld);
```

This resolution has higher priority than lookups from `node_modules`.

This feature was designed for use in conjunction with AMD module loaders in the browser, and is not recommended in any other context. As of TypeScript 4.1, `baseUrl` is no longer required to be set when using [`paths`](#paths).

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='customConditions-config'><a aria-label="Link to the compiler option: customConditions" id='customConditions' href='#customConditions' name='customConditions' aria-labelledby="customConditions-config">#</a> Custom Conditions - <code>customConditions</code></h3>
<div class='compiler-content'>
<div class='markdown'>

`--customConditions` takes a list of additional [conditions](https://nodejs.org/api/packages.html#nested-conditions) that should succeed when TypeScript resolves from an [`exports`](https://nodejs.org/api/packages.html#exports) or [`imports`](https://nodejs.org/api/packages.html#imports) field of a `package.json`.
These conditions are added to whatever existing conditions a resolver will use by default.

For example, when this field is set in a `tsconfig.json` as so:

```jsonc
{
  "compilerOptions": {
    "target": "es2022",
    "moduleResolution": "bundler",
    "customConditions": ["my-condition"]
  }
}
```

Any time an `exports` or `imports` field is referenced in `package.json`, TypeScript will consider conditions called `my-condition`.

So when importing from a package with the following `package.json`

```jsonc
{
  // ...
  "exports": {
    ".": {
      "my-condition": "./foo.mjs",
      "node": "./bar.mjs",
      "import": "./baz.mjs",
      "require": "./biz.mjs"
    }
  }
}
```

TypeScript will try to look for files corresponding to `foo.mjs`.

This field is only valid under the `node16`, `nodenext`, and `bundler` options for [`--moduleResolution`](#moduleResolution).

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#moduleResolution' aria-label="Jump to compiler option info for moduleResolution" ><code>moduleResolution</code></a></p>
</li><li><p><a href='#resolvePackageJsonExports' aria-label="Jump to compiler option info for resolvePackageJsonExports" ><code>resolvePackageJsonExports</code></a></p>
</li><li><p><a href='#resolvePackageJsonImports' aria-label="Jump to compiler option info for resolvePackageJsonImports" ><code>resolvePackageJsonImports</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='module-config'><a aria-label="Link to the compiler option: module" id='module' href='#module' name='module' aria-labelledby="module-config">#</a> Module - <code>module</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Sets the module system for the program. See the [theory behind TypeScript’s `module` option](/docs/handbook/modules/theory.html#the-module-output-format) and [its reference page](/docs/handbook/modules/reference.html#the-module-compiler-option) for more information. You very likely want `"nodenext"` for modern Node.js projects.

Changing `module` affects [`moduleResolution`](#moduleResolution) which [also has a reference page](/docs/handbook/modules/reference.html#the-moduleresolution-compiler-option).

Here's some example output for this file:

```ts twoslash
// @filename: constants.ts
export const valueOfPi = 3.142;
// ---cut---
// @filename: index.ts
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

#### `CommonJS`

```ts twoslash
// @showEmit
// @module: commonjs
// @noErrors
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

#### `UMD`

```ts twoslash
// @showEmit
// @module: umd
// @noErrors
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

#### `AMD`

```ts twoslash
// @showEmit
// @module: amd
// @noErrors
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

#### `System`

```ts twoslash
// @showEmit
// @module: system
// @noErrors
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

#### `ESNext`

```ts twoslash
// @showEmit
// @module: esnext
// @noErrors
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

#### `ES2015`/`ES6`/`ES2020`/`ES2022`

```ts twoslash
// @showEmit
// @module: es2015
// @noErrors
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

In addition to the base functionality of `ES2015`/`ES6`, `ES2020` adds support for [dynamic `import`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import), and [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) while `ES2022` further adds support for [top level `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await).

#### `node16`/`nodenext`

Available from 4.7+, the `node16` and `nodenext` modes integrate with Node's [native ECMAScript Module support](https://nodejs.org/api/esm.html). The emitted JavaScript uses either `CommonJS` or `ES2020` output depending on the file extension and the value of the `type` setting in the nearest `package.json`. Module resolution also works differently. You can learn more in the [handbook](/docs/handbook/esm-node.html) and [Modules Reference](/docs/handbook/modules/reference.html#node16-nodenext).

#### `None`

```ts twoslash
// @showEmit
// @module: none
// @noErrors
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi * 2;
```

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>CommonJS</code> if <a href="#target"><code>target</code></a> is <code>ES3</code> or <code>ES5</code>; <code>ES6</code>/<code>ES2015</code> otherwise.</p>
</li>
<li><span>Allowed:</span><ul><li><p><code>none</code></p>
</li><li><p><code>commonjs</code></p>
</li><li><p><code>amd</code></p>
</li><li><p><code>umd</code></p>
</li><li><p><code>system</code></p>
</li><li><p><code>es6</code>/<code>es2015</code></p>
</li><li><p><code>es2020</code></p>
</li><li><p><code>es2022</code></p>
</li><li><p><code>esnext</code></p>
</li><li><p><code>node16</code></p>
</li><li><p><code>nodenext</code></p>
</li></ul></li>
<li><span>Related:</span><ul><li><p><a href='#moduleResolution' aria-label="Jump to compiler option info for moduleResolution" ><code>moduleResolution</code></a></p>
</li><li><p><a href='#esModuleInterop' aria-label="Jump to compiler option info for esModuleInterop" ><code>esModuleInterop</code></a></p>
</li><li><p><a href='#allowImportingTsExtensions' aria-label="Jump to compiler option info for allowImportingTsExtensions" ><code>allowImportingTsExtensions</code></a></p>
</li><li><p><a href='#allowArbitraryExtensions' aria-label="Jump to compiler option info for allowArbitraryExtensions" ><code>allowArbitraryExtensions</code></a></p>
</li><li><p><a href='#resolveJsonModule' aria-label="Jump to compiler option info for resolveJsonModule" ><code>resolveJsonModule</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.0" href="/docs/handbook/release-notes/typescript-1-0.html">1.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='moduleResolution-config'><a aria-label="Link to the compiler option: moduleResolution" id='moduleResolution' href='#moduleResolution' name='moduleResolution' aria-labelledby="moduleResolution-config">#</a> Module Resolution - <code>moduleResolution</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specify the module resolution strategy:

- `'node16'` or `'nodenext'` for modern versions of Node.js. Node.js v12 and later supports both ECMAScript imports and CommonJS `require`, which resolve using different algorithms. These `moduleResolution` values, when combined with the corresponding [`module`](#module) values, picks the right algorithm for each resolution based on whether Node.js will see an `import` or `require` in the output JavaScript code.
- `'node10'` (previously called `'node'`) for Node.js versions older than v10, which only support CommonJS `require`. You probably won't need to use `node10` in modern code.
- `'bundler'` for use with bundlers. Like `node16` and `nodenext`, this mode supports package.json `"imports"` and `"exports"`, but unlike the Node.js resolution modes, `bundler` never requires file extensions on relative paths in imports.

  `bundler` does not support resolution of `require` calls. In TypeScript files, this means the `import mod = require("foo")` syntax is forbidden; in JavaScript files, `require` calls are not errors but only ever return the type `any` (or whatever an ambient declaration of a global require function is declared to `return`).

- `'classic'` was used in TypeScript before the release of 1.6. `classic` should not be used.

There are reference pages explaining the [theory behind TypeScript’s module resolution](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution) and the [details of each option](/docs/handbook/modules/reference.html#the-moduleresolution-compiler-option).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>Classic</code> if <a href="#module"><code>module</code></a> is <code>AMD</code>, <code>UMD</code>, <code>System</code>, or <code>ES6</code>/<code>ES2015</code>; Matches if <a href="#module"><code>module</code></a> is <code>node16</code> or <code>nodenext</code>; <code>Node</code> otherwise.</p>
</li>
<li><span>Allowed:</span><ul><li><p><code>classic</code></p>
</li><li><p><code>node10</code>/<code>node</code></p>
</li><li><p><code>node16</code></p>
</li><li><p><code>nodenext</code></p>
</li><li><p><code>bundler</code></p>
</li></ul></li>
<li><span>Related:</span><ul><li><p><a href='#module' aria-label="Jump to compiler option info for module" ><code>module</code></a></p>
</li><li><p><a href='#paths' aria-label="Jump to compiler option info for paths" ><code>paths</code></a></p>
</li><li><p><a href='#baseUrl' aria-label="Jump to compiler option info for baseUrl" ><code>baseUrl</code></a></p>
</li><li><p><a href='#rootDirs' aria-label="Jump to compiler option info for rootDirs" ><code>rootDirs</code></a></p>
</li><li><p><a href='#moduleSuffixes' aria-label="Jump to compiler option info for moduleSuffixes" ><code>moduleSuffixes</code></a></p>
</li><li><p><a href='#customConditions' aria-label="Jump to compiler option info for customConditions" ><code>customConditions</code></a></p>
</li><li><p><a href='#resolvePackageJsonExports' aria-label="Jump to compiler option info for resolvePackageJsonExports" ><code>resolvePackageJsonExports</code></a></p>
</li><li><p><a href='#resolvePackageJsonImports' aria-label="Jump to compiler option info for resolvePackageJsonImports" ><code>resolvePackageJsonImports</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='moduleSuffixes-config'><a aria-label="Link to the compiler option: moduleSuffixes" id='moduleSuffixes' href='#moduleSuffixes' name='moduleSuffixes' aria-labelledby="moduleSuffixes-config">#</a> Module Suffixes - <code>moduleSuffixes</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Provides a way to override the default list of file name suffixes to search when resolving a module.

```json tsconfig
{
  "compilerOptions": {
    "moduleSuffixes": [".ios", ".native", ""]
  }
}
```

Given the above configuration, an import like the following:

```ts
import * as foo from "./foo";
```

TypeScript will look for the relative files `./foo.ios.ts`, `./foo.native.ts`, and finally `./foo.ts`.

Note the empty string `""` in [`moduleSuffixes`](#moduleSuffixes) which is necessary for TypeScript to also look-up `./foo.ts`.

This feature can be useful for React Native projects where each target platform can use a separate tsconfig.json with differing `moduleSuffixes`.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.7" href="/docs/handbook/release-notes/typescript-4-7.html">4.7</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noResolve-config'><a aria-label="Link to the compiler option: noResolve" id='noResolve' href='#noResolve' name='noResolve' aria-labelledby="noResolve-config">#</a> No Resolve - <code>noResolve</code></h3>
<div class='compiler-content'>
<div class='markdown'>

By default, TypeScript will examine the initial set of files for `import` and `<reference` directives and add these resolved files to your program.

If `noResolve` is set, this process doesn't happen.
However, `import` statements are still checked to see if they resolve to a valid module, so you'll need to make sure this is satisfied by some other means.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='paths-config'><a aria-label="Link to the compiler option: paths" id='paths' href='#paths' name='paths' aria-labelledby="paths-config">#</a> Paths - <code>paths</code></h3>
<div class='compiler-content'>
<div class='markdown'>

A series of entries which re-map imports to lookup locations relative to the [`baseUrl`](#baseUrl) if set, or to the tsconfig file itself otherwise. There is a larger coverage of `paths` in [the `moduleResolution` reference page](/docs/handbook/modules/reference.html#paths).

`paths` lets you declare how TypeScript should resolve an import in your `require`/`import`s.

```json tsconfig
{
  "compilerOptions": {
    "paths": {
      "jquery": ["./vendor/jquery/dist/jquery"]
    }
  }
}
```

This would allow you to be able to write `import "jquery"`, and get all of the correct typing locally.

```json tsconfig
{
  "compilerOptions": {
    "paths": {
        "app/*": ["./src/app/*"],
        "config/*": ["./src/app/_config/*"],
        "environment/*": ["./src/environments/*"],
        "shared/*": ["./src/app/_shared/*"],
        "helpers/*": ["./src/helpers/*"],
        "tests/*": ["./src/tests/*"]
    },
}
```

In this case, you can tell the TypeScript file resolver to support a number of custom prefixes to find code.

Note that this feature does not change how import paths are emitted by `tsc`, so `paths` should only be used to inform TypeScript that another tool has this mapping and will use it at runtime or when bundling.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='resolveJsonModule-config'><a aria-label="Link to the compiler option: resolveJsonModule" id='resolveJsonModule' href='#resolveJsonModule' name='resolveJsonModule' aria-labelledby="resolveJsonModule-config">#</a> Resolve JSON Module - <code>resolveJsonModule</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Allows importing modules with a `.json` extension, which is a common practice in node projects. This includes
generating a type for the `import` based on the static JSON shape.

TypeScript does not support resolving JSON files by default:

```ts twoslash
// @errors: 2732
// @filename: settings.json
{
    "repo": "TypeScript",
    "dry": false,
    "debug": false
}
// @filename: index.ts
import settings from "./settings.json";

settings.debug === true;
settings.dry === 2;
```

Enabling the option allows importing JSON, and validating the types in that JSON file.

```ts twoslash
// @errors: 2367
// @resolveJsonModule
// @module: commonjs
// @moduleResolution: node
// @filename: settings.json
{
    "repo": "TypeScript",
    "dry": false,
    "debug": false
}
// @filename: index.ts
import settings from "./settings.json";

settings.debug === true;
settings.dry === 2;
```

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='resolvePackageJsonExports-config'><a aria-label="Link to the compiler option: resolvePackageJsonExports" id='resolvePackageJsonExports' href='#resolvePackageJsonExports' name='resolvePackageJsonExports' aria-labelledby="resolvePackageJsonExports-config">#</a> Resolve package.json Exports - <code>resolvePackageJsonExports</code></h3>
<div class='compiler-content'>
<div class='markdown'>

`--resolvePackageJsonExports` forces TypeScript to consult [the `exports` field of `package.json` files](https://nodejs.org/api/packages.html#exports) if it ever reads from a package in `node_modules`.

This option defaults to `true` under the `node16`, `nodenext`, and `bundler` options for [`--moduleResolution`](#moduleResolution).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code> when <a href="#moduleResolution"><code>moduleResolution</code></a> is <code>node16</code>, <code>nodenext</code>, or <code>bundler</code>; otherwise <code>false</code></p>
</li>
<li><span>Related:</span><ul><li><p><a href='#moduleResolution' aria-label="Jump to compiler option info for moduleResolution" ><code>moduleResolution</code></a></p>
</li><li><p><a href='#customConditions' aria-label="Jump to compiler option info for customConditions" ><code>customConditions</code></a></p>
</li><li><p><a href='#resolvePackageJsonImports' aria-label="Jump to compiler option info for resolvePackageJsonImports" ><code>resolvePackageJsonImports</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='resolvePackageJsonImports-config'><a aria-label="Link to the compiler option: resolvePackageJsonImports" id='resolvePackageJsonImports' href='#resolvePackageJsonImports' name='resolvePackageJsonImports' aria-labelledby="resolvePackageJsonImports-config">#</a> Resolve package.json Imports - <code>resolvePackageJsonImports</code></h3>
<div class='compiler-content'>
<div class='markdown'>

`--resolvePackageJsonImports` forces TypeScript to consult [the `imports` field of `package.json` files](https://nodejs.org/api/packages.html#imports) when performing a lookup that starts with `#` from a file whose ancestor directory contains a `package.json`.

This option defaults to `true` under the `node16`, `nodenext`, and `bundler` options for [`--moduleResolution`](#moduleResolution).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code> when <a href="#moduleResolution"><code>moduleResolution</code></a> is <code>node16</code>, <code>nodenext</code>, or <code>bundler</code>; otherwise <code>false</code></p>
</li>
<li><span>Related:</span><ul><li><p><a href='#moduleResolution' aria-label="Jump to compiler option info for moduleResolution" ><code>moduleResolution</code></a></p>
</li><li><p><a href='#customConditions' aria-label="Jump to compiler option info for customConditions" ><code>customConditions</code></a></p>
</li><li><p><a href='#resolvePackageJsonExports' aria-label="Jump to compiler option info for resolvePackageJsonExports" ><code>resolvePackageJsonExports</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='rootDir-config'><a aria-label="Link to the compiler option: rootDir" id='rootDir' href='#rootDir' name='rootDir' aria-labelledby="rootDir-config">#</a> Root Dir - <code>rootDir</code></h3>
<div class='compiler-content'>
<div class='markdown'>

**Default**: The longest common path of all non-declaration input files. If [`composite`](#composite) is set, the default is instead the directory containing the `tsconfig.json` file.

When TypeScript compiles files, it keeps the same directory structure in the output directory as exists in the input directory.

For example, let's say you have some input files:

```
MyProj
├── tsconfig.json
├── core
│   ├── a.ts
│   ├── b.ts
│   ├── sub
│   │   ├── c.ts
├── types.d.ts
```

The inferred value for `rootDir` is the longest common path of all non-declaration input files, which in this case is `core/`.

If your [`outDir`](#outDir) was `dist`, TypeScript would write this tree:

```
MyProj
├── dist
│   ├── a.js
│   ├── b.js
│   ├── sub
│   │   ├── c.js
```

However, you may have intended for `core` to be part of the output directory structure.
By setting `rootDir: "."` in `tsconfig.json`, TypeScript would write this tree:

```
MyProj
├── dist
│   ├── core
│   │   ├── a.js
│   │   ├── b.js
│   │   ├── sub
│   │   │   ├── c.js
```

Importantly, `rootDir` **does not affect which files become part of the compilation**.
It has no interaction with the [`include`](#include), [`exclude`](#exclude), or [`files`](#files) `tsconfig.json` settings.

Note that TypeScript will never write an output file to a directory outside of [`outDir`](#outDir), and will never skip emitting a file.
For this reason, `rootDir` also enforces that all files which need to be emitted are underneath the `rootDir` path.

For example, let's say you had this tree:

```
MyProj
├── tsconfig.json
├── core
│   ├── a.ts
│   ├── b.ts
├── helpers.ts
```

It would be an error to specify `rootDir` as `core` _and_ [`include`](#include) as `*` because it creates a file (`helpers.ts`) that would need to be emitted _outside_ the [`outDir`](#outDir) (i.e. `../helpers.js`).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p>Computed from the list of input files.</p>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.5" href="/docs/handbook/release-notes/typescript-1-5.html">1.5</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='rootDirs-config'><a aria-label="Link to the compiler option: rootDirs" id='rootDirs' href='#rootDirs' name='rootDirs' aria-labelledby="rootDirs-config">#</a> Root Dirs - <code>rootDirs</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Using `rootDirs`, you can inform the compiler that there are many "virtual" directories acting as a single root.
This allows the compiler to resolve relative module imports within these "virtual" directories, as if they were merged in to one directory.

For example:

```
 src
 └── views
     └── view1.ts (can import "./template1", "./view2`)
     └── view2.ts (can import "./template1", "./view1`)

 generated
 └── templates
         └── views
             └── template1.ts (can import "./view1", "./view2")
```

```json tsconfig
{
  "compilerOptions": {
    "rootDirs": ["src/views", "generated/templates/views"]
  }
}
```

This does not affect how TypeScript emits JavaScript, it only emulates the assumption that they will be able to
work via those relative paths at runtime.

`rootDirs` can be used to provide a separate "type layer" to files that are not TypeScript or JavaScript by providing a home for generated `.d.ts` files in another folder. This technique is useful for bundled applications where you use `import` of files that aren't necessarily code:

```sh
 src
 └── index.ts
 └── css
     └── main.css
     └── navigation.css

 generated
 └── css
     └── main.css.d.ts
     └── navigation.css.d.ts
```

```json tsconfig
{
  "compilerOptions": {
    "rootDirs": ["src", "generated"]
  }
}
```

This technique lets you generate types ahead of time for the non-code source files. Imports then work naturally based off the source file's location.
For example `./src/index.ts` can import the file `./src/css/main.css` and TypeScript will be aware of the bundler's behavior for that filetype via the corresponding generated declaration file.

```ts twoslash
// @filename: main.css.d.ts
export const appClass = "mainClassF3EC2";
// ---cut---
// @filename: index.ts
import { appClass } from "./main.css";
```

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p>Computed from the list of input files.</p>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='typeRoots-config'><a aria-label="Link to the compiler option: typeRoots" id='typeRoots' href='#typeRoots' name='typeRoots' aria-labelledby="typeRoots-config">#</a> Type Roots - <code>typeRoots</code></h3>
<div class='compiler-content'>
<div class='markdown'>

By default all _visible_ "`@types`" packages are included in your compilation.
Packages in `node_modules/@types` of any enclosing folder are considered _visible_.
For example, that means packages within `./node_modules/@types/`, `../node_modules/@types/`, `../../node_modules/@types/`, and so on.

If `typeRoots` is specified, _only_ packages under `typeRoots` will be included. For example:

```json tsconfig
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./vendor/types"]
  }
}
```

This config file will include _all_ packages under `./typings` and `./vendor/types`, and no packages from `./node_modules/@types`.
All paths are relative to the `tsconfig.json`.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#types' aria-label="Jump to compiler option info for types" ><code>types</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='types-config'><a aria-label="Link to the compiler option: types" id='types' href='#types' name='types' aria-labelledby="types-config">#</a> Types - <code>types</code></h3>
<div class='compiler-content'>
<div class='markdown'>

By default all _visible_ "`@types`" packages are included in your compilation.
Packages in `node_modules/@types` of any enclosing folder are considered _visible_.
For example, that means packages within `./node_modules/@types/`, `../node_modules/@types/`, `../../node_modules/@types/`, and so on.

If `types` is specified, only packages listed will be included in the global scope. For instance:

```json tsconfig
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

This `tsconfig.json` file will _only_ include `./node_modules/@types/node`, `./node_modules/@types/jest` and `./node_modules/@types/express`.
Other packages under `node_modules/@types/*` will not be included.

### What does this affect?

This option does not affect how `@types/*` are included in your application code, for example if you had the above `compilerOptions` example with code like:

```ts
import * as moment from "moment";

moment().format("MMMM Do YYYY, h:mm:ss a");
```

The `moment` import would be fully typed.

When you have this option set, by not including a module in the `types` array it:

- Will not add globals to your project (e.g `process` in node, or `expect` in Jest)
- Will not have exports appear as auto-import recommendations

This feature differs from [`typeRoots`](#typeRoots) in that it is about specifying only the exact types you want included, whereas [`typeRoots`](#typeRoots) supports saying you want particular folders.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#typeRoots' aria-label="Jump to compiler option info for typeRoots" ><code>typeRoots</code></a></p>
</li></ul></li></ul>
</div></section>
<div class='category'>
<h2 id='Emit_6246' ><a href='#Emit_6246' name='Emit_6246' aria-label="Link to the section Emit" aria-labelledby='Emit_6246'>#</a>Emit</h2>

</div>
<section class='compiler-option'>
<h3 id='declaration-config'><a aria-label="Link to the compiler option: declaration" id='declaration' href='#declaration' name='declaration' aria-labelledby="declaration-config">#</a> Declaration - <code>declaration</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Generate `.d.ts` files for every TypeScript or JavaScript file inside your project.
These `.d.ts` files are type definition files which describe the external API of your module.
With `.d.ts` files, tools like TypeScript can provide intellisense and accurate types for un-typed code.

When `declaration` is set to `true`, running the compiler with this TypeScript code:

```ts twoslash
export let helloWorld = "hi";
```

Will generate an `index.js` file like this:

```ts twoslash
// @showEmit
export let helloWorld = "hi";
```

With a corresponding `helloWorld.d.ts`:

```ts twoslash
// @showEmittedFile: index.d.ts
// @showEmit
// @declaration
export let helloWorld = "hi";
```

When working with `.d.ts` files for JavaScript files you may want to use [`emitDeclarationOnly`](#emitDeclarationOnly) or use [`outDir`](#outDir) to ensure that the JavaScript files are not overwritten.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code> if <a href="#composite"><code>composite</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#declarationDir' aria-label="Jump to compiler option info for declarationDir" ><code>declarationDir</code></a></p>
</li><li><p><a href='#emitDeclarationOnly' aria-label="Jump to compiler option info for emitDeclarationOnly" ><code>emitDeclarationOnly</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.0" href="/docs/handbook/release-notes/typescript-1-0.html">1.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='declarationDir-config'><a aria-label="Link to the compiler option: declarationDir" id='declarationDir' href='#declarationDir' name='declarationDir' aria-labelledby="declarationDir-config">#</a> Declaration Dir - <code>declarationDir</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Offers a way to configure the root directory for where declaration files are emitted.

```
example
├── index.ts
├── package.json
└── tsconfig.json
```

with this `tsconfig.json`:

```json tsconfig
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types"
  }
}
```

Would place the d.ts for the `index.ts` in a `types` folder:

```
example
├── index.js
├── index.ts
├── package.json
├── tsconfig.json
└── types
    └── index.d.ts
```

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#declaration' aria-label="Jump to compiler option info for declaration" ><code>declaration</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='declarationMap-config'><a aria-label="Link to the compiler option: declarationMap" id='declarationMap' href='#declarationMap' name='declarationMap' aria-labelledby="declarationMap-config">#</a> Declaration Map - <code>declarationMap</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Generates a source map for `.d.ts` files which map back to the original `.ts` source file.
This will allow editors such as VS Code to go to the original `.ts` file when using features like _Go to Definition_.

You should strongly consider turning this on if you're using project references.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.9" href="/docs/handbook/release-notes/typescript-2-9.html">2.9</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='downlevelIteration-config'><a aria-label="Link to the compiler option: downlevelIteration" id='downlevelIteration' href='#downlevelIteration' name='downlevelIteration' aria-labelledby="downlevelIteration-config">#</a> Downlevel Iteration - <code>downlevelIteration</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Downleveling is TypeScript's term for transpiling to an older version of JavaScript.
This flag is to enable support for a more accurate implementation of how modern JavaScript iterates through new concepts in older JavaScript runtimes.

ECMAScript 6 added several new iteration primitives: the `for / of` loop (`for (el of arr)`), Array spread (`[a, ...b]`), argument spread (`fn(...args)`), and `Symbol.iterator`.
`downlevelIteration` allows for these iteration primitives to be used more accurately in ES5 environments if a `Symbol.iterator` implementation is present.

#### Example: Effects on `for / of`

With this TypeScript code:

```ts twoslash
const str = "Hello!";
for (const s of str) {
  console.log(s);
}
```

Without `downlevelIteration` enabled, a `for / of` loop on any object is downleveled to a traditional `for` loop:

```ts twoslash
// @target: ES5
// @showEmit
const str = "Hello!";
for (const s of str) {
  console.log(s);
}
```

This is often what people expect, but it's not 100% compliant with ECMAScript iteration protocol.
Certain strings, such as emoji (😜), have a `.length` of 2 (or even more!), but should iterate as 1 unit in a `for-of` loop.
See [this blog post by Jonathan New](https://blog.jonnew.com/posts/poo-dot-length-equals-two) for a longer explanation.

When `downlevelIteration` is enabled, TypeScript will use a helper function that checks for a `Symbol.iterator` implementation (either native or polyfill).
If this implementation is missing, you'll fall back to index-based iteration.

```ts twoslash
// @target: ES5
// @downlevelIteration
// @showEmit
const str = "Hello!";
for (const s of str) {
  console.log(s);
}
```

You can use [tslib](https://www.npmjs.com/package/tslib) via [`importHelpers`](#importHelpers) to reduce the amount of inline JavaScript too:

```ts twoslash
// @target: ES5
// @downlevelIteration
// @importHelpers
// @showEmit
const str = "Hello!";
for (const s of str) {
  console.log(s);
}
```

**Note:** enabling `downlevelIteration` does not improve compliance if `Symbol.iterator` is not present in the runtime.

#### Example: Effects on Array Spreads

This is an array spread:

```js
// Make a new array whose elements are 1 followed by the elements of arr2
const arr = [1, ...arr2];
```

Based on the description, it sounds easy to downlevel to ES5:

```js
// The same, right?
const arr = [1].concat(arr2);
```

However, this is observably different in certain rare cases.

For example, if a source array is missing one or more items (contains a hole), the spread syntax will replace each empty item with `undefined`, whereas `.concat` will leave them intact.

```js
// Make an array where the element at index 1 is missing
let arrayWithHole = ["a", , "c"];
let spread = [...arrayWithHole];
let concatenated = [].concat(arrayWithHole);

console.log(arrayWithHole);
// [ 'a', <1 empty item>, 'c' ]
console.log(spread);
// [ 'a', undefined, 'c' ]
console.log(concatenated);
// [ 'a', <1 empty item>, 'c' ]
```

Just as with `for / of`, `downlevelIteration` will use `Symbol.iterator` (if present) to more accurately emulate ES 6 behavior.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#importHelpers' aria-label="Jump to compiler option info for importHelpers" ><code>importHelpers</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.3" href="/docs/handbook/release-notes/typescript-2-3.html">2.3</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='emitBOM-config'><a aria-label="Link to the compiler option: emitBOM" id='emitBOM' href='#emitBOM' name='emitBOM' aria-labelledby="emitBOM-config">#</a> Emit BOM - <code>emitBOM</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Controls whether TypeScript will emit a [byte order mark (BOM)](https://wikipedia.org/wiki/Byte_order_mark) when writing output files.
Some runtime environments require a BOM to correctly interpret a JavaScript files; others require that it is not present.
The default value of `false` is generally best unless you have a reason to change it.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='emitDeclarationOnly-config'><a aria-label="Link to the compiler option: emitDeclarationOnly" id='emitDeclarationOnly' href='#emitDeclarationOnly' name='emitDeclarationOnly' aria-labelledby="emitDeclarationOnly-config">#</a> Emit Declaration Only - <code>emitDeclarationOnly</code></h3>
<div class='compiler-content'>
<div class='markdown'>

_Only_ emit `.d.ts` files; do not emit `.js` files.

This setting is useful in two cases:

- You are using a transpiler other than TypeScript to generate your JavaScript.
- You are using TypeScript to only generate `d.ts` files for your consumers.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#declaration' aria-label="Jump to compiler option info for declaration" ><code>declaration</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.8" href="/docs/handbook/release-notes/typescript-2-8.html">2.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='importHelpers-config'><a aria-label="Link to the compiler option: importHelpers" id='importHelpers' href='#importHelpers' name='importHelpers' aria-labelledby="importHelpers-config">#</a> Import Helpers - <code>importHelpers</code></h3>
<div class='compiler-content'>
<div class='markdown'>

For certain downleveling operations, TypeScript uses some helper code for operations like extending class, spreading arrays or objects, and async operations.
By default, these helpers are inserted into files which use them.
This can result in code duplication if the same helper is used in many different modules.

If the `importHelpers` flag is on, these helper functions are instead imported from the [tslib](https://www.npmjs.com/package/tslib) module.
You will need to ensure that the `tslib` module is able to be imported at runtime.
This only affects modules; global script files will not attempt to import modules.

For example, with this TypeScript:

```ts
export function fn(arr: number[]) {
  const arr2 = [1, ...arr];
}
```

Turning on [`downlevelIteration`](#downlevelIteration) and `importHelpers` is still false:

```ts twoslash
// @showEmit
// @target: ES5
// @downleveliteration
export function fn(arr: number[]) {
  const arr2 = [1, ...arr];
}
```

Then turning on both [`downlevelIteration`](#downlevelIteration) and `importHelpers`:

```ts twoslash
// @showEmit
// @target: ES5
// @downleveliteration
// @importhelpers
// @noErrors
export function fn(arr: number[]) {
  const arr2 = [1, ...arr];
}
```

You can use [`noEmitHelpers`](#noEmitHelpers) when you provide your own implementations of these functions.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#noEmitHelpers' aria-label="Jump to compiler option info for noEmitHelpers" ><code>noEmitHelpers</code></a></p>
</li><li><p><a href='#downlevelIteration' aria-label="Jump to compiler option info for downlevelIteration" ><code>downlevelIteration</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='importsNotUsedAsValues-config'><a aria-label="Link to the compiler option: importsNotUsedAsValues" id='importsNotUsedAsValues' href='#importsNotUsedAsValues' name='importsNotUsedAsValues' aria-labelledby="importsNotUsedAsValues-config">#</a> Imports Not Used As Values - <code>importsNotUsedAsValues</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Deprecated in favor of [`verbatimModuleSyntax`](#verbatimModuleSyntax).

This flag controls how `import` works, there are 3 different options:

- `remove`: The default behavior of dropping `import` statements which only reference types.

- `preserve`: Preserves all `import` statements whose values or types are never used. This can cause imports/side-effects to be preserved.

- `error`: This preserves all imports (the same as the preserve option), but will error when a value import is only used as a type. This might be useful if you want to ensure no values are being accidentally imported, but still make side-effect imports explicit.

This flag works because you can use `import type` to explicitly create an `import` statement which should never be emitted into JavaScript.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>remove</code></p>
</li>
<li><span>Allowed:</span><ul><li><p><code>remove</code></p>
</li><li><p><code>preserve</code></p>
</li><li><p><code>error</code></p>
</li></ul></li>
<li><span>Related:</span><ul><li><p><a href='#preserveValueImports' aria-label="Jump to compiler option info for preserveValueImports" ><code>preserveValueImports</code></a></p>
</li><li><p><a href='#verbatimModuleSyntax' aria-label="Jump to compiler option info for verbatimModuleSyntax" ><code>verbatimModuleSyntax</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.8" href="/docs/handbook/release-notes/typescript-3-8.html">3.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='inlineSourceMap-config'><a aria-label="Link to the compiler option: inlineSourceMap" id='inlineSourceMap' href='#inlineSourceMap' name='inlineSourceMap' aria-labelledby="inlineSourceMap-config">#</a> Inline Source Map - <code>inlineSourceMap</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When set, instead of writing out a `.js.map` file to provide source maps, TypeScript will embed the source map content in the `.js` files.
Although this results in larger JS files, it can be convenient in some scenarios.
For example, you might want to debug JS files on a webserver that doesn't allow `.map` files to be served.

Mutually exclusive with [`sourceMap`](#sourceMap).

For example, with this TypeScript:

```ts
const helloWorld = "hi";
console.log(helloWorld);
```

Converts to this JavaScript:

```ts twoslash
// @showEmit
const helloWorld = "hi";
console.log(helloWorld);
```

Then enable building it with `inlineSourceMap` enabled there is a comment at the bottom of the file which includes
a source-map for the file.

```ts twoslash
// @inlineSourceMap
// @showEmit
const helloWorld = "hi";
console.log(helloWorld);
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.5" href="/docs/handbook/release-notes/typescript-1-5.html">1.5</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='inlineSources-config'><a aria-label="Link to the compiler option: inlineSources" id='inlineSources' href='#inlineSources' name='inlineSources' aria-labelledby="inlineSources-config">#</a> Inline Sources - <code>inlineSources</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When set, TypeScript will include the original content of the `.ts` file as an embedded string in the source map (using the source map's `sourcesContent` property).
This is often useful in the same cases as [`inlineSourceMap`](#inlineSourceMap).

Requires either [`sourceMap`](#sourceMap) or [`inlineSourceMap`](#inlineSourceMap) to be set.

For example, with this TypeScript:

```ts twoslash
const helloWorld = "hi";
console.log(helloWorld);
```

By default converts to this JavaScript:

```ts twoslash
// @showEmit
const helloWorld = "hi";
console.log(helloWorld);
```

Then enable building it with `inlineSources` and [`inlineSourceMap`](#inlineSourceMap) enabled there is a comment at the bottom of the file which includes
a source-map for the file.
Note that the end is different from the example in [`inlineSourceMap`](#inlineSourceMap) because the source-map now contains the original source code also.

```ts twoslash
// @inlineSources
// @inlineSourceMap
// @showEmit
const helloWorld = "hi";
console.log(helloWorld);
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.5" href="/docs/handbook/release-notes/typescript-1-5.html">1.5</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='mapRoot-config'><a aria-label="Link to the compiler option: mapRoot" id='mapRoot' href='#mapRoot' name='mapRoot' aria-labelledby="mapRoot-config">#</a> Map Root - <code>mapRoot</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specify the location where debugger should locate map files instead of generated locations.
This string is treated verbatim inside the source-map, for example:

```json tsconfig
{
  "compilerOptions": {
    "sourceMap": true,
    "mapRoot": "https://my-website.com/debug/sourcemaps/"
  }
}
```

Would declare that `index.js` will have sourcemaps at `https://my-website.com/debug/sourcemaps/index.js.map`.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='newLine-config'><a aria-label="Link to the compiler option: newLine" id='newLine' href='#newLine' name='newLine' aria-labelledby="newLine-config">#</a> New Line - <code>newLine</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p>Platform specific.</p>
</li>
<li><span>Allowed:</span><ul><li><p><code>crlf</code></p>
</li><li><p><code>lf</code></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.5" href="/docs/handbook/release-notes/typescript-1-5.html">1.5</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noEmit-config'><a aria-label="Link to the compiler option: noEmit" id='noEmit' href='#noEmit' name='noEmit' aria-labelledby="noEmit-config">#</a> No Emit - <code>noEmit</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Do not emit compiler output files like JavaScript source code, source-maps or declarations.

This makes room for another tool like [Babel](https://babeljs.io), or [swc](https://github.com/swc-project/swc) to handle converting the TypeScript file to a file which can run inside a JavaScript environment.

You can then use TypeScript as a tool for providing editor integration, and as a source code type-checker.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noEmitHelpers-config'><a aria-label="Link to the compiler option: noEmitHelpers" id='noEmitHelpers' href='#noEmitHelpers' name='noEmitHelpers' aria-labelledby="noEmitHelpers-config">#</a> No Emit Helpers - <code>noEmitHelpers</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Instead of importing helpers with [`importHelpers`](#importHelpers), you can provide implementations in the global scope for the helpers you use and completely turn off emitting of helper functions.

For example, using this `async` function in ES5 requires a `await`-like function and `generator`-like function to run:

```ts twoslash
const getAPI = async (url: string) => {
  // Get API
  return {};
};
```

Which creates quite a lot of JavaScript:

```ts twoslash
// @showEmit
// @target: ES5
const getAPI = async (url: string) => {
  // Get API
  return {};
};
```

Which can be switched out with your own globals via this flag:

```ts twoslash
// @showEmit
// @target: ES5
// @noEmitHelpers
const getAPI = async (url: string) => {
  // Get API
  return {};
};
```

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#importHelpers' aria-label="Jump to compiler option info for importHelpers" ><code>importHelpers</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.5" href="/docs/handbook/release-notes/typescript-1-5.html">1.5</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noEmitOnError-config'><a aria-label="Link to the compiler option: noEmitOnError" id='noEmitOnError' href='#noEmitOnError' name='noEmitOnError' aria-labelledby="noEmitOnError-config">#</a> No Emit On Error - <code>noEmitOnError</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Do not emit compiler output files like JavaScript source code, source-maps or declarations if any errors were reported.

This defaults to `false`, making it easier to work with TypeScript in a watch-like environment where you may want to see results of changes to your code in another environment before making sure all errors are resolved.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.4" href="/docs/handbook/release-notes/typescript-1-4.html">1.4</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='outDir-config'><a aria-label="Link to the compiler option: outDir" id='outDir' href='#outDir' name='outDir' aria-labelledby="outDir-config">#</a> Out Dir - <code>outDir</code></h3>
<div class='compiler-content'>
<div class='markdown'>

If specified, `.js` (as well as `.d.ts`, `.js.map`, etc.) files will be emitted into this directory.
The directory structure of the original source files is preserved; see [`rootDir`](#rootDir) if the computed root is not what you intended.

If not specified, `.js` files will be emitted in the same directory as the `.ts` files they were generated from:

```sh
$ tsc

example
├── index.js
└── index.ts
```

With a `tsconfig.json` like this:

```json tsconfig
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

Running `tsc` with these settings moves the files into the specified `dist` folder:

```sh
$ tsc

example
├── dist
│   └── index.js
├── index.ts
└── tsconfig.json
```

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#out' aria-label="Jump to compiler option info for out" ><code>out</code></a></p>
</li><li><p><a href='#outFile' aria-label="Jump to compiler option info for outFile" ><code>outFile</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='outFile-config'><a aria-label="Link to the compiler option: outFile" id='outFile' href='#outFile' name='outFile' aria-labelledby="outFile-config">#</a> Out File - <code>outFile</code></h3>
<div class='compiler-content'>
<div class='markdown'>

If specified, all _global_ (non-module) files will be concatenated into the single output file specified.

If `module` is `system` or `amd`, all module files will also be concatenated into this file after all global content.

Note: `outFile` cannot be used unless `module` is `None`, `System`, or `AMD`.
This option _cannot_ be used to bundle CommonJS or ES6 modules.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#out' aria-label="Jump to compiler option info for out" ><code>out</code></a></p>
</li><li><p><a href='#outDir' aria-label="Jump to compiler option info for outDir" ><code>outDir</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.0" href="/docs/handbook/release-notes/typescript-1-0.html">1.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='preserveConstEnums-config'><a aria-label="Link to the compiler option: preserveConstEnums" id='preserveConstEnums' href='#preserveConstEnums' name='preserveConstEnums' aria-labelledby="preserveConstEnums-config">#</a> Preserve Const Enums - <code>preserveConstEnums</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Do not erase `const enum` declarations in generated code. `const enum`s provide a way to reduce the overall memory footprint
of your application at runtime by emitting the enum value instead of a reference.

For example with this TypeScript:

```ts twoslash
const enum Album {
  JimmyEatWorldFutures = 1,
  TubRingZooHypothesis = 2,
  DogFashionDiscoAdultery = 3,
}

const selectedAlbum = Album.JimmyEatWorldFutures;
if (selectedAlbum === Album.JimmyEatWorldFutures) {
  console.log("That is a great choice.");
}
```

The default `const enum` behavior is to convert any `Album.Something` to the corresponding number literal, and to remove a reference
to the enum from the JavaScript completely.

```ts twoslash
// @showEmit
const enum Album {
  JimmyEatWorldFutures = 1,
  TubRingZooHypothesis = 2,
  DogFashionDiscoAdultery = 3,
}

const selectedAlbum = Album.JimmyEatWorldFutures;
if (selectedAlbum === Album.JimmyEatWorldFutures) {
  console.log("That is a great choice.");
}
```

With `preserveConstEnums` set to `true`, the `enum` exists at runtime and the numbers are still emitted.

```ts twoslash
// @preserveConstEnums: true
// @showEmit
const enum Album {
  JimmyEatWorldFutures = 1,
  TubRingZooHypothesis = 2,
  DogFashionDiscoAdultery = 3,
}

const selectedAlbum = Album.JimmyEatWorldFutures;
if (selectedAlbum === Album.JimmyEatWorldFutures) {
  console.log("That is a great choice.");
}
```

This essentially makes such `const enums` a source-code feature only, with no runtime traces.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code> if <a href="#isolatedModules"><code>isolatedModules</code></a>; <code>false</code> otherwise.</p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='preserveValueImports-config'><a aria-label="Link to the compiler option: preserveValueImports" id='preserveValueImports' href='#preserveValueImports' name='preserveValueImports' aria-labelledby="preserveValueImports-config">#</a> Preserve Value Imports - <code>preserveValueImports</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Deprecated in favor of [`verbatimModuleSyntax`](#verbatimModuleSyntax).

There are some cases where TypeScript can't detect that you're using an import. For example, take the following code:

```ts
import { Animal } from "./animal.js";

eval("console.log(new Animal().isDangerous())");
```

or code using 'Compiles to HTML' languages like Svelte or Vue. `preserveValueImports` will prevent TypeScript from removing the import, even if it appears unused.

When combined with [`isolatedModules`](#isolatedModules): imported types _must_ be marked as type-only because compilers that process single files at a time have no way of knowing whether imports are values that appear unused, or a type that must be removed in order to avoid a runtime crash.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#isolatedModules' aria-label="Jump to compiler option info for isolatedModules" ><code>isolatedModules</code></a></p>
</li><li><p><a href='#importsNotUsedAsValues' aria-label="Jump to compiler option info for importsNotUsedAsValues" ><code>importsNotUsedAsValues</code></a></p>
</li><li><p><a href='#verbatimModuleSyntax' aria-label="Jump to compiler option info for verbatimModuleSyntax" ><code>verbatimModuleSyntax</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.5" href="/docs/handbook/release-notes/typescript-4-5.html">4.5</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='removeComments-config'><a aria-label="Link to the compiler option: removeComments" id='removeComments' href='#removeComments' name='removeComments' aria-labelledby="removeComments-config">#</a> Remove Comments - <code>removeComments</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Strips all comments from TypeScript files when converting into JavaScript. Defaults to `false`.

For example, this is a TypeScript file which has a JSDoc comment:

```ts
/** The translation of 'Hello world' into Portuguese */
export const helloWorldPTBR = "Olá Mundo";
```

When `removeComments` is set to `true`:

```ts twoslash
// @showEmit
// @removeComments: true
/** The translation of 'Hello world' into Portuguese */
export const helloWorldPTBR = "Olá Mundo";
```

Without setting `removeComments` or having it as `false`:

```ts twoslash
// @showEmit
// @removeComments: false
/** The translation of 'Hello world' into Portuguese */
export const helloWorldPTBR = "Olá Mundo";
```

This means that your comments will show up in the JavaScript code.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='sourceMap-config'><a aria-label="Link to the compiler option: sourceMap" id='sourceMap' href='#sourceMap' name='sourceMap' aria-labelledby="sourceMap-config">#</a> Source Map - <code>sourceMap</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Enables the generation of [sourcemap files](https://developer.mozilla.org/docs/Tools/Debugger/How_to/Use_a_source_map).
These files allow debuggers and other tools to display the original TypeScript source code when actually working with the emitted JavaScript files.
Source map files are emitted as `.js.map` (or `.jsx.map`) files next to the corresponding `.js` output file.

The `.js` files will in turn contain a sourcemap comment to indicate where the files are to external tools, for example:

```ts
// helloWorld.ts
export declare const helloWorld = "hi";
```

Compiling with `sourceMap` set to `true` creates the following JavaScript file:

```js
// helloWorld.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = "hi";
//# sourceMappingURL=// helloWorld.js.map
```

And this also generates this json map:

```json
// helloWorld.js.map
{
  "version": 3,
  "file": "ex.js",
  "sourceRoot": "",
  "sources": ["../ex.ts"],
  "names": [],
  "mappings": ";;AAAa,QAAA,UAAU,GAAG,IAAI,CAAA"
}
```

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='sourceRoot-config'><a aria-label="Link to the compiler option: sourceRoot" id='sourceRoot' href='#sourceRoot' name='sourceRoot' aria-labelledby="sourceRoot-config">#</a> Source Root - <code>sourceRoot</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specify the location where a debugger should locate TypeScript files instead of relative source locations.
This string is treated verbatim inside the source-map where you can use a path or a URL:

```json tsconfig
{
  "compilerOptions": {
    "sourceMap": true,
    "sourceRoot": "https://my-website.com/debug/source/"
  }
}
```

Would declare that `index.js` will have a source file at `https://my-website.com/debug/source/index.ts`.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='stripInternal-config'><a aria-label="Link to the compiler option: stripInternal" id='stripInternal' href='#stripInternal' name='stripInternal' aria-labelledby="stripInternal-config">#</a> Strip Internal - <code>stripInternal</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Do not emit declarations for code that has an `@internal` annotation in its JSDoc comment.
This is an internal compiler option; use at your own risk, because the compiler does not check that the result is valid.
If you are searching for a tool to handle additional levels of visibility within your `d.ts` files, look at [api-extractor](https://api-extractor.com).

```ts twoslash
/**
 * Days available in a week
 * @internal
 */
export const daysInAWeek = 7;

/** Calculate how much someone earns in a week */
export function weeklySalary(dayRate: number) {
  return daysInAWeek * dayRate;
}
```

With the flag set to `false` (default):

```ts twoslash
// @showEmittedFile: index.d.ts
// @showEmit
// @declaration
/**
 * Days available in a week
 * @internal
 */
export const daysInAWeek = 7;

/** Calculate how much someone earns in a week */
export function weeklySalary(dayRate: number) {
  return daysInAWeek * dayRate;
}
```

With `stripInternal` set to `true` the `d.ts` emitted will be redacted.

```ts twoslash
// @stripinternal
// @showEmittedFile: index.d.ts
// @showEmit
// @declaration
/**
 * Days available in a week
 * @internal
 */
export const daysInAWeek = 7;

/** Calculate how much someone earns in a week */
export function weeklySalary(dayRate: number) {
  return daysInAWeek * dayRate;
}
```

The JavaScript output is still the same.

</div>
<ul class='compiler-option-md'><li><span>Internal</span>
</li></ul>
</div></section>
<div class='category'>
<h2 id='JavaScript_Support_6247' ><a href='#JavaScript_Support_6247' name='JavaScript_Support_6247' aria-label="Link to the section JavaScript Support" aria-labelledby='JavaScript_Support_6247'>#</a>JavaScript Support</h2>

</div>
<section class='compiler-option'>
<h3 id='allowJs-config'><a aria-label="Link to the compiler option: allowJs" id='allowJs' href='#allowJs' name='allowJs' aria-labelledby="allowJs-config">#</a> Allow JS - <code>allowJs</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Allow JavaScript files to be imported inside your project, instead of just `.ts` and `.tsx` files. For example, this JS file:

```js twoslash
// @filename: card.js
export const defaultCardDeck = "Heart";
```

When imported into a TypeScript file will raise an error:

```ts twoslash
// @errors: 2307
// @filename: card.js
module.exports.defaultCardDeck = "Heart";
// ---cut---
// @filename: index.ts
import { defaultCardDeck } from "./card";

console.log(defaultCardDeck);
```

Imports fine with `allowJs` enabled:

```ts twoslash
// @filename: card.js
module.exports.defaultCardDeck = "Heart";
// ---cut---
// @allowJs
// @filename: index.ts
import { defaultCardDeck } from "./card";

console.log(defaultCardDeck);
```

This flag can be used as a way to incrementally add TypeScript files into JS projects by allowing the `.ts` and `.tsx` files to live along-side existing JavaScript files.

It can also be used along-side [`declaration`](#declaration) and [`emitDeclarationOnly`](#emitDeclarationOnly) to [create declarations for JS files](/docs/handbook/declaration-files/dts-from-js.html).

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#checkJs' aria-label="Jump to compiler option info for checkJs" ><code>checkJs</code></a></p>
</li><li><p><a href='#emitDeclarationOnly' aria-label="Jump to compiler option info for emitDeclarationOnly" ><code>emitDeclarationOnly</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.8" href="/docs/handbook/release-notes/typescript-1-8.html">1.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='checkJs-config'><a aria-label="Link to the compiler option: checkJs" id='checkJs' href='#checkJs' name='checkJs' aria-labelledby="checkJs-config">#</a> Check JS - <code>checkJs</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Works in tandem with [`allowJs`](#allowJs). When `checkJs` is enabled then errors are reported in JavaScript files. This is
the equivalent of including `// @ts-check` at the top of all JavaScript files which are included in your project.

For example, this is incorrect JavaScript according to the `parseFloat` type definition which comes with TypeScript:

```js
// parseFloat only takes a string
module.exports.pi = parseFloat(3.142);
```

When imported into a TypeScript module:

```ts twoslash
// @allowJs
// @filename: constants.js
module.exports.pi = parseFloat(3.142);

// @filename: index.ts
import { pi } from "./constants";
console.log(pi);
```

You will not get any errors. However, if you turn on `checkJs` then you will get error messages from the JavaScript file.

```ts twoslash
// @errors: 2345
// @allowjs: true
// @checkjs: true
// @filename: constants.js
module.exports.pi = parseFloat(3.142);

// @filename: index.ts
import { pi } from "./constants";
console.log(pi);
```

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#allowJs' aria-label="Jump to compiler option info for allowJs" ><code>allowJs</code></a></p>
</li><li><p><a href='#emitDeclarationOnly' aria-label="Jump to compiler option info for emitDeclarationOnly" ><code>emitDeclarationOnly</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.3" href="/docs/handbook/release-notes/typescript-2-3.html">2.3</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='maxNodeModuleJsDepth-config'><a aria-label="Link to the compiler option: maxNodeModuleJsDepth" id='maxNodeModuleJsDepth' href='#maxNodeModuleJsDepth' name='maxNodeModuleJsDepth' aria-labelledby="maxNodeModuleJsDepth-config">#</a> Max Node Module JS Depth - <code>maxNodeModuleJsDepth</code></h3>
<div class='compiler-content'>
<div class='markdown'>

The maximum dependency depth to search under `node_modules` and load JavaScript files.

This flag can only be used when [`allowJs`](#allowJs) is enabled, and is used if you want to have TypeScript infer types for all of the JavaScript inside your `node_modules`.

Ideally this should stay at 0 (the default), and `d.ts` files should be used to explicitly define the shape of modules.
However, there are cases where you may want to turn this on at the expense of speed and potential accuracy.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<div class='category'>
<h2 id='Editor_Support_6249' ><a href='#Editor_Support_6249' name='Editor_Support_6249' aria-label="Link to the section Editor Support" aria-labelledby='Editor_Support_6249'>#</a>Editor Support</h2>

</div>
<section class='compiler-option'>
<h3 id='disableSizeLimit-config'><a aria-label="Link to the compiler option: disableSizeLimit" id='disableSizeLimit' href='#disableSizeLimit' name='disableSizeLimit' aria-labelledby="disableSizeLimit-config">#</a> Disable Size Limit - <code>disableSizeLimit</code></h3>
<div class='compiler-content'>
<div class='markdown'>

To avoid a possible memory bloat issues when working with very large JavaScript projects, there is an upper limit to the amount of memory TypeScript will allocate. Turning this flag on will remove the limit.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='plugins-config'><a aria-label="Link to the compiler option: plugins" id='plugins' href='#plugins' name='plugins' aria-labelledby="plugins-config">#</a> Plugins - <code>plugins</code></h3>
<div class='compiler-content'>
<div class='markdown'>

List of language service plugins to run inside the editor.

Language service plugins are a way to provide additional information to a user based on existing TypeScript files. They can enhance existing messages between TypeScript and an editor, or to provide their own error messages.

For example:

- [ts-sql-plugin](https://github.com/xialvjun/ts-sql-plugin#readme) &mdash; Adds SQL linting with a template strings SQL builder.
- [typescript-styled-plugin](https://github.com/Microsoft/typescript-styled-plugin) &mdash; Provides CSS linting inside template strings .
- [typescript-eslint-language-service](https://github.com/Quramy/typescript-eslint-language-service) &mdash; Provides eslint error messaging and fix-its inside the compiler's output.
- [ts-graphql-plugin](https://github.com/Quramy/ts-graphql-plugin) &mdash; Provides validation and auto-completion inside GraphQL query template strings.

VS Code has the ability for a extension to [automatically include language service plugins](https://code.visualstudio.com/api/references/contribution-points#contributes.typescriptServerPlugins), and so you may have some running in your editor without needing to define them in your `tsconfig.json`.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<div class='category'>
<h2 id='Interop_Constraints_6252' ><a href='#Interop_Constraints_6252' name='Interop_Constraints_6252' aria-label="Link to the section Interop Constraints" aria-labelledby='Interop_Constraints_6252'>#</a>Interop Constraints</h2>

</div>
<section class='compiler-option'>
<h3 id='allowSyntheticDefaultImports-config'><a aria-label="Link to the compiler option: allowSyntheticDefaultImports" id='allowSyntheticDefaultImports' href='#allowSyntheticDefaultImports' name='allowSyntheticDefaultImports' aria-labelledby="allowSyntheticDefaultImports-config">#</a> Allow Synthetic Default Imports - <code>allowSyntheticDefaultImports</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When set to true, `allowSyntheticDefaultImports` allows you to write an import like:

```ts
import React from "react";
```

instead of:

```ts
import * as React from "react";
```

When the module **does not** explicitly specify a default export.

For example, without `allowSyntheticDefaultImports` as true:

```ts twoslash
// @errors: 1259 1192
// @checkJs
// @allowJs
// @esModuleInterop: false
// @filename: utilFunctions.js
// @noImplicitAny: false
const getStringLength = (str) => str.length;

module.exports = {
  getStringLength,
};

// @filename: index.ts
import utils from "./utilFunctions";

const count = utils.getStringLength("Check JS");
```

This code raises an error because there isn't a `default` object which you can import. Even though it feels like it should.
For convenience, transpilers like Babel will automatically create a default if one isn't created. Making the module look a bit more like:

```js
// @filename: utilFunctions.js
const getStringLength = (str) => str.length;
const allFunctions = {
  getStringLength,
};

module.exports = allFunctions;
module.exports.default = allFunctions;
```

This flag does not affect the JavaScript emitted by TypeScript, it's only for the type checking.
This option brings the behavior of TypeScript in-line with Babel, where extra code is emitted to make using a default export of a module more ergonomic.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code> if <a href="#esModuleInterop"><code>esModuleInterop</code></a> is enabled, <a href="#module"><code>module</code></a> is <code>system</code>, or <a href="#module-resolution"><code>moduleResolution</code></a> is <code>bundler</code>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#esModuleInterop' aria-label="Jump to compiler option info for esModuleInterop" ><code>esModuleInterop</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.8" href="/docs/handbook/release-notes/typescript-1-8.html">1.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='esModuleInterop-config'><a aria-label="Link to the compiler option: esModuleInterop" id='esModuleInterop' href='#esModuleInterop' name='esModuleInterop' aria-labelledby="esModuleInterop-config">#</a> ES Module Interop - <code>esModuleInterop</code></h3>
<div class='compiler-content'>
<div class='markdown'>

By default (with `esModuleInterop` false or not set) TypeScript treats CommonJS/AMD/UMD modules similar to ES6 modules. In doing this, there are two parts in particular which turned out to be flawed assumptions:

- a namespace import like `import * as moment from "moment"` acts the same as `const moment = require("moment")`

- a default import like `import moment from "moment"` acts the same as `const moment = require("moment").default`

This mis-match causes these two issues:

- the ES6 modules spec states that a namespace import (`import * as x`) can only be an object, by having TypeScript
  treating it the same as `= require("x")` then TypeScript allowed for the import to be treated as a function and be callable. That's not valid according to the spec.

- while accurate to the ES6 modules spec, most libraries with CommonJS/AMD/UMD modules didn't conform as strictly as TypeScript's implementation.

Turning on `esModuleInterop` will fix both of these problems in the code transpiled by TypeScript. The first changes the behavior in the compiler, the second is fixed by two new helper functions which provide a shim to ensure compatibility in the emitted JavaScript:

```ts
import * as fs from "fs";
import _ from "lodash";

fs.readFileSync("file.txt", "utf8");
_.chunk(["a", "b", "c", "d"], 2);
```

With `esModuleInterop` disabled:

```ts twoslash
// @noErrors
// @showEmit
// @esModuleInterop: false
// @module: commonjs
import * as fs from "fs";
import _ from "lodash";

fs.readFileSync("file.txt", "utf8");
_.chunk(["a", "b", "c", "d"], 2);
```

With `esModuleInterop` set to `true`:

```ts twoslash
// @noErrors
// @showEmit
// @esModuleInterop
// @module: commonjs
import * as fs from "fs";
import _ from "lodash";

fs.readFileSync("file.txt", "utf8");
_.chunk(["a", "b", "c", "d"], 2);
```

_Note_: The namespace import `import * as fs from "fs"` only accounts for properties which [are owned](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) (basically properties set on the object and not via the prototype chain) on the imported object. If the module you're importing defines its API using inherited properties, you need to use the default import form (`import fs from "fs"`), or disable `esModuleInterop`.

_Note_: You can make JS emit terser by enabling [`importHelpers`](#importHelpers):

```ts twoslash
// @noErrors
// @showEmit
// @esModuleInterop
// @importHelpers
// @module: commonjs
import * as fs from "fs";
import _ from "lodash";

fs.readFileSync("file.txt", "utf8");
_.chunk(["a", "b", "c", "d"], 2);
```

Enabling `esModuleInterop` will also enable [`allowSyntheticDefaultImports`](#allowSyntheticDefaultImports).

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code> if <a href="#module"><code>module</code></a> is <code>node16</code> or <code>nodenext</code>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#allowSyntheticDefaultImports' aria-label="Jump to compiler option info for allowSyntheticDefaultImports" ><code>allowSyntheticDefaultImports</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.7" href="/docs/handbook/release-notes/typescript-2-7.html">2.7</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='forceConsistentCasingInFileNames-config'><a aria-label="Link to the compiler option: forceConsistentCasingInFileNames" id='forceConsistentCasingInFileNames' href='#forceConsistentCasingInFileNames' name='forceConsistentCasingInFileNames' aria-labelledby="forceConsistentCasingInFileNames-config">#</a> Force Consistent Casing In File Names - <code>forceConsistentCasingInFileNames</code></h3>
<div class='compiler-content'>
<div class='markdown'>

TypeScript follows the case sensitivity rules of the file system it's running on.
This can be problematic if some developers are working in a case-sensitive file system and others aren't.
If a file attempts to import `fileManager.ts` by specifying `./FileManager.ts` the file will be found in a case-insensitive file system, but not on a case-sensitive file system.

When this option is set, TypeScript will issue an error if a program tries to include a file by a casing different from the casing on disk.

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Default:</span><p><code>true</code></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='isolatedModules-config'><a aria-label="Link to the compiler option: isolatedModules" id='isolatedModules' href='#isolatedModules' name='isolatedModules' aria-labelledby="isolatedModules-config">#</a> Isolated Modules - <code>isolatedModules</code></h3>
<div class='compiler-content'>
<div class='markdown'>

While you can use TypeScript to produce JavaScript code from TypeScript code, it's also common to use other transpilers such as [Babel](https://babeljs.io) to do this.
However, other transpilers only operate on a single file at a time, which means they can't apply code transforms that depend on understanding the full type system.
This restriction also applies to TypeScript's `ts.transpileModule` API which is used by some build tools.

These limitations can cause runtime problems with some TypeScript features like `const enum`s and `namespace`s.
Setting the `isolatedModules` flag tells TypeScript to warn you if you write certain code that can't be correctly interpreted by a single-file transpilation process.

It does not change the behavior of your code, or otherwise change the behavior of TypeScript's checking and emitting process.

Some examples of code which does not work when `isolatedModules` is enabled.

#### Exports of Non-Value Identifiers

In TypeScript, you can import a _type_ and then subsequently export it:

```ts twoslash
// @noErrors
import { someType, someFunction } from "someModule";

someFunction();

export { someType, someFunction };
```

Because there's no value for `someType`, the emitted `export` will not try to export it (this would be a runtime error in JavaScript):

```js
export { someFunction };
```

Single-file transpilers don't know whether `someType` produces a value or not, so it's an error to export a name that only refers to a type.

#### Non-Module Files

If `isolatedModules` is set, namespaces are only allowed in _modules_ (which means it has some form of `import`/`export`). An error occurs if a namespace is found in a non-module file:

```ts twoslash
// @errors: 1277
// @isolatedModules
namespace Instantiated {
  export const x = 1;
}
```

This restriction doesn't apply to `.d.ts` files.

#### References to `const enum` members

In TypeScript, when you reference a `const enum` member, the reference is replaced by its actual value in the emitted JavaScript. Changing this TypeScript:

```ts twoslash
declare const enum Numbers {
  Zero = 0,
  One = 1,
}
console.log(Numbers.Zero + Numbers.One);
```

To this JavaScript:

```ts twoslash
// @showEmit
// @removeComments
declare const enum Numbers {
  Zero = 0,
  One = 1,
}
console.log(Numbers.Zero + Numbers.One);
```

Without knowledge of the values of these members, other transpilers can't replace the references to `Numbers`, which would be a runtime error if left alone (since there are no `Numbers` object at runtime).
Because of this, when `isolatedModules` is set, it is an error to reference an ambient `const enum` member.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='preserveSymlinks-config'><a aria-label="Link to the compiler option: preserveSymlinks" id='preserveSymlinks' href='#preserveSymlinks' name='preserveSymlinks' aria-labelledby="preserveSymlinks-config">#</a> Preserve Symlinks - <code>preserveSymlinks</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This is to reflect the same flag in Node.js; which does not resolve the real path of symlinks.

This flag also exhibits the opposite behavior to Webpack’s `resolve.symlinks` option (i.e. setting TypeScript’s `preserveSymlinks` to true parallels setting Webpack’s `resolve.symlinks` to false, and vice-versa).

With this enabled, references to modules and packages (e.g. `import`s and `/// <reference type="..." />` directives) are all resolved relative to the location of the symbolic link file, rather than relative to the path that the symbolic link resolves to.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='verbatimModuleSyntax-config'><a aria-label="Link to the compiler option: verbatimModuleSyntax" id='verbatimModuleSyntax' href='#verbatimModuleSyntax' name='verbatimModuleSyntax' aria-labelledby="verbatimModuleSyntax-config">#</a> Verbatim Module Syntax - <code>verbatimModuleSyntax</code></h3>
<div class='compiler-content'>
<div class='markdown'>

By default, TypeScript does something called _import elision_.
Basically, if you write something like

```ts
import { Car } from "./car";

export function drive(car: Car) {
  // ...
}
```

TypeScript detects that you're only using an import for types and drops the import entirely.
Your output JavaScript might look something like this:

```js
export function drive(car) {
  // ...
}
```

Most of the time this is good, because if `Car` isn't a value that's exported from `./car`, we'll get a runtime error.

But it does add a layer of complexity for certain edge cases.
For example, notice there's no statement like `import "./car";` - the import was dropped entirely.
That actually makes a difference for modules that have side-effects or not.

TypeScript's emit strategy for JavaScript also has another few layers of complexity - import elision isn't always just driven by how an import is used - it often consults how a value is declared as well.
So it's not always clear whether code like the following

```ts
export { Car } from "./car";
```

should be preserved or dropped.
If `Car` is declared with something like a `class`, then it can be preserved in the resulting JavaScript file.
But if `Car` is only declared as a `type` alias or `interface`, then the JavaScript file shouldn't export `Car` at all.

While TypeScript might be able to make these emit decisions based on information from across files, not every compiler can.

The `type` modifier on imports and exports helps with these situations a bit.
We can make it explicit whether an import or export is only being used for type analysis, and can be dropped entirely in JavaScript files by using the `type` modifier.

```ts
// This statement can be dropped entirely in JS output
import type * as car from "./car";

// The named import/export 'Car' can be dropped in JS output
import { type Car } from "./car";
export { type Car } from "./car";
```

`type` modifiers are not quite useful on their own - by default, module elision will still drop imports, and nothing forces you to make the distinction between `type` and plain imports and exports.
So TypeScript has the flag `--importsNotUsedAsValues` to make sure you use the `type` modifier, `--preserveValueImports` to prevent _some_ module elision behavior, and `--isolatedModules` to make sure that your TypeScript code works across different compilers.
Unfortunately, understanding the fine details of those 3 flags is hard, and there are still some edge cases with unexpected behavior.

TypeScript 5.0 introduces a new option called `--verbatimModuleSyntax` to simplify the situation.
The rules are much simpler - any imports or exports without a `type` modifier are left around.
Anything that uses the `type` modifier is dropped entirely.

```ts
// Erased away entirely.
import type { A } from "a";

// Rewritten to 'import { b } from "bcd";'
import { b, type c, type d } from "bcd";

// Rewritten to 'import {} from "xyz";'
import { type xyz } from "xyz";
```

With this new option, what you see is what you get.

That does have some implications when it comes to module interop though.
Under this flag, ECMAScript `import`s and `export`s won't be rewritten to `require` calls when your settings or file extension implied a different module system.
Instead, you'll get an error.
If you need to emit code that uses `require` and `module.exports`, you'll have to use TypeScript's module syntax that predates ES2015:

<table>
<thead>
    <tr>
        <th>Input TypeScript</th>
        <th>Output JavaScript</th>
    </tr>
</thead>

<tr>
<td>

```ts
import foo = require("foo");
```

</td>
<td>

```js
const foo = require("foo");
```

</td>
</tr>
<tr>
<td>

```ts
function foo() {}
function bar() {}
function baz() {}

export = {
  foo,
  bar,
  baz,
};
```

</td>
<td>

```js
function foo() {}
function bar() {}
function baz() {}

module.exports = {
  foo,
  bar,
  baz,
};
```

</td>
</tr>
</table>

While this is a limitation, it does help make some issues more obvious.
For example, it's very common to forget to set the [`type` field in `package.json`](https://nodejs.org/api/packages.html#type) under `--module node16`.
As a result, developers would start writing CommonJS modules instead of an ES modules without realizing it, giving surprising lookup rules and JavaScript output.
This new flag ensures that you're intentional about the file type you're using because the syntax is intentionally different.

Because `--verbatimModuleSyntax` provides a more consistent story than `--importsNotUsedAsValues` and `--preserveValueImports`, those two existing flags are being deprecated in its favor.

For more details, read up on [the original pull request](https://github.com/microsoft/TypeScript/pull/52203) and [its proposal issue](https://github.com/microsoft/TypeScript/issues/51479).

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<div class='category'>
<h2 id='Backwards_Compatibility_6253' ><a href='#Backwards_Compatibility_6253' name='Backwards_Compatibility_6253' aria-label="Link to the section Backwards Compatibility" aria-labelledby='Backwards_Compatibility_6253'>#</a>Backwards Compatibility</h2>

</div>
<section class='compiler-option'>
<h3 id='charset-config'><a aria-label="Link to the compiler option: charset" id='charset' href='#charset' name='charset' aria-labelledby="charset-config">#</a> Charset - <code>charset</code></h3>
<div class='compiler-content'>
<div class='markdown'>

In prior versions of TypeScript, this controlled what encoding was used when reading text files from disk.
Today, TypeScript assumes UTF-8 encoding, but will correctly detect UTF-16 (BE and LE) or UTF-8 BOMs.

</div>
<ul class='compiler-option-md'><li><span>Deprecated</span>
</li>
<li><span>Default:</span><p><code>utf8</code></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='keyofStringsOnly-config'><a aria-label="Link to the compiler option: keyofStringsOnly" id='keyofStringsOnly' href='#keyofStringsOnly' name='keyofStringsOnly' aria-labelledby="keyofStringsOnly-config">#</a> Keyof Strings Only - <code>keyofStringsOnly</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This flag changes the `keyof` type operator to return `string` instead of `string | number` when applied to a type with a string index signature.

This flag is used to help people keep this behavior from [before TypeScript 2.9's release](/docs/handbook/release-notes/typescript-2-9.html#support-number-and-symbol-named-properties-with-keyof-and-mapped-types).

</div>
<ul class='compiler-option-md'><li><span>Deprecated</span>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.9" href="/docs/handbook/release-notes/typescript-2-9.html">2.9</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noImplicitUseStrict-config'><a aria-label="Link to the compiler option: noImplicitUseStrict" id='noImplicitUseStrict' href='#noImplicitUseStrict' name='noImplicitUseStrict' aria-labelledby="noImplicitUseStrict-config">#</a> No Implicit Use Strict - <code>noImplicitUseStrict</code></h3>
<div class='compiler-content'>
<div class='markdown'>

You shouldn't need this. By default, when emitting a module file to a non-ES6 target, TypeScript emits a `"use strict";` prologue at the top of the file.
This setting disables the prologue.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noStrictGenericChecks-config'><a aria-label="Link to the compiler option: noStrictGenericChecks" id='noStrictGenericChecks' href='#noStrictGenericChecks' name='noStrictGenericChecks' aria-labelledby="noStrictGenericChecks-config">#</a> No Strict Generic Checks - <code>noStrictGenericChecks</code></h3>
<div class='compiler-content'>
<div class='markdown'>

TypeScript will unify type parameters when comparing two generic functions.

```ts twoslash
// @errors: 2322

type A = <T, U>(x: T, y: U) => [T, U];
type B = <S>(x: S, y: S) => [S, S];

function f(a: A, b: B) {
  b = a; // Ok
  a = b; // Error
}
```

This flag can be used to remove that check.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.4" href="/docs/handbook/release-notes/typescript-2-4.html">2.4</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='out-config'><a aria-label="Link to the compiler option: out" id='out' href='#out' name='out' aria-labelledby="out-config">#</a> Out - <code>out</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Use [`outFile`](#outFile) instead.

The `out` option computes the final file location in a way that is not predictable or consistent.
This option is retained for backward compatibility only and is deprecated.

</div>
<ul class='compiler-option-md'><li><span>Deprecated</span>
</li>
<li><span>Related:</span><ul><li><p><a href='#outDir' aria-label="Jump to compiler option info for outDir" ><code>outDir</code></a></p>
</li><li><p><a href='#outFile' aria-label="Jump to compiler option info for outFile" ><code>outFile</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='suppressExcessPropertyErrors-config'><a aria-label="Link to the compiler option: suppressExcessPropertyErrors" id='suppressExcessPropertyErrors' href='#suppressExcessPropertyErrors' name='suppressExcessPropertyErrors' aria-labelledby="suppressExcessPropertyErrors-config">#</a> Suppress Excess Property Errors - <code>suppressExcessPropertyErrors</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This disables reporting of excess property errors, such as the one shown in the following example:

```ts twoslash
// @errors: 2322
type Point = { x: number; y: number };
const p: Point = { x: 1, y: 3, m: 10 };
```

This flag was added to help people migrate to the stricter checking of new object literals in [TypeScript 1.6](/docs/handbook/release-notes/typescript-1-6.html#stricter-object-literal-assignment-checks).

We don't recommend using this flag in a modern codebase, you can suppress one-off cases where you need it using `// @ts-ignore`.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='suppressImplicitAnyIndexErrors-config'><a aria-label="Link to the compiler option: suppressImplicitAnyIndexErrors" id='suppressImplicitAnyIndexErrors' href='#suppressImplicitAnyIndexErrors' name='suppressImplicitAnyIndexErrors' aria-labelledby="suppressImplicitAnyIndexErrors-config">#</a> Suppress Implicit Any Index Errors - <code>suppressImplicitAnyIndexErrors</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Turning `suppressImplicitAnyIndexErrors` on suppresses reporting the error about implicit anys when indexing into objects, as shown in the following example:

```ts twoslash
// @noImplicitAny: true
// @suppressImplicitAnyIndexErrors: false
// @strict: true
// @errors: 7053
const obj = { x: 10 };
console.log(obj["foo"]);
```

Using `suppressImplicitAnyIndexErrors` is quite a drastic approach. It is recommended to use a `@ts-ignore` comment instead:

```ts twoslash
// @noImplicitAny: true
// @strict: true
const obj = { x: 10 };
// @ts-ignore
console.log(obj["foo"]);
```

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#noImplicitAny' aria-label="Jump to compiler option info for noImplicitAny" ><code>noImplicitAny</code></a></p>
</li></ul></li></ul>
</div></section>
<div class='category'>
<h2 id='Language_and_Environment_6254' ><a href='#Language_and_Environment_6254' name='Language_and_Environment_6254' aria-label="Link to the section Language and Environment" aria-labelledby='Language_and_Environment_6254'>#</a>Language and Environment</h2>

</div>
<section class='compiler-option'>
<h3 id='emitDecoratorMetadata-config'><a aria-label="Link to the compiler option: emitDecoratorMetadata" id='emitDecoratorMetadata' href='#emitDecoratorMetadata' name='emitDecoratorMetadata' aria-labelledby="emitDecoratorMetadata-config">#</a> Emit Decorator Metadata - <code>emitDecoratorMetadata</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Enables experimental support for emitting type metadata for decorators which works with the module [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata).

For example, here is the TypeScript

```ts twoslash
// @experimentalDecorators
function LogMethod(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

class Demo {
  @LogMethod
  public foo(bar: number) {
    // do nothing
  }
}

const demo = new Demo();
```

With `emitDecoratorMetadata` not set to true (default) the emitted JavaScript is:

```ts twoslash
// @experimentalDecorators
// @showEmit
function LogMethod(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

class Demo {
  @LogMethod
  public foo(bar: number) {
    // do nothing
  }
}

const demo = new Demo();
```

With `emitDecoratorMetadata` set to true the emitted JavaScript is:

```ts twoslash
// @experimentalDecorators
// @showEmit
// @emitDecoratorMetadata
function LogMethod(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

class Demo {
  @LogMethod
  public foo(bar: number) {
    // do nothing
  }
}

const demo = new Demo();
```

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#experimentalDecorators' aria-label="Jump to compiler option info for experimentalDecorators" ><code>experimentalDecorators</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='experimentalDecorators-config'><a aria-label="Link to the compiler option: experimentalDecorators" id='experimentalDecorators' href='#experimentalDecorators' name='experimentalDecorators' aria-labelledby="experimentalDecorators-config">#</a> Experimental Decorators - <code>experimentalDecorators</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Enables [experimental support for decorators](https://github.com/tc39/proposal-decorators), which is a version of decorators that predates the TC39 standardization process.

Decorators are a language feature which hasn't yet been fully ratified into the JavaScript specification.
This means that the implementation version in TypeScript may differ from the implementation in JavaScript when it it decided by TC39.

You can find out more about decorator support in TypeScript in [the handbook](/docs/handbook/decorators.html).

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#emitDecoratorMetadata' aria-label="Jump to compiler option info for emitDecoratorMetadata" ><code>emitDecoratorMetadata</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='jsx-config'><a aria-label="Link to the compiler option: jsx" id='jsx' href='#jsx' name='jsx' aria-labelledby="jsx-config">#</a> JSX - <code>jsx</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Controls how JSX constructs are emitted in JavaScript files.
This only affects output of JS files that started in `.tsx` files.

- `react`: Emit `.js` files with JSX changed to the equivalent `React.createElement` calls
- `react-jsx`: Emit `.js` files with the JSX changed to `_jsx` calls
- `react-jsxdev`: Emit `.js` files with the JSX changed to `_jsx` calls
- `preserve`: Emit `.jsx` files with the JSX unchanged
- `react-native`: Emit `.js` files with the JSX unchanged

### For example

This sample code:

```tsx
export const HelloWorld = () => <h1>Hello world</h1>;
```

Default: `"react"`

```tsx twoslash
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}
// @showEmit
// @noErrors
export const HelloWorld = () => <h1>Hello world</h1>;
```

Preserve: `"preserve"`

```tsx twoslash
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}
// @showEmit
// @noErrors
// @jsx: preserve
export const HelloWorld = () => <h1>Hello world</h1>;
```

React Native: `"react-native"`

```tsx twoslash
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}
// @showEmit
// @noErrors
// @jsx: react-native
export const HelloWorld = () => <h1>Hello world</h1>;
```

React 17 transform: `"react-jsx"`<sup>[[1]](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)</sup>

```tsx twoslash
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}
// @showEmit
// @noErrors
// @jsx: react-jsx
export const HelloWorld = () => <h1>Hello world</h1>;
```

React 17 dev transform: `"react-jsxdev"`<sup>[[1]](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)</sup>

```tsx twoslash
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}
// @showEmit
// @noErrors
// @jsx: react-jsxdev
export const HelloWorld = () => <h1>Hello world</h1>;
```

</div>
<ul class='compiler-option-md'><li><span>Allowed:</span><ul><li><p><code>preserve</code></p>
</li><li><p><code>react</code></p>
</li><li><p><code>react-native</code></p>
</li><li><p><code>react-jsx</code></p>
</li><li><p><code>react-jsxdev</code></p>
</li></ul></li>
<li><span>Related:</span><ul><li><p><a href='#jsxFactory' aria-label="Jump to compiler option info for jsxFactory" ><code>jsxFactory</code></a></p>
</li><li><p><a href='#jsxFragmentFactory' aria-label="Jump to compiler option info for jsxFragmentFactory" ><code>jsxFragmentFactory</code></a></p>
</li><li><p><a href='#jsxImportSource' aria-label="Jump to compiler option info for jsxImportSource" ><code>jsxImportSource</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.2" href="/docs/handbook/release-notes/typescript-2-2.html">2.2</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='jsxFactory-config'><a aria-label="Link to the compiler option: jsxFactory" id='jsxFactory' href='#jsxFactory' name='jsxFactory' aria-labelledby="jsxFactory-config">#</a> JSX Factory - <code>jsxFactory</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Changes the function called in `.js` files when compiling JSX Elements using the classic JSX runtime.
The most common change is to use `"h"` or `"preact.h"` instead of the default `"React.createElement"` if using `preact`.

For example, this TSX file:

```tsx
import { h } from "preact";

const HelloWorld = () => <div>Hello</div>;
```

With `jsxFactory: "h"` looks like:

```tsx twoslash
// @showEmit
// @showEmittedFile: index.js
// @jsxFactory: h
// @noErrors
// @target: esnext
// @module: commonjs

import { h, Fragment } from "preact";

const HelloWorld = () => <div>Hello</div>;
```

This option can be used on a per-file basis too similar to [Babel's `/** @jsx h */` directive](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom).

```tsx twoslash
/** @jsx h */
import { h } from "preact";

const HelloWorld = () => <div>Hello</div>;
```

The factory chosen will also affect where the `JSX` namespace is looked up (for type checking information) before falling back to the global one.

If the factory is defined as `React.createElement` (the default), the compiler will check for `React.JSX` before checking for a global `JSX`. If the factory is defined as `h`, it will check for `h.JSX` before a global `JSX`.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>React.createElement</code></p>
</li>
<li><span>Allowed:</span><ul><li><p>Any identifier or dotted identifier.</p>
</li></ul></li>
<li><span>Related:</span><ul><li><p><a href='#jsx' aria-label="Jump to compiler option info for jsx" ><code>jsx</code></a></p>
</li><li><p><a href='#jsxFragmentFactory' aria-label="Jump to compiler option info for jsxFragmentFactory" ><code>jsxFragmentFactory</code></a></p>
</li><li><p><a href='#jsxImportSource' aria-label="Jump to compiler option info for jsxImportSource" ><code>jsxImportSource</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='jsxFragmentFactory-config'><a aria-label="Link to the compiler option: jsxFragmentFactory" id='jsxFragmentFactory' href='#jsxFragmentFactory' name='jsxFragmentFactory' aria-labelledby="jsxFragmentFactory-config">#</a> JSX Fragment Factory - <code>jsxFragmentFactory</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Specify the JSX fragment factory function to use when targeting react JSX emit with [`jsxFactory`](#jsxFactory) compiler option is specified, e.g. `Fragment`.

For example with this TSConfig:

```json tsconfig
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

This TSX file:

```tsx
import { h, Fragment } from "preact";

const HelloWorld = () => (
  <>
    <div>Hello</div>
  </>
);
```

Would look like:

```tsx twoslash
// @showEmit
// @showEmittedFile: index.js
// @jsxFactory: h
// @jsxFragmentFactory: Fragment
// @noErrors
// @target: esnext
// @module: commonjs

import { h, Fragment } from "preact";

const HelloWorld = () => (
  <>
    <div>Hello</div>
  </>
);
```

This option can be used on a per-file basis too similar to [Babel's `/* @jsxFrag h */` directive](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#fragments).

For example:

```tsx twoslash
/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from "preact";

const HelloWorld = () => (
  <>
    <div>Hello</div>
  </>
);
```

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>React.Fragment</code></p>
</li>
<li><span>Related:</span><ul><li><p><a href='#jsx' aria-label="Jump to compiler option info for jsx" ><code>jsx</code></a></p>
</li><li><p><a href='#jsxFactory' aria-label="Jump to compiler option info for jsxFactory" ><code>jsxFactory</code></a></p>
</li><li><p><a href='#jsxImportSource' aria-label="Jump to compiler option info for jsxImportSource" ><code>jsxImportSource</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.0" href="/docs/handbook/release-notes/typescript-4-0.html">4.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='jsxImportSource-config'><a aria-label="Link to the compiler option: jsxImportSource" id='jsxImportSource' href='#jsxImportSource' name='jsxImportSource' aria-labelledby="jsxImportSource-config">#</a> JSX Import Source - <code>jsxImportSource</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Declares the module specifier to be used for importing the `jsx` and `jsxs` factory functions when using [`jsx`](#jsx) as `"react-jsx"` or `"react-jsxdev"` which were introduced in TypeScript 4.1.

With [React 17](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) the library supports a new form of JSX transformation via a separate import.

For example with this code:

```tsx
import React from "react";

function App() {
  return <h1>Hello World</h1>;
}
```

Using this TSConfig:

```json tsconfig
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react-jsx"
  }
}
```

The emitted JavaScript from TypeScript is:

```tsx twoslash
// @showEmit
// @noErrors
// @jsx: react-jsx
// @module: commonjs
// @target: esnext
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}
import React from "react";

function App() {
  return <h1>Hello World</h1>;
}
```

For example if you wanted to use `"jsxImportSource": "preact"`, you need a tsconfig like:

```json tsconfig
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "types": ["preact"]
  }
}
```

Which generates code like:

```tsx twoslash
// @showEmit
// @jsxImportSource: preact
// @types: preact
// @jsx: react-jsx
// @target: esnext
// @module: commonjs
// @noErrors

export function App() {
  return <h1>Hello World</h1>;
}
```

Alternatively, you can use a per-file pragma to set this option, for example:

```tsx
/** @jsxImportSource preact */

export function App() {
  return <h1>Hello World</h1>;
}
```

Would add `preact/jsx-runtime` as an import for the `_jsx` factory.

_Note:_ In order for this to work like you would expect, your `tsx` file must include an `export` or `import` so that it is considered a module.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>react</code></p>
</li>
<li><span>Related:</span><ul><li><p><a href='#jsx' aria-label="Jump to compiler option info for jsx" ><code>jsx</code></a></p>
</li><li><p><a href='#jsxFactory' aria-label="Jump to compiler option info for jsxFactory" ><code>jsxFactory</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.1" href="/docs/handbook/release-notes/typescript-4-1.html">4.1</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='lib-config'><a aria-label="Link to the compiler option: lib" id='lib' href='#lib' name='lib' aria-labelledby="lib-config">#</a> Lib - <code>lib</code></h3>
<div class='compiler-content'>
<div class='markdown'>

TypeScript includes a default set of type definitions for built-in JS APIs (like `Math`), as well as type definitions for things found in browser environments (like `document`).
TypeScript also includes APIs for newer JS features matching the [`target`](#target) you specify; for example the definition for `Map` is available if [`target`](#target) is `ES6` or newer.

You may want to change these for a few reasons:

- Your program doesn't run in a browser, so you don't want the `"dom"` type definitions
- Your runtime platform provides certain JavaScript API objects (maybe through polyfills), but doesn't yet support the full syntax of a given ECMAScript version
- You have polyfills or native implementations for some, but not all, of a higher level ECMAScript version

In TypeScript 4.5, lib files can be overridden by npm modules, find out more [in the blog](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#supporting-lib-from-node_modules).

### High Level libraries

| Name         | Contents                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ES5`        | Core definitions for all ES3 and ES5 functionality                                                                                                |
| `ES2015`     | Additional APIs available in ES2015 (also known as ES6) - `array.find`, `Promise`, `Proxy`, `Symbol`, `Map`, `Set`, `Reflect`, etc.               |
| `ES6`        | Alias for "ES2015"                                                                                                                                |
| `ES2016`     | Additional APIs available in ES2016 - `array.include`, etc.                                                                                       |
| `ES7`        | Alias for "ES2016"                                                                                                                                |
| `ES2017`     | Additional APIs available in ES2017 - `Object.entries`, `Object.values`, `Atomics`, `SharedArrayBuffer`, `date.formatToParts`, typed arrays, etc. |
| `ES2018`     | Additional APIs available in ES2018 - `async` iterables, `promise.finally`, `Intl.PluralRules`, `regexp.groups`, etc.                             |
| `ES2019`     | Additional APIs available in ES2019 - `array.flat`, `array.flatMap`, `Object.fromEntries`, `string.trimStart`, `string.trimEnd`, etc.             |
| `ES2020`     | Additional APIs available in ES2020 - `string.matchAll`, etc.                                                                                     |
| `ES2021`     | Additional APIs available in ES2021 - `promise.any`, `string.replaceAll` etc.                                                                     |
| `ES2022`     | Additional APIs available in ES2022 - `array.at`, `RegExp.hasIndices`, etc.                                                                       |
| `ESNext`     | Additional APIs available in ESNext - This changes as the JavaScript specification evolves                                                        |
| `DOM`        | [DOM](https://developer.mozilla.org/docs/Glossary/DOM) definitions - `window`, `document`, etc.                                                   |
| `WebWorker`  | APIs available in [WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) contexts                              |
| `ScriptHost` | APIs for the [Windows Script Hosting System](https://wikipedia.org/wiki/Windows_Script_Host)                                                      |

### Individual library components

| Name                      |
| ------------------------- |
| `DOM.Iterable`            |
| `ES2015.Core`             |
| `ES2015.Collection`       |
| `ES2015.Generator`        |
| `ES2015.Iterable`         |
| `ES2015.Promise`          |
| `ES2015.Proxy`            |
| `ES2015.Reflect`          |
| `ES2015.Symbol`           |
| `ES2015.Symbol.WellKnown` |
| `ES2016.Array.Include`    |
| `ES2017.object`           |
| `ES2017.Intl`             |
| `ES2017.SharedMemory`     |
| `ES2017.String`           |
| `ES2017.TypedArrays`      |
| `ES2018.Intl`             |
| `ES2018.Promise`          |
| `ES2018.RegExp`           |
| `ES2019.Array`            |
| `ES2019.Object`           |
| `ES2019.String`           |
| `ES2019.Symbol`           |
| `ES2020.String`           |
| `ES2020.Symbol.wellknown` |
| `ES2021.Promise`          |
| `ES2021.String`           |
| `ES2021.WeakRef`          |
| `ESNext.AsyncIterable`    |
| `ESNext.Array`            |
| `ESNext.Intl`             |
| `ESNext.Symbol`           |

This list may be out of date, you can see the full list in the [TypeScript source code](https://github.com/microsoft/TypeScript/tree/main/src/lib).

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#noLib' aria-label="Jump to compiler option info for noLib" ><code>noLib</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='moduleDetection-config'><a aria-label="Link to the compiler option: moduleDetection" id='moduleDetection' href='#moduleDetection' name='moduleDetection' aria-labelledby="moduleDetection-config">#</a> Module Detection - <code>moduleDetection</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This setting controls how TypeScript determines whether a file is a
[script or a module](/docs/handbook/modules/theory.html#scripts-and-modules-in-javascript).

There are three choices:

- `"auto"` (default) - TypeScript will not only look for import and export statements, but it will also check whether the `"type"` field in a `package.json` is set to `"module"` when running with [`module`](#module): `nodenext` or `node16`, and check whether the current file is a JSX file when running under [`jsx`](#jsx): `react-jsx`.

- `"legacy"` - The same behavior as 4.6 and prior, usings import and export statements to determine whether a file is a module.

- `"force"` - Ensures that every non-declaration file is treated as a module.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p>"auto": Treat files with imports, exports, import.meta, jsx (with jsx: react-jsx), or esm format (with module: node16+) as modules.</p>
</li>
<li><span>Allowed:</span><ul><li><p><code>legacy</code></p>
</li><li><p><code>auto</code></p>
</li><li><p><code>force</code></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.7" href="/docs/handbook/release-notes/typescript-4-7.html">4.7</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='noLib-config'><a aria-label="Link to the compiler option: noLib" id='noLib' href='#noLib' name='noLib' aria-labelledby="noLib-config">#</a> No Lib - <code>noLib</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Disables the automatic inclusion of any library files.
If this option is set, `lib` is ignored.

TypeScript _cannot_ compile anything without a set of interfaces for key primitives like: `Array`, `Boolean`, `Function`, `IArguments`, `Number`, `Object`, `RegExp`, and `String`. It is expected that if you use `noLib` you will be including your own type definitions for these.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#lib' aria-label="Jump to compiler option info for lib" ><code>lib</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='reactNamespace-config'><a aria-label="Link to the compiler option: reactNamespace" id='reactNamespace' href='#reactNamespace' name='reactNamespace' aria-labelledby="reactNamespace-config">#</a> React Namespace - <code>reactNamespace</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Use [`jsxFactory`](#jsxFactory) instead. Specify the object invoked for `createElement` when targeting `react` for TSX files.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>React</code></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='target-config'><a aria-label="Link to the compiler option: target" id='target' href='#target' name='target' aria-labelledby="target-config">#</a> Target - <code>target</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Modern browsers support all ES6 features, so `ES6` is a good choice.
You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments.

The `target` setting changes which JS features are downleveled and which are left intact.
For example, an arrow function `() => this` will be turned into an equivalent `function` expression if `target` is ES5 or lower.

Changing `target` also changes the default value of [`lib`](#lib).
You may "mix and match" `target` and `lib` settings as desired, but you could just set `target` for convenience.

For developer platforms like Node there are baselines for the `target`, depending on the type of platform and its version. You can find a set of community organized TSConfigs at [tsconfig/bases](https://github.com/tsconfig/bases#centralized-recommendations-for-tsconfig-bases), which has configurations for common platforms and their versions.

The special `ESNext` value refers to the highest version your version of TypeScript supports.
This setting should be used with caution, since it doesn't mean the same thing between different TypeScript versions and can make upgrades less predictable.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>ES3</code></p>
</li>
<li><span>Allowed:</span><ul><li><p><code>es3</code></p>
</li><li><p><code>es5</code></p>
</li><li><p><code>es6</code>/<code>es2015</code></p>
</li><li><p><code>es2016</code></p>
</li><li><p><code>es2017</code></p>
</li><li><p><code>es2018</code></p>
</li><li><p><code>es2019</code></p>
</li><li><p><code>es2020</code></p>
</li><li><p><code>es2021</code></p>
</li><li><p><code>es2022</code></p>
</li><li><p><code>esnext</code></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 1.0" href="/docs/handbook/release-notes/typescript-1-0.html">1.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='useDefineForClassFields-config'><a aria-label="Link to the compiler option: useDefineForClassFields" id='useDefineForClassFields' href='#useDefineForClassFields' name='useDefineForClassFields' aria-labelledby="useDefineForClassFields-config">#</a> Use Define For Class Fields - <code>useDefineForClassFields</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This flag is used as part of migrating to the upcoming standard version of class fields. TypeScript introduced class fields many years before it was ratified in TC39. The latest version of the upcoming specification has a different runtime behavior to TypeScript's implementation but the same syntax.

This flag switches to the upcoming ECMA runtime behavior.

You can read more about the transition in [the 3.7 release notes](/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code> if <a href="#target"><code>target</code></a> is <code>ES2022</code> or higher, including <code>ESNext</code>; <code>false</code> otherwise.</p>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.7" href="/docs/handbook/release-notes/typescript-3-7.html">3.7</a></p>
</li></ul>
</div></section>
<div class='category'>
<h2 id='Compiler_Diagnostics_6251' ><a href='#Compiler_Diagnostics_6251' name='Compiler_Diagnostics_6251' aria-label="Link to the section Compiler Diagnostics" aria-labelledby='Compiler_Diagnostics_6251'>#</a>Compiler Diagnostics</h2>

</div>
<section class='compiler-option'>
<h3 id='diagnostics-config'><a aria-label="Link to the compiler option: diagnostics" id='diagnostics' href='#diagnostics' name='diagnostics' aria-labelledby="diagnostics-config">#</a> Diagnostics - <code>diagnostics</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Used to output diagnostic information for debugging. This command is a subset of [`extendedDiagnostics`](#extendedDiagnostics) which are more user-facing results, and easier to interpret.

If you have been asked by a TypeScript compiler engineer to give the results using this flag in a compile, in which there is no harm in using [`extendedDiagnostics`](#extendedDiagnostics) instead.

</div>
<ul class='compiler-option-md'><li><span>Deprecated</span>
</li>
<li><span>Related:</span><ul><li><p><a href='#extendedDiagnostics' aria-label="Jump to compiler option info for extendedDiagnostics" ><code>extendedDiagnostics</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='explainFiles-config'><a aria-label="Link to the compiler option: explainFiles" id='explainFiles' href='#explainFiles' name='explainFiles' aria-labelledby="explainFiles-config">#</a> Explain Files - <code>explainFiles</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Print names of files which TypeScript sees as a part of your project and the reason they are part of the compilation.

For example, with this project of just a single `index.ts` file

```sh
example
├── index.ts
├── package.json
└── tsconfig.json
```

Using a `tsconfig.json` which has `explainFiles` set to true:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "explainFiles": true
  }
}
```

Running TypeScript against this folder would have output like this:

```
❯ tsc
node_modules/typescript/lib/lib.d.ts
  Default library for target 'es5'
node_modules/typescript/lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'node_modules/typescript/lib/lib.d.ts'
node_modules/typescript/lib/lib.dom.d.ts
  Library referenced via 'dom' from file 'node_modules/typescript/lib/lib.d.ts'
node_modules/typescript/lib/lib.webworker.importscripts.d.ts
  Library referenced via 'webworker.importscripts' from file 'node_modules/typescript/lib/lib.d.ts'
node_modules/typescript/lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'node_modules/typescript/lib/lib.d.ts'
index.ts
  Matched by include pattern '**/*' in 'tsconfig.json'
```

The output above show:

- The initial lib.d.ts lookup based on [`target`](#target), and the chain of `.d.ts` files which are referenced
- The `index.ts` file located via the default pattern of [`include`](#include)

This option is intended for debugging how a file has become a part of your compile.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.2" href="/docs/handbook/release-notes/typescript-4-2.html">4.2</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='extendedDiagnostics-config'><a aria-label="Link to the compiler option: extendedDiagnostics" id='extendedDiagnostics' href='#extendedDiagnostics' name='extendedDiagnostics' aria-labelledby="extendedDiagnostics-config">#</a> Extended Diagnostics - <code>extendedDiagnostics</code></h3>
<div class='compiler-content'>
<div class='markdown'>

You can use this flag to discover where TypeScript is spending its time when compiling.
This is a tool used for understanding the performance characteristics of your codebase overall.

You can learn more about how to measure and understand the output in the performance [section of the wiki](https://github.com/microsoft/TypeScript/wiki/Performance).

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#diagnostics' aria-label="Jump to compiler option info for diagnostics" ><code>diagnostics</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='generateCpuProfile-config'><a aria-label="Link to the compiler option: generateCpuProfile" id='generateCpuProfile' href='#generateCpuProfile' name='generateCpuProfile' aria-labelledby="generateCpuProfile-config">#</a> Generate CPU Profile - <code>generateCpuProfile</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This option gives you the chance to have TypeScript emit a v8 CPU profile during the compiler run. The CPU profile can provide insight into why your builds may be slow.

This option can only be used from the CLI via: `--generateCpuProfile tsc-output.cpuprofile`.

```sh
npm run tsc --generateCpuProfile tsc-output.cpuprofile
```

This file can be opened in a chromium based browser like Chrome or Edge Developer in [the CPU profiler](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/js-execution) section.
You can learn more about understanding the compilers performance in the [TypeScript wiki section on performance](https://github.com/microsoft/TypeScript/wiki/Performance).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>profile.cpuprofile</code></p>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.7" href="/docs/handbook/release-notes/typescript-3-7.html">3.7</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='listEmittedFiles-config'><a aria-label="Link to the compiler option: listEmittedFiles" id='listEmittedFiles' href='#listEmittedFiles' name='listEmittedFiles' aria-labelledby="listEmittedFiles-config">#</a> List Emitted Files - <code>listEmittedFiles</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Print names of generated files part of the compilation to the terminal.

This flag is useful in two cases:

- You want to transpile TypeScript as a part of a build chain in the terminal where the filenames are processed in the next command.
- You are not sure that TypeScript has included a file you expected, as a part of debugging the [file inclusion settings](#Project_Files_0).

For example:

```
example
├── index.ts
├── package.json
└── tsconfig.json
```

With:

```json tsconfig
{
  "compilerOptions": {
    "declaration": true,
    "listFiles": true
  }
}
```

Would echo paths like:

```
$ npm run tsc

path/to/example/index.js
path/to/example/index.d.ts
```

Normally, TypeScript would return silently on success.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='listFiles-config'><a aria-label="Link to the compiler option: listFiles" id='listFiles' href='#listFiles' name='listFiles' aria-labelledby="listFiles-config">#</a> List Files - <code>listFiles</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Print names of files part of the compilation. This is useful when you are not sure that TypeScript has
included a file you expected.

For example:

```
example
├── index.ts
├── package.json
└── tsconfig.json
```

With:

```json tsconfig
{
  "compilerOptions": {
    "listFiles": true
  }
}
```

Would echo paths like:

```
$ npm run tsc
path/to/example/node_modules/typescript/lib/lib.d.ts
path/to/example/node_modules/typescript/lib/lib.es5.d.ts
path/to/example/node_modules/typescript/lib/lib.dom.d.ts
path/to/example/node_modules/typescript/lib/lib.webworker.importscripts.d.ts
path/to/example/node_modules/typescript/lib/lib.scripthost.d.ts
path/to/example/index.ts
```

Note if using TypeScript 4.2, prefer [`explainFiles`](#explainFiles) which offers an explanation of why a file was added too.

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#explainFiles' aria-label="Jump to compiler option info for explainFiles" ><code>explainFiles</code></a></p>
</li></ul></li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='traceResolution-config'><a aria-label="Link to the compiler option: traceResolution" id='traceResolution' href='#traceResolution' name='traceResolution' aria-labelledby="traceResolution-config">#</a> Trace Resolution - <code>traceResolution</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When you are trying to debug why a module isn't being included.
You can set `traceResolution` to `true` to have TypeScript print information about its resolution process for each processed file.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<div class='category'>
<h2 id='Projects_6255' ><a href='#Projects_6255' name='Projects_6255' aria-label="Link to the section Projects" aria-labelledby='Projects_6255'>#</a>Projects</h2>

</div>
<section class='compiler-option'>
<h3 id='composite-config'><a aria-label="Link to the compiler option: composite" id='composite' href='#composite' name='composite' aria-labelledby="composite-config">#</a> Composite - <code>composite</code></h3>
<div class='compiler-content'>
<div class='markdown'>

The `composite` option enforces certain constraints which make it possible for build tools (including TypeScript
itself, under `--build` mode) to quickly determine if a project has been built yet.

When this setting is on:

- The [`rootDir`](#rootDir) setting, if not explicitly set, defaults to the directory containing the `tsconfig.json` file.

- All implementation files must be matched by an [`include`](#include) pattern or listed in the [`files`](#files) array. If this constraint is violated, `tsc` will inform you which files weren't specified.

- [`declaration`](#declaration) defaults to `true`

You can find documentation on TypeScript projects in [the handbook](https://www.typescriptlang.org/docs/handbook/project-references.html).

</div>
<ul class='compiler-option-md'><li><span>Related:</span><ul><li><p><a href='#incremental' aria-label="Jump to compiler option info for incremental" ><code>incremental</code></a></p>
</li><li><p><a href='#tsBuildInfoFile' aria-label="Jump to compiler option info for tsBuildInfoFile" ><code>tsBuildInfoFile</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.0" href="/docs/handbook/release-notes/typescript-3-0.html">3.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='disableReferencedProjectLoad-config'><a aria-label="Link to the compiler option: disableReferencedProjectLoad" id='disableReferencedProjectLoad' href='#disableReferencedProjectLoad' name='disableReferencedProjectLoad' aria-labelledby="disableReferencedProjectLoad-config">#</a> Disable Referenced Project Load - <code>disableReferencedProjectLoad</code></h3>
<div class='compiler-content'>
<div class='markdown'>

In multi-project TypeScript programs, TypeScript will load all of the available projects into memory in order to provide accurate results for editor responses which require a full knowledge graph like 'Find All References'.

If your project is large, you can use the flag `disableReferencedProjectLoad` to disable the automatic loading of all projects. Instead, projects are loaded dynamically as you open files through your editor.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.0" href="/docs/handbook/release-notes/typescript-4-0.html">4.0</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='disableSolutionSearching-config'><a aria-label="Link to the compiler option: disableSolutionSearching" id='disableSolutionSearching' href='#disableSolutionSearching' name='disableSolutionSearching' aria-labelledby="disableSolutionSearching-config">#</a> Disable Solution Searching - <code>disableSolutionSearching</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When working with [composite TypeScript projects](/docs/handbook/project-references.html), this option provides a way to declare that you do not want a project to be included when using features like _find all references_ or _jump to definition_ in an editor.

This flag is something you can use to increase responsiveness in large composite projects.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.8" href="/docs/handbook/release-notes/typescript-3-8.html">3.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='disableSourceOfProjectReferenceRedirect-config'><a aria-label="Link to the compiler option: disableSourceOfProjectReferenceRedirect" id='disableSourceOfProjectReferenceRedirect' href='#disableSourceOfProjectReferenceRedirect' name='disableSourceOfProjectReferenceRedirect' aria-labelledby="disableSourceOfProjectReferenceRedirect-config">#</a> Disable Source Project Reference Redirect - <code>disableSourceOfProjectReferenceRedirect</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When working with [composite TypeScript projects](/docs/handbook/project-references.html), this option provides a way to go [back to the pre-3.7](/docs/handbook/release-notes/typescript-3-7.html#build-free-editing-with-project-references) behavior where d.ts files were used to as the boundaries between modules.
In 3.7 the source of truth is now your TypeScript files.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.7" href="/docs/handbook/release-notes/typescript-3-7.html">3.7</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='incremental-config'><a aria-label="Link to the compiler option: incremental" id='incremental' href='#incremental' name='incremental' aria-labelledby="incremental-config">#</a> Incremental - <code>incremental</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Tells TypeScript to save information about the project graph from the last compilation to files stored on disk. This
creates a series of `.tsbuildinfo` files in the same folder as your compilation output. They are not used by your
JavaScript at runtime and can be safely deleted. You can read more about the flag in the [3.4 release notes](/docs/handbook/release-notes/typescript-3-4.html#faster-subsequent-builds-with-the---incremental-flag).

To control which folders you want to the files to be built to, use the config option [`tsBuildInfoFile`](#tsBuildInfoFile).

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code> if <a href="#composite"><code>composite</code></a>; <code>false</code> otherwise.</p>
</li>
<li><span>Related:</span><ul><li><p><a href='#composite' aria-label="Jump to compiler option info for composite" ><code>composite</code></a></p>
</li><li><p><a href='#tsBuildInfoFile' aria-label="Jump to compiler option info for tsBuildInfoFile" ><code>tsBuildInfoFile</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.4" href="/docs/handbook/release-notes/typescript-3-4.html">3.4</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='tsBuildInfoFile-config'><a aria-label="Link to the compiler option: tsBuildInfoFile" id='tsBuildInfoFile' href='#tsBuildInfoFile' name='tsBuildInfoFile' aria-labelledby="tsBuildInfoFile-config">#</a> TS Build Info File - <code>tsBuildInfoFile</code></h3>
<div class='compiler-content'>
<div class='markdown'>

This setting lets you specify a file for storing incremental compilation information as a part of composite projects which enables faster
building of larger TypeScript codebases. You can read more about composite projects [in the handbook](/docs/handbook/project-references.html).

The default depends on a combination of other settings:

- If `outFile` is set, the default is `<outFile>.tsbuildinfo`.
- If `rootDir` and `outDir` are set, then the file is `<outDir>/<relative path to config from rootDir>/<config name>.tsbuildinfo`
  For example, if `rootDir` is `src`, `outDir` is `dest`, and the config is
  `./tsconfig.json`, then the default is `./tsconfig.tsbuildinfo`
  as the relative path from `src/` to `./tsconfig.json` is `../`.
- If `outDir` is set, then the default is `<outDir>/<config name>.tsbuildInfo`
- Otherwise, the default is `<config name>.tsbuildInfo`

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>.tsbuildinfo</code></p>
</li>
<li><span>Related:</span><ul><li><p><a href='#incremental' aria-label="Jump to compiler option info for incremental" ><code>incremental</code></a></p>
</li><li><p><a href='#composite' aria-label="Jump to compiler option info for composite" ><code>composite</code></a></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.4" href="/docs/handbook/release-notes/typescript-3-4.html">3.4</a></p>
</li></ul>
</div></section>
<div class='category'>
<h2 id='Output_Formatting_6256' ><a href='#Output_Formatting_6256' name='Output_Formatting_6256' aria-label="Link to the section Output Formatting" aria-labelledby='Output_Formatting_6256'>#</a>Output Formatting</h2>

</div>
<section class='compiler-option'>
<h3 id='noErrorTruncation-config'><a aria-label="Link to the compiler option: noErrorTruncation" id='noErrorTruncation' href='#noErrorTruncation' name='noErrorTruncation' aria-labelledby="noErrorTruncation-config">#</a> No Error Truncation - <code>noErrorTruncation</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Do not truncate error messages.

With `false`, the default.

```ts twoslash
// @errors: 2322 2454
var x: {
  propertyWithAnExceedinglyLongName1: string;
  propertyWithAnExceedinglyLongName2: string;
  propertyWithAnExceedinglyLongName3: string;
  propertyWithAnExceedinglyLongName4: string;
  propertyWithAnExceedinglyLongName5: string;
  propertyWithAnExceedinglyLongName6: string;
  propertyWithAnExceedinglyLongName7: string;
  propertyWithAnExceedinglyLongName8: string;
};

// String representation of type of 'x' should be truncated in error message
var s: string = x;
```

With `true`

```ts twoslash
// @errors: 2322 2454
// @noErrorTruncation: true
var x: {
  propertyWithAnExceedinglyLongName1: string;
  propertyWithAnExceedinglyLongName2: string;
  propertyWithAnExceedinglyLongName3: string;
  propertyWithAnExceedinglyLongName4: string;
  propertyWithAnExceedinglyLongName5: string;
  propertyWithAnExceedinglyLongName6: string;
  propertyWithAnExceedinglyLongName7: string;
  propertyWithAnExceedinglyLongName8: string;
};

// String representation of type of 'x' should be truncated in error message
var s: string = x;
```

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='preserveWatchOutput-config'><a aria-label="Link to the compiler option: preserveWatchOutput" id='preserveWatchOutput' href='#preserveWatchOutput' name='preserveWatchOutput' aria-labelledby="preserveWatchOutput-config">#</a> Preserve Watch Output - <code>preserveWatchOutput</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Whether to keep outdated console output in watch mode instead of clearing the screen every time a change happened.

</div>
<ul class='compiler-option-md'><li><span>Internal</span>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='pretty-config'><a aria-label="Link to the compiler option: pretty" id='pretty' href='#pretty' name='pretty' aria-labelledby="pretty-config">#</a> Pretty - <code>pretty</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Stylize errors and messages using color and context, this is on by default &mdash; offers you a chance to have less terse,
single colored messages from the compiler.

</div>
<ul class='compiler-option-md'><li><span>Default:</span><p><code>true</code></p>
</li></ul>
</div></section>
<div class='category'>
<h2 id='Completeness_6257' ><a href='#Completeness_6257' name='Completeness_6257' aria-label="Link to the section Completeness" aria-labelledby='Completeness_6257'>#</a>Completeness</h2>

</div>
<section class='compiler-option'>
<h3 id='skipDefaultLibCheck-config'><a aria-label="Link to the compiler option: skipDefaultLibCheck" id='skipDefaultLibCheck' href='#skipDefaultLibCheck' name='skipDefaultLibCheck' aria-labelledby="skipDefaultLibCheck-config">#</a> Skip Default Lib Check - <code>skipDefaultLibCheck</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Use [`skipLibCheck`](#skipLibCheck) instead. Skip type checking of default library declaration files.

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='skipLibCheck-config'><a aria-label="Link to the compiler option: skipLibCheck" id='skipLibCheck' href='#skipLibCheck' name='skipLibCheck' aria-labelledby="skipLibCheck-config">#</a> Skip Lib Check - <code>skipLibCheck</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Skip type checking of declaration files.

This can save time during compilation at the expense of type-system accuracy. For example, two libraries could
define two copies of the same `type` in an inconsistent way. Rather than doing a full check of all `d.ts` files, TypeScript
will type check the code you specifically refer to in your app's source code.

A common case where you might think to use `skipLibCheck` is when there are two copies of a library's types in
your `node_modules`. In these cases, you should consider using a feature like [yarn's resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/)
to ensure there is only one copy of that dependency in your tree or investigate how to ensure there is
only one copy by understanding the dependency resolution to fix the issue without additional tooling.

Another possibility is when you are migrating between TypeScript releases and the changes cause breakages in node_modules and the JS standard libraries which you do not want to deal with during the TypeScript update.

Note, that if these issues come from the TypeScript standard library you can replace the library using [TypeScript 4.5's lib replacement](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#supporting-lib-from-node_modules) technique.

</div>
<ul class='compiler-option-md'><li><span>Recommended</span>
</li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 2.0" href="/docs/handbook/release-notes/typescript-2-0.html">2.0</a></p>
</li></ul>
</div></section>
<div class='category'>
<h2 id='Command_line_Options_6171' ><a href='#Command_line_Options_6171' name='Command_line_Options_6171' aria-label="Link to the section Command Line" aria-labelledby='Command_line_Options_6171'>#</a>Command Line</h2>

</div>
<div class='category'>
<h2 id='Watch_and_Build_Modes_6250' ><a href='#Watch_and_Build_Modes_6250' name='Watch_and_Build_Modes_6250' aria-label="Link to the section Watch Options" aria-labelledby='Watch_and_Build_Modes_6250'>#</a>Watch Options</h2>

TypeScript 3.8 shipped a new strategy for watching directories, which is crucial for efficiently picking up changes to `node_modules`.

On operating systems like Linux, TypeScript installs directory watchers (as opposed to file watchers) on `node_modules` and many of its subdirectories to detect changes in dependencies.
This is because the number of available file watchers is often eclipsed by the number of files in `node_modules`, whereas there are way fewer directories to track.

Because every project might work better under different strategies, and this new approach might not work well for your workflows, TypeScript 3.8 introduces a new `watchOptions` field which allows users to tell the compiler/language service which watching strategies should be used to keep track of files and directories.

</div>
<section class='compiler-option'>
<h3 id='assumeChangesOnlyAffectDirectDependencies-config'><a aria-label="Link to the compiler option: assumeChangesOnlyAffectDirectDependencies" id='assumeChangesOnlyAffectDirectDependencies' href='#assumeChangesOnlyAffectDirectDependencies' name='assumeChangesOnlyAffectDirectDependencies' aria-labelledby="assumeChangesOnlyAffectDirectDependencies-config">#</a> Assume Changes Only Affect Direct Dependencies - <code>assumeChangesOnlyAffectDirectDependencies</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When this option is enabled, TypeScript will avoid rechecking/rebuilding all truly possibly-affected files, and only recheck/rebuild files that have changed as well as files that directly import them.

This can be considered a 'fast & loose' implementation of the watching algorithm, which can drastically reduce incremental rebuild times at the expense of having to run the full build occasionally to get all compiler error messages.

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.8" href="/docs/handbook/release-notes/typescript-3-8.html">3.8</a></p>
</li></ul>
</div></section>
</div>
</article></div>
<div class="tsconfig raised main-content-block markdown"><article id='watchOptions'>

## Watch Options

You can configure the how TypeScript `--watch` works. This section is mainly for handling case where `fs.watch` and `fs.watchFile` have additional constraints like on Linux. You can read more at [Configuring Watch](/docs/handbook/configuring-watch.html).

<div>
<section class='compiler-option'>
<h3 id='watch-watchFile-config'><a aria-label="Link to the compiler option: watchFile" id='watch-watchFile' href='#watch-watchFile' name='watch-watchFile' aria-labelledby="watch-watchFile-config">#</a> Watch File - <code>watchFile</code></h3>
<div class='compiler-content'>
<div class='markdown'>

The strategy for how individual files are watched.

- `fixedPollingInterval`: Check every file for changes several times a second at a fixed interval.
- `priorityPollingInterval`: Check every file for changes several times a second, but use heuristics to check certain types of files less frequently than others.
- `dynamicPriorityPolling`: Use a dynamic queue where less-frequently modified files will be checked less often.
- `useFsEvents` (the default): Attempt to use the operating system/file system's native events for file changes.
- `useFsEventsOnParentDirectory`: Attempt to use the operating system/file system's native events to listen for changes on a file's parent directory

</div>
<ul class='compiler-option-md'><li><span>Allowed:</span><ul><li><p><code>fixedpollinginterval</code></p>
</li><li><p><code>prioritypollinginterval</code></p>
</li><li><p><code>dynamicprioritypolling</code></p>
</li><li><p><code>fixedchunksizepolling</code></p>
</li><li><p><code>usefsevents</code></p>
</li><li><p><code>usefseventsonparentdirectory</code></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.8" href="/docs/handbook/release-notes/typescript-3-8.html">3.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='watch-watchDirectory-config'><a aria-label="Link to the compiler option: watchDirectory" id='watch-watchDirectory' href='#watch-watchDirectory' name='watch-watchDirectory' aria-labelledby="watch-watchDirectory-config">#</a> Watch Directory - <code>watchDirectory</code></h3>
<div class='compiler-content'>
<div class='markdown'>

The strategy for how entire directory trees are watched under systems that lack recursive file-watching functionality.

- `fixedPollingInterval`: Check every directory for changes several times a second at a fixed interval.
- `dynamicPriorityPolling`: Use a dynamic queue where less-frequently modified directories will be checked less often.
- `useFsEvents` (the default): Attempt to use the operating system/file system's native events for directory changes.

</div>
<ul class='compiler-option-md'><li><span>Allowed:</span><ul><li><p><code>usefsevents</code></p>
</li><li><p><code>fixedpollinginterval</code></p>
</li><li><p><code>dynamicprioritypolling</code></p>
</li><li><p><code>fixedchunksizepolling</code></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.8" href="/docs/handbook/release-notes/typescript-3-8.html">3.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='watch-fallbackPolling-config'><a aria-label="Link to the compiler option: fallbackPolling" id='watch-fallbackPolling' href='#watch-fallbackPolling' name='watch-fallbackPolling' aria-labelledby="watch-fallbackPolling-config">#</a> Fallback Polling - <code>fallbackPolling</code></h3>
<div class='compiler-content'>
<div class='markdown'>

When using file system events, this option specifies the polling strategy that gets used when the system runs out of native file watchers and/or doesn't support native file watchers.

- `fixedPollingInterval`: Check every file for changes several times a second at a fixed interval.
- `priorityPollingInterval`: Check every file for changes several times a second, but use heuristics to check certain types of files less frequently than others.
- `dynamicPriorityPolling`: Use a dynamic queue where less-frequently modified files will be checked less often.
- `synchronousWatchDirectory`: Disable deferred watching on directories. Deferred watching is useful when lots of file changes might occur at once (e.g. a change in `node_modules` from running `npm install`), but you might want to disable it with this flag for some less-common setups.

</div>
<ul class='compiler-option-md'><li><span>Allowed:</span><ul><li><p><code>fixedinterval</code></p>
</li><li><p><code>priorityinterval</code></p>
</li><li><p><code>dynamicpriority</code></p>
</li><li><p><code>fixedchunksize</code></p>
</li></ul></li>
<li><span>Released:</span><p><a aria-label="Release notes for TypeScript 3.8" href="/docs/handbook/release-notes/typescript-3-8.html">3.8</a></p>
</li></ul>
</div></section>
<section class='compiler-option'>
<h3 id='watch-synchronousWatchDirectory-config'><a aria-label="Link to the compiler option: synchronousWatchDirectory" id='watch-synchronousWatchDirectory' href='#watch-synchronousWatchDirectory' name='watch-synchronousWatchDirectory' aria-labelledby="watch-synchronousWatchDirectory-config">#</a> Synchronous Watch Directory - <code>synchronousWatchDirectory</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively. Instead of giving a small timeout to allow for potentially multiple edits to occur on a file.

```json tsconfig
{
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}
```

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='watch-excludeDirectories-config'><a aria-label="Link to the compiler option: excludeDirectories" id='watch-excludeDirectories' href='#watch-excludeDirectories' name='watch-excludeDirectories' aria-labelledby="watch-excludeDirectories-config">#</a> Exclude Directories - <code>excludeDirectories</code></h3>
<div class='compiler-content'>
<div class='markdown'>

You can use [`excludeFiles`](#excludeFiles) to drastically reduce the number of files which are watched during `--watch`. This can be a useful way to reduce the number of open file which TypeScript tracks on Linux.

```json tsconfig
{
  "watchOptions": {
    "excludeDirectories": ["**/node_modules", "_build", "temp/*"]
  }
}
```

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='watch-excludeFiles-config'><a aria-label="Link to the compiler option: excludeFiles" id='watch-excludeFiles' href='#watch-excludeFiles' name='watch-excludeFiles' aria-labelledby="watch-excludeFiles-config">#</a> Exclude Files - <code>excludeFiles</code></h3>
<div class='compiler-content'>
<div class='markdown'>

You can use `excludeFiles` to remove a set of specific files from the files which are watched.

```json tsconfig
{
  "watchOptions": {
    "excludeFiles": ["temp/file.ts"]
  }
}
```

</div>
<ul class='compiler-option-md'></ul>
</div></section>
</div>
</article></div>
<div class="tsconfig raised main-content-block markdown"><article id='typeAcquisition'>

## Type Acquisition

Type Acquisition is only important for JavaScript projects. In TypeScript projects you need to include the types in your projects explicitly. However, for JavaScript projects, the TypeScript tooling will download types for your modules in the background and outside of your node_modules folder.

<div>
<section class='compiler-option'>
<h3 id='type-enable-config'><a aria-label="Link to the compiler option: enable" id='type-enable' href='#type-enable' name='type-enable' aria-labelledby="type-enable-config">#</a> Enable - <code>enable</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Disables automatic type acquisition in JavaScript projects:

```json
{
  "typeAcquisition": {
    "enable": false
  }
}
```

</div>
<ul class='compiler-option-md'></ul>
</div></section>
<section class='compiler-option'>
<h3 id='type-include-config'><a aria-label="Link to the compiler option: include" id='type-include' href='#type-include' name='type-include' aria-labelledby="type-include-config">#</a> Include - <code>include</code></h3>
<div class='compiler-content'>
<div class='markdown'>

If you have a JavaScript project where TypeScript needs additional guidance to understand global dependencies, or have disabled the built-in inference via [`disableFilenameBasedTypeAcquisition`](#disableFilenameBasedTypeAcquisition).

You can use `include` to specify which types should be used from DefinitelyTyped:

```json
{
  "typeAcquisition": {
    "include": ["jquery"]
  }
}
```

</div>
</div></section>
<section class='compiler-option'>
<h3 id='type-exclude-config'><a aria-label="Link to the compiler option: exclude" id='type-exclude' href='#type-exclude' name='type-exclude' aria-labelledby="type-exclude-config">#</a> Exclude - <code>exclude</code></h3>
<div class='compiler-content'>
<div class='markdown'>

Offers a config for disabling the type-acquisition for a certain module in JavaScript projects. This can be useful for projects which include other libraries in testing infrastructure which aren't needed in the main application.

```json
{
  "typeAcquisition": {
    "exclude": ["jest", "mocha"]
  }
}
```

</div>
</div></section>
<section class='compiler-option'>
<h3 id='type-disableFilenameBasedTypeAcquisition-config'><a aria-label="Link to the compiler option: disableFilenameBasedTypeAcquisition" id='type-disableFilenameBasedTypeAcquisition' href='#type-disableFilenameBasedTypeAcquisition' name='type-disableFilenameBasedTypeAcquisition' aria-labelledby="type-disableFilenameBasedTypeAcquisition-config">#</a> Disable Filename Based Type Acquisition - <code>disableFilenameBasedTypeAcquisition</code></h3>
<div class='compiler-content'>
<div class='markdown'>

TypeScript's type acquisition can infer what types should be added based on filenames in a project. This means that having a file like `jquery.js` in your project would automatically download the types for JQuery from DefinitelyTyped.

You can disable this via `disableFilenameBasedTypeAcquisition`.

```json
{
  "typeAcquisition": {
    "disableFilenameBasedTypeAcquisition": true
  }
}
```

</div>
<ul class='compiler-option-md'><li><span>Released:</span><p><a aria-label="Release notes for TypeScript 4.1" href="/docs/handbook/release-notes/typescript-4-1.html">4.1</a></p>
</li></ul>
</div></section>
</div>
</article></div>
