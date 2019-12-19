const fs = require('fs')

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
    const pageJs = `
    Page({
      data: {
      },
      async onLoad () {
      }
    });  
    `
    const pageJson = `
    {
      "usingComponents": {}
    }
    `
    const pageLess = ``
    const pageWxml = `
    <view>${gPath}</view>
    `
    // 输出内容
    generateFile(gPath, 'js', pageJs)
    generateFile(gPath, 'json', pageJson)
    generateFile(gPath, 'less', pageLess)
    generateFile(gPath, 'wxml', pageWxml)
  },
  generateComponent: () => {
    const componentJs = `
    Component({
      data: {
      },
      async ready () {
      }
    });  
    `
    const componentJson = `
    {
      "component": true,
      "usingComponents": {}
    }
    `
    const componentLess = ``
    const componentWxml = `
    <view>${gPath}</view>
    `
    // 输出内容
    generateFile(gPath, 'js', componentJs)
    generateFile(gPath, 'json', componentJson)
    generateFile(gPath, 'less', componentLess)
    generateFile(gPath, 'wxml', componentWxml)
  }
}