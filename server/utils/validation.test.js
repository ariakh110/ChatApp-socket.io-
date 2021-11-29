const expect = require("expect");
const { isRealString } = require("./isRealString");

describe("ia Real String", () => {
  it("should reject non-strings value", () => {
    let res = isRealString(65);
    expect(res).toBe(false);
  });
  it("should reject strings with only spacecs", () => {
    let res = isRealString("            ");
    expect(res).toBe(false);
  });
  it("should allow string with non-strings chars", () => {
    let res = isRealString("       wed          ");
    expect(res).toBe(true);
  });
  it("should allow string with non-strings chars");
});
