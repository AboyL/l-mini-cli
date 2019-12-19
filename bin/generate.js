#!/usr/bin/env node

const program = require("commander");
const logger = require('../lib/logger')
const { generatePage, generateComponent } = require('../lib/fs-utils')
program
  .usage("<command> [options]")
  .command("g  <type> <path> ", "generate a new page or component")

program.parse(process.argv);
program.on("--help", () => {
  console.log(chalk.yellow("    # 使用模板创建page或者component"));
  console.log("lmini g page pages/user/index");
  console.log("lmini g component components/base/test/index");
});


/**
 * 如果只输入命令本身也会返回帮助文档。
 */
function help () {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();

const gType = program.args[0]
const gPath = program.args[1]


if (!gType) {
  logger.fatal('type is must')
  process.exit()
}

if (!gPath) {
  logger.fatal('path is must')
  process.exit()
}


if (gType === 'page') {
  generatePage(gPath)
} else if (gType === 'component' || gType === 'comp') {
  generateComponent(gPath)
} else {
  logger.fatal('type must is page,component or comp')
}
