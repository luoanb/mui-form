const monoBin = require("mono-bin");
const path = require("path");
monoBin.setVersion(path.join(__dirname, "./pnpm-lock.yaml"));
