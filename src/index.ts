/**
 * A class that provides async string replacement methods
 */
class AsyncReplace {
  /**
   * Creates an instance of AsyncReplace.
   * @param {string} inputString - The input string to perform replacements on.
   * @throws {TypeError} - Throws an error if inputString is null, undefined, an empty string, or not a string.
   */
  private inputString: string;
  constructor(inputString: string) {
    if (inputString == null) {
      throw new TypeError("inputString must not be null or undefined");
    }
    if (typeof inputString !== "string") {
      throw new TypeError("inputString must be a string");
    }
    if (inputString === "") {
      throw new TypeError("inputString cannot be an empty string");
    }
    this.inputString = inputString;
  }

  /**
   * Asynchronously, replace one or more occurrences of the searchValue in the input string with the specified replaceValue.
   * @param {string|RegExp} searchValue - The value to search for in the input string. Can be a string or regular expression.
   * @param {string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise} replaceValue - The value to replace the search value with. Can be a string, function, object with a toString method, or an async function.
   * @param {number} [replaceLimit=1] - The maximum number of replacements to make. Must be a positive integer greater than zero.
   * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
   * @throws {TypeError} - Throws an error if searchValue is null, undefined, not a string or regular expression, or if replaceLimit is not a positive integer greater than zero.
   * Throws an error if replaceValue is null, an empty string, not a string, function, object with a toString method, or an async function.
   */
  async replace(
    searchValue: string | RegExp,
    replaceValue:
      | string
      | ((...args: any[]) => Promise<string>)
      | { toString: () => string },
    replaceLimit: number = 1
  ): Promise<AsyncReplace> {
    if (searchValue == null) {
      throw new TypeError("searchValue must not be null or undefined");
    }
    if (typeof searchValue !== "string" && !(searchValue instanceof RegExp)) {
      throw new TypeError("searchValue must be a string or regular expression");
    }
    if (
      !Number.isFinite(replaceLimit) ||
      replaceLimit <= 0 ||
      replaceLimit % 1 !== 0
    ) {
      throw new TypeError(
        "replaceLimit must be a positive integer greater than zero"
      );
    }
    if (
      replaceValue == null ||
      replaceValue === "" ||
      (typeof replaceValue !== "string" &&
        typeof replaceValue !== "function" &&
        (typeof replaceValue !== "object" ||
          !(replaceValue instanceof Promise) ||
          (typeof replaceValue === "object" &&
            typeof replaceValue.toString === "function" &&
            replaceValue.constructor.name === "AsyncFunction")))
    ) {
      throw new TypeError(
        "replaceValue must be a string, object with a toString method or async function"
      );
    }
    if (searchValue instanceof RegExp && searchValue.flags.includes("g")) {
      replaceLimit = Number.MAX_SAFE_INTEGER;
    }
    const inputString = this.inputString;
    let newStr: string = "";
    let lastIndex: number = 0;
    let currentReplacement: number = 0;
    let regex: RegExp;
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
    let match: RegExpExecArray | null;
    while (
      (match = regex.exec(inputString)) !== null &&
      currentReplacement < replaceLimit
    ) {
      currentReplacement++;
      const response = async (replaceValue: any): Promise<any> => {
        if (replaceValue instanceof Promise) {
          return await replaceValue.then(response);
        } else if (typeof replaceValue === "function") {
          if (
            match &&
            (typeof match[0] === "string" || typeof match.index === "number")
          ) {
            return replaceValue(
              match[0],
              match.index,
              ...match.slice(1),
              inputString,
              currentReplacement
            );
          }
        } else if (typeof replaceValue.toString === "function") {
          return replaceValue.toString();
        } else {
          return String(replaceValue);
        }
      };
      const replacement = await response(replaceValue);
      newStr += inputString.slice(lastIndex, match.index);
      newStr += replacement;
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < inputString.length) {
      newStr += inputString.slice(lastIndex);
    }
    return new AsyncReplace(newStr);
  }

  /**
   * Asynchronously, replace all instances of the searchValue in the input string with the replaceValue provided.
   * @param {string|RegExp} searchValue - The value to search for in the input string. Can be a string or regular expression.
   * @param {string|((substring: string, ...args: any[]) => string)|AsyncFunction|Promise} replaceValue - The value to replace the search value with. Can be a string, function, object with a toString method, or an async function.
   * @returns {Promise<AsyncReplace>} - A new AsyncReplace instance with the replacements made.
   * @throws {TypeError} - Throws an error if searchValue is null, undefined, not a string or regular expression.
   * Throws an error if replaceValue is null, an empty string, not a string, function, object with a toString method, or an async function.
   */
  async replaceAll(
    searchValue: string | RegExp,
    replaceValue:
      | string
      | ((...args: any[]) => Promise<string>)
      | { toString: () => string }
  ): Promise<AsyncReplace> {
    return this.replace(searchValue, replaceValue, Number.MAX_SAFE_INTEGER);
  }

  /**
   * Returns the input string used to create the instance of AsyncReplace.
   * @returns {string} - The input string.
   */
  toString(): string {
    return this.inputString;
  }
}

export = AsyncReplace;
