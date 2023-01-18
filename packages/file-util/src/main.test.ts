import { describe, it, expect } from "vitest";
import { data } from "./main";

describe("data", () => {
  it("data.name", async() => {
    expect(data.name).equals("小明");
  });
});
