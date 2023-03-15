const AsyncReplace = require("./index");

describe("AsyncReplace", () => {
  it("should throw an error when constructed with null or undefined str", () => {
    expect(() => new AsyncReplace(null)).toThrow(TypeError);
    expect(() => new AsyncReplace(undefined)).toThrow(TypeError);
  });

  it("should throw an error when constructed with empty string", () => {
    expect(() => new AsyncReplace("")).toThrow(TypeError);
  });

  it("should throw an error when replace is called with null or undefined searchValue", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    await expect(asyncReplace.replace(null, "foo")).rejects.toThrow(TypeError);
    await expect(asyncReplace.replace(undefined, "foo")).rejects.toThrow(
      TypeError
    );
  });

  it("should throw an error when replace is called with invalid searchValue", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    await expect(asyncReplace.replace({}, "foo")).rejects.toThrow(TypeError);
  });

  it("should throw an error when replace is called with invalid replaceLimit", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    await expect(asyncReplace.replace("o", "foo", -1)).rejects.toThrow(
      TypeError
    );
    await expect(asyncReplace.replace("o", "foo", 1.5)).rejects.toThrow(
      TypeError
    );
    await expect(asyncReplace.replace("o", "foo", NaN)).rejects.toThrow(
      TypeError
    );
  });

  it("should throw an error when replace is called with invalid replaceValue", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    await expect(asyncReplace.replace("o", null)).rejects.toThrow(TypeError);
    await expect(asyncReplace.replace("o", undefined)).rejects.toThrow(
      TypeError
    );
    await expect(asyncReplace.replace("o", 123)).rejects.toThrow(TypeError);
  });

  it("should replace all instances of a string with another string", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    const result = await asyncReplace.replaceAll("o", "a");
    expect(result.toString()).toBe("hella warld");
  });

  it("should replace a single instance of a string with another string", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    const result = await asyncReplace.replace("o", "a");
    expect(result.toString()).toBe("hella world");
  });

  it("should replace all instances of a regular expression with a string", async () => {
    const asyncReplace = new AsyncReplace("1234 5678");
    const result = await asyncReplace.replaceAll(/\d/, "x");
    expect(result.toString()).toBe("xxxx xxxx");
  });

  it("should replace four instances of a regular expression with a string", async () => {
    const asyncReplace = new AsyncReplace("1234 5678");
    const result = await asyncReplace.replace(/\d/, "x", 4);
    expect(result.toString()).toBe("xxxx 5678");
  });

  it("should replace all instances of a string with a function", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    const result = await asyncReplace.replaceAll("o", (match, index) => {
      return `${match}${index}`;
    });
    expect(result.toString()).toBe("hello4 wo7rld");
  });

  it("should replace a single instance of a string with a function", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    const replaced = await asyncReplace.replace("world", () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("you");
        }, 100);
      });
    });
    expect(replaced.toString()).toBe("hello you");
  });

  it("should replace multiple instances of a string with a function", async () => {
    const asyncReplace = new AsyncReplace("hello world hello world");
    const replaced = await asyncReplace.replaceAll("world", async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("you");
        }, 100);
      });
    });
    expect(replaced.toString()).toBe("hello you hello you");
  });

  it("should replace a single instance of a string with a promise", async () => {
    const asyncReplace = new AsyncReplace("hello world");
    const replaced = await asyncReplace.replace(
      "world",
      Promise.resolve("you")
    );
    expect(replaced.toString()).toBe("hello you");
  });

  it("should replace multiple instances of a string with a promise", async () => {
    const asyncReplace = new AsyncReplace("hello world hello world");
    const replaced = await asyncReplace.replaceAll(
      "world",
      Promise.resolve("you")
    );
    expect(replaced.toString()).toBe("hello you hello you");
  });
});
