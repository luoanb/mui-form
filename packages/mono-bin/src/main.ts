import * as fs from "fs";
import * as YAML from "yamljs";
// import { doPromise } from "./utils";
// const rowSplit = "\n";

const ModuleManage = () => {
  const moduleMap = new Map<string, string>();
  /**
   * 获取模块真实版本 例如:5.3.1_3dsfpkpoyvuuxyfgdbpn4j4uzm
   * @param name
   * @returns 5.3.1
   */
  const getModuleKey = (name: string) => {
    const keys = name.split("_");
    if (keys[1]?.length == 26) {
      return keys[0];
    } else {
      return name;
    }
  };
  /**
   * 获取模块版本,存在重复是取第一个
   * @param name
   * @returns
   */
  const getModule = (name: string) => {
    const key = getModuleKey(name);
    if (!moduleMap.has(key)) {
      moduleMap.set(key, name);
      return name;
    }
    return moduleMap.get(key);
  };
  return {
    moduleMap,
    getModule,
  };
};

export const setVersion = async (url: string) => {
  // const fileBuffer = await doPromise<Buffer>((s, j) => {
  //   fs.readFile(url, (err, data) => {
  //     if (err) {
  //       j(err);
  //     } else {
  //       s(data);
  //     }
  //   });
  // });
  // console.log(fileBuffer.toString().split(rowSplit));
  const moduleManage = ModuleManage();
  const lockData = YAML.load(url);
  // console.log(lockData);
  const { importers, packages } = lockData;
  Object.keys(importers).forEach((key) => {
    console.log(key);
    const dependencies = importers[key]?.dependencies || [];
    const devDependencies = importers[key]?.devDependencies || [];
    Object.keys(dependencies).forEach((dkey) => {
      dependencies[dkey] = moduleManage.getModule(dependencies[dkey]);
    });
    Object.keys(devDependencies).forEach((dkey) => {
      devDependencies[dkey] = moduleManage.getModule(devDependencies[dkey]);
    });
    fs.writeFileSync(url, YAML.stringify(lockData, 10, 2));
  });
};
