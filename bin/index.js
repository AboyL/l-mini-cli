#!/usr/bin/env node

const program = require("commander");

program
  .version(require("../package").version)
  .usage("<command> [options]")
  .command("init", "generate a new project")
  .command("g", "generate a new page or component");
program.parse(process.argv);