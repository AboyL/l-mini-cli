const fs = require('fs')
const createRenderContent = require('./render')
const path = require('path')

// 这个函数可以使用 fs-extra 来代替
const generateFile = (fileDirName, ext, fileContent) => {
  // 对filename进行分析
  // 根据 / 进行划分
  const arr = fileDirName.split('/')
  let filedir = ''
  let filename = ''
  if (arr.length > 1) {
    filename = arr[arr.length - 1]
    if (filename === '') {
      filename = 'index.' + ext
      filedir = fileDirName
    } else {
      filedir = fileDirName.slice(0, fileDirName.length - filename.length)
      filename += '.' + ext
    }
  }
  if (filedir) {
    fs.mkdirSync(filedir, {
      recursive: true
    })
  }
  fs.writeFileSync(filedir + filename, fileContent)
}

module.exports = {
  generatePage: (gPath) => {
    const pageJs = fs.readFileSync(path.join(__dirname, '/temp/page/index.js'))
    const pageJson = fs.readFileSync(path.join(__dirname, '/temp/page/index.json'))
    const pageLess = fs.readFileSync(path.join(__dirname, '/temp/page/index.less'))
    const pageWxml = createRenderContent(path.join(__dirname, '/temp/page/index.wxml'), {
      gPath
    })
    // 输出内容
    generateFile(gPath, 'js', pageJs)
    generateFile(gPath, 'json', pageJson)
    generateFile(gPath, 'less', pageLess)
    generateFile(gPath, 'wxml', pageWxml)
  },
  generateComponent: (gPath) => {
    const componentJs = fs.readFileSync(path.join(__dirname, '/temp/component/index.js'))
    const componentJson = fs.readFileSync(path.join(__dirname, '/temp/component/index.json'))
    const componentLess = fs.readFileSync(path.join(__dirname, '/temp/component/index.less'))
    const componentWxml = createRenderContent(path.join(__dirname, '/temp/component/index.wxml'), {
      gPath
    })
    // 输出内容
    generateFile(gPath, 'js', componentJs)
    generateFile(gPath, 'json', componentJson)
    generateFile(gPath, 'less', componentLess)
    generateFile(gPath, 'wxml', componentWxml)
  }
}
