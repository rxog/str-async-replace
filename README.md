[npm]: https://img.shields.io/npm/v/str-async-replace
[npm-url]: https://www.npmjs.com/package/str-async-replace
[size]: https://packagephobia.now.sh/badge?p=str-async-replace
[size-url]: https://packagephobia.now.sh/result?p=str-async-replace

# str-async-replace: AsyncReplace📚 [![npm][npm]][npm-url] [![size][size]][size-url]

The `AsyncReplace` class provides methods to replace substrings within a string asynchronously, using regular expressions or plain strings. It has the following methods:

- `constructor(inputString: string)`: Creates a new `AsyncReplace` instance with the given string.

- `async replace(searchValue: string | RegExp, replaceValue: string | Function | object, replaceLimit?: number): AsyncReplace`: Replaces the first occurrence of the `searchValue` in the string with the `replaceValue`, returning a new `AsyncReplace` instance with the replaced string. The optional `replaceLimit` parameter can be used to limit the number of replacements that occur.

- `async replaceAll(searchValue: string | RegExp, replaceValue: string | Function | object): AsyncReplace`: Replaces all occurrences of the `searchValue` in the string with the `replaceValue`, returning a new `AsyncReplace` instance with the replaced string.

- `toString(): string`: Returns the original string that the `AsyncReplace` instance was created with.

## Installation

This package can be used in both Node.js and browser environments. You can install it using npm or yarn:

```bash
npm install str-async-replace
# or
yarn add str-async-replace
```

## Usage

```js
const AsyncReplace = require("str-async-replace");

const inputString = "Hello world";
const asyncReplace = new AsyncReplace(inputString);

// Replacing the first occurrence of a substring
const newStr = await asyncReplace.replace("world", "there");
console.log(newStr.toString()); // 'Hello there'

// Replacing all occurrences of a substring using a regular expression
const newStr2 = await asyncReplace.replaceAll(/l/, "L");
console.log(newStr2.toString()); // 'HeLLo worLd'
```

The `replace` method replaces only the first occurrence of the `searchValue` with the `replaceValue`. If you want to replace all occurrences of the `searchValue`, use the replaceAll method instead. Both methods return a new `AsyncReplace` instance with the replaced string.

## Error Handling

The `AsyncReplace` class throws `TypeError` for the following cases:

- `inputString` is null or undefined.
- `inputString` is not a string.
- `inputString` is an empty string.
- `searchValue` is null or undefined.
- `searchValue` is not a string or regular expression.
- `replaceLimit` is not a positive integer greater than zero.
- `replaceValue` is null, undefined, an empty string, or not a string, object with a `toString` method, or an async function.
- `searchValue` is not a valid regular expression.
- `replaceValue` is a function and its first two parameters are not a string and a number.

## Notes

`AsyncReplace` instances are immutable. Each method call returns a new instance with the replaced string.
