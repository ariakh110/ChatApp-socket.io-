let expect = require("expect");
let { generateMessage, generateLocationMessage } = require("./message");

describe("generate Messasge", () => {
  it("should generate correct messages object", () => {
    let from = "cj",
      text = "hello world";
    message = generateMessage(from, text);
    expect(typeof message.createAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});
describe("Generate Location message", () => {
  it("should generate correct location object", () => {
    let from = "claire",
      lat = 15,
      lng = 56;
      url = `https://www.google.com/maps?q=${lat}, ${lng}`,
      message = generateLocationMessage(from, lat, lng);
      expect(typeof message.createAt).toBe("number");
      expect(message).toMatchObject({ from, url });
  });
});
