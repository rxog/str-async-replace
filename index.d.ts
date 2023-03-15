declare class AsyncReplace {
  constructor(str: string);

  replace(
    searchValue: string | RegExp,
    replaceValue:
      | string
      | ((...args: any[]) => Promise<string>)
      | { toString: () => string },
    replaceLimit?: number
  ): Promise<AsyncReplace>;

  replaceAll(
    searchValue: string | RegExp,
    replaceValue:
      | string
      | ((...args: any[]) => Promise<string>)
      | { toString: () => string }
  ): Promise<AsyncReplace>;

  toString(): string;
}

export default AsyncReplace;
