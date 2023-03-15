[npm]: https://img.shields.io/npm/v/str-async-replace
[npm-url]: https://www.npmjs.com/package/str-async-replace
[size]: https://packagephobia.now.sh/badge?p=str-async-replace
[size-url]: https://packagephobia.now.sh/result?p=str-async-replace

# str-async-replace: AsyncReplace📚 [![npm][npm]][npm-url] [![size][size]][size-url]

The `AsyncReplace` class provides methods to replace substrings within a string asynchronously, using regular expressions or plain strings. It has the following methods:

- `constructor(str: string)`: Creates a new `AsyncReplace` instance with the given string.

- `async replace(searchValue: string | RegExp, replaceValue: string | Function | object): AsyncReplace`: Replaces the `searchValue` in the string with the `replaceValue`, returning a new `AsyncReplace` instance with the replaced string. The optional `replaceLimit` parameter can be used to limit the number of replacements that occur.

- `async replaceAll(searchValue: string | RegExp, replaceValue: string | Function | object): AsyncReplace`: Replaces all occurrences of the `searchValue` in the string with the `replaceValue`, returning a new `AsyncReplace` instance with the replaced string.

- `toString(): string`: Returns the original string that the `AsyncReplace` instance was created with.

## Installation

This function can be used in both Node.js and browser environments. You can install it using npm or yarn:

```bash
npm install str-async-replace
# or
yarn add str-async-replace
```

### Usage

```js
const AsyncReplace = require("str-async-replace");

const str = "Hello world";
const asyncReplace = new AsyncReplace(str);
const newStr = await asyncReplace.replace("world", "there");
console.log(newStr.toString()); // 'Hello there'
```

## Error Handling

The `AsyncReplace` class throws `TypeError` for the following cases:

- `str` is null or undefined.
- `str` is not a string.
- `str` is an empty string.
- `searchValue` is null or undefined.
- `searchValue` is not a string or regular expression.
- `replaceLimit` is not a non-negative integer, null, or undefined.
- `replaceValue` is null, undefined, an empty string, or not a string, object with a `toString` method, or an async function.
- `searchValue` is not a valid regular expression.
- `replaceValue` is a function and its first two parameters are not a string and a number.

## Notes

`AsyncReplace` instances are immutable. Each method call returns a new instance with the replaced string.
