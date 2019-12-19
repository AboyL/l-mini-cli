const program = require("commander");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')
const logger = require('./lib/logger')

program.parse(process.argv);

const packageJson = require("./package.json")
const version = packageJson.version


console.log('version', version);
let newVersion = program.args[0]
const checkVersion = (version) => {
  const arr = version.split('.')
  console.log(typeof arr[0]);
  if (arr.length !== 3) {
    return false
  }
  if (arr.map(v => parseInt(v)).some(v => typeof v !== 'number')) {
    return false
  }
  return true
}
const getNewVersion = (old) => {
  const arr = old.split('.')
  if (!checkVersion(old)) {
    throw '请输入正确的版本号'
  }
  return [arr[0], arr[1], arr[2] - 0 + 1].join('.')
}

if (!newVersion) {
  newVersion = getNewVersion(version)
} else {
  if (!checkVersion(newVersion)) {
    throw '请输入正确的版本号'
  }
}

packageJson.version = newVersion
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, '\t'))
// 执行git 以及npm命令
async function publishVersion (version) {
  await exec('git add .')
  await exec(`git commit -m "publish ${version}"`)
  logger.success('commit')
  await exec(`git pull`)
  logger.success('pull')
  await exec(`git push`)
  logger.success('push')
  await exec(`git tag -a ${version} -m "publish ${version}"`)
  await exec(`git push --tags`)
  logger.success('tag')

}
publishVersion(newVersion)
