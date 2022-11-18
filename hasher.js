const { hashSync } = require("bcryptjs");

console.log(hashSync("1234", 11));