import { describe, it, expect } from "vitest";
import { data2CsvString, csvString2Data } from "./main";

describe("data2CsvString & csvString2Data", () => {
  it("do", async () => {
    let data = [
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true },
      { name: "小明", age: 18, sex: "男", bool: true }
    ];
    let newData = csvString2Data(data2CsvString(data));
    console.log("data2CsvString(data)", data2CsvString(data));
    console.log("newData", newData);
    expect(newData?.[0].name).equals("小明");
  });
});
