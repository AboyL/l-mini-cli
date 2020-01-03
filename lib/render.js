const vm = require('vm')

const getTemp = (temp) => {
  return `\`${temp}\``
}

const createRenderContent = (temp, data) => {
  return vm.runInNewContext(getTemp(temp), data)
}
module.exports = createRenderContent