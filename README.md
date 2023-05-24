[npm]: https://img.shields.io/npm/v/str-async-replace
[npm-url]: https://www.npmjs.com/package/str-async-replace
[size]: https://packagephobia.now.sh/badge?p=str-async-replace
[size-url]: https://packagephobia.now.sh/result?p=str-async-replace

# str-async-replace: AsyncReplace📚 [![npm][npm]][npm-url] [![size][size]][size-url]

The `AsyncReplace` class provides methods to replace substrings within a string asynchronously, using regular expressions or plain strings.

## Installation

This package can be used in both Node.js and browser environments. You can install it using npm or yarn:

```bash
npm install str-async-replace
# or
yarn add str-async-replace
```

Alternatively, you can include it in your project using a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/str-async-replace@1.1.1/dist/index.min.js"></script>
```

```html
<script src="https://unpkg.com/str-async-replace@1.1.1/dist/index.min.js"></script>
```

## Usage

To use `AsyncReplace`, you must first create an instance of the class by passing in the string you want to perform replacements on:

```js
const AsyncReplace = require("str-async-replace");

const inputString = "Hello, world!";
const replacer = new AsyncReplace(inputString);
```

Once you have an instance of AsyncReplace, you can call its various methods to perform replacements on the string.

### `replace(searchValue, replaceValue[, replaceLimit])`

This method asynchronously replaces one or more occurrences of the `searchValue` in the input string with the specified `replaceValue`.

```js
const result = await replacer.replace("world", "John");
console.log(result.toString()); // Output: Hello, John!
```

If you want to limit the number of replacements made, you can pass in a `replaceLimit` parameter:

```js
const result = await replacer.replace("o", "x", 2);
console.log(result.toString()); // Output: Hellx, wxrld!
```

### `replaceAll(searchValue, replaceValue)`

This method asynchronously replaces all instances of the `searchValue` in the input string with the `replaceValue` provided.

```js
const result = await replacer.replaceAll("l", "L");
console.log(result.toString()); // Output: HeLLo, worLd!
```

### `replaceMany(replacements)`

This method asynchronously replaces multiple substrings or regular expressions in the string with their corresponding replacements.

```js
const result = await replacer.replaceMany([
  { search: "Hello", replace: "Hi" },
  { search: /[A-Z]/g, replace: (match) => match.toLowerCase() },
]);
console.log(result.toString()); // Output: hi, world!
```

### `toString()`

This method returns the input string used to create the instance of AsyncReplace.

```js
console.log(replacer.toString()); // Output: Hello, world!
```

---

Here's an example that demonstrates how to use multiple methods of the AsyncReplace class at once:

```js
const AsyncReplace = require("str-async-replace");

const inputString = "Hello, world! This is a test string.";

// Create an instance of AsyncReplace with the input string
const asyncReplace = new AsyncReplace(inputString);

// Replace all occurrences of "l" with "L" and limit the replacements to 2
asyncReplace
  .replace("l", "L", 2)
  .then((result) => {
    console.log(result.toString()); // Output: HeLLo, world! This is a test string.
    return result;
  })
  // Replace all occurrences of "o" with "O" and "t" with "T" using replaceMany
  .then((result) => {
    return result.replaceMany([
      { search: /o/g, replace: "O" },
      { search: /t/g, replace: "T" },
    ]);
  })
  .then((result) => {
    console.log(result.toString()); // Output: HeLLO, wOrld! This is a TesT sTring.
    return result;
  })
  // Replace all occurrences of "e" with "E" using replaceAll
  .then((result) => {
    return result.replaceAll("e", "E");
  })
  .then((result) => {
    console.log(result.toString()); // Output: HELL0, wOrld! This is a TEsT sTring.
    return result;
  })
  .catch((err) => {
    console.error(err);
  });
```

This example first creates an instance of AsyncReplace with an input string, then replaces the first two occurrences of "l" with "L" using the replace method with a limit of 2. It then uses the replaceMany method to replace all occurrences of "o" with "O" and "t" with "T". Next, it uses the replaceAll method to replace all occurrences of "e" with "E". Finally, it outputs the resulting string to the console.

## Notes

`AsyncReplace` instances are immutable. Each method call returns a new instance with the replaced string.

## Error Handling

If any errors occur during the replacement process, AsyncReplace will throw a TypeError with a descriptive message. Make sure to wrap your method calls in a try-catch block to handle any potential errors:

```js
try {
  const result = await replacer.replace(null, "newString");
} catch (error) {
  console.error(error.message); // Output: searchValue must not be null or undefined
}
```

## License

This package is licensed under the [MIT License](LICENSE).
