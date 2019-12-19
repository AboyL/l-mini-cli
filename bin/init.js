#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const download = require("download-git-repo");
const ora = require('ora')
const logger = require("../lib/logger");

program
  .usage("<template-name> [project-name]")

/**
 * 自定义帮助文档.
 */
program.on("--help", () => {
  console.log("  示例:");
  console.log();
  console.log(chalk.yellow("    # 使用模板创建项目"));
  console.log("    $ lmini init my-project");
  console.log();
});


/**
 * 如果只输入命令本身也会返回帮助文档。
 */
function help () {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();

const projectName = program.args[0]

if (projectName) {
  downloadAndGenerate(projectName)
}

/**
 * 从模板仓库下载模板，并生成项目
 *
 * @param {String} projectName
 */
function downloadAndGenerate (projectName) {
  const spinner = ora("模板下载中，请稍等···");
  spinner.start();
  // 如果存在本地模板，先删除
  download('AboyL/l-mini', projectName, err => {
    spinner.stop();
    if (err) {
      logger.fatal("模板" + projectName + "下载失败" + ": " + err.message.trim());
    }
  });
}


