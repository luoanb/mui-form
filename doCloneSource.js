// const monoBin = require("mono-bin");
const path = require("path");
const shell = require("shelljs");
const fs = require("fs");
const doCloneSource = (from, to) => {
  const workcd = path.join(from);
  shell.cd(workcd);

  const dirs = shell.ls().filter((file) => {
    return fs.lstatSync(path.join(workcd, file)).isDirectory();
  });

  // console.log("dirs",dirs);

  dirs.forEach((dir) => {
    // 创建文件夹
    shell.cd(path.join(to));
    shell.mkdir(dir);

    shell.cd(path.join(workcd, dir));
    shell.cp("-R", ".git", path.join(to, dir));
    shell.cp("-R", ".vscode", path.join(to, dir));
    shell.cp("-R", ".github", path.join(to, dir));
  });
};

doCloneSource("C:\\workSpace", "D:\\个人\\All项目源码");
