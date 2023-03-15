"use strict";

class AsyncReplace {
  constructor(str) {
    if (str === null || str === undefined) {
      throw new TypeError("str must not be null or undefined");
    }
    if (typeof str !== "string") {
      throw new TypeError("str must be a string");
    }
    if (str === "") {
      throw new TypeError("str cannot be an empty string");
    }
    this.str = str;
  }

  async replace(searchValue, replaceValue, replaceLimit = 1) {
    if (searchValue === null || searchValue === undefined) {
      throw new TypeError("searchValue must not be null or undefined");
    }
    if (typeof searchValue !== "string" && !(searchValue instanceof RegExp)) {
      throw new TypeError("searchValue must be a string or regular expression");
    }
    if (
      !Number.isFinite(replaceLimit) ||
      replaceLimit < 0 ||
      replaceLimit % 1 !== 0
    ) {
      throw new TypeError(
        "replaceLimit must be a non-negative integer, null or undefined"
      );
    }
    if (
      replaceValue === null ||
      replaceValue === undefined ||
      replaceValue === "" ||
      (typeof replaceValue !== "string" &&
        typeof replaceValue !== "function" &&
        (typeof replaceValue !== "object" ||
          !(replaceValue instanceof Promise)) &&
        !(
          typeof replaceValue === "object" &&
          typeof replaceValue.toString === "function" &&
          replaceValue.constructor.name === "AsyncFunction"
        ))
    ) {
      throw new TypeError(
        "replaceValue must be a string, object with a toString method or async function"
      );
    }
    if (searchValue instanceof RegExp && searchValue.flags.includes("g")) {
      replaceLimit = Number.MAX_SAFE_INTEGER;
    }
    const str = this.str;
    let newStr = "";
    let lastIndex = 0;
    let count = 0;
    let regex;
    try {
      regex =
        typeof searchValue === "string"
          ? new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
          : new RegExp(
              searchValue.source,
              searchValue.flags !== null && searchValue.flags.includes("g")
                ? searchValue.flags
                : `${searchValue.flags || ""}g`
            );
    } catch (e) {
      throw new TypeError("searchValue must be a valid regular expression");
    }
    searchValue = regex.source;
    let match;
    while ((match = regex.exec(str)) !== null && count < replaceLimit) {
      let replacement;
      if (typeof replaceValue === "string") {
        replacement = replaceValue;
      } else if (typeof replaceValue === "function") {
        if (
          match.length < 1 ||
          typeof match[0] !== "string" ||
          typeof match.index !== "number"
        ) {
          throw new TypeError(
            "replacement function must take a string and a number as its first two parameters"
          );
        }
        replacement = await replaceValue(
          match[0],
          match.index,
          ...match.slice(1),
          str,
          count
        );
      } else if (replaceValue instanceof Promise) {
        replacement = await replaceValue;
      } else {
        replacement = replaceValue.toString();
      }
      newStr += str.slice(lastIndex, match.index);
      newStr += await replacement;
      lastIndex = regex.lastIndex;
      regex.lastIndex = lastIndex;
      count++;
    }
    if (lastIndex < str.length) {
      newStr += str.slice(lastIndex);
    }
    return new AsyncReplace(newStr);
  }

  async replaceAll(searchValue, replaceValue) {
    return this.replace(searchValue, replaceValue, Number.MAX_SAFE_INTEGER);
  }

  toString() {
    return this.str;
  }
}

// Exporta a função construtora no ambiente Node.js
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = AsyncReplace;
}

// Exporta a função construtora no ambiente do navegador
if (typeof window !== "undefined") {
  window.AsyncReplace = AsyncReplace;
}
