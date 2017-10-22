const path = require('path')
const fs = require('fs')

// path.resolve([from...], to) 将参数to位置的字符解析到一个绝对路径里
// path.join([path1], [path2], [...]) 将多个参数组合成一个path

// process.cwd() 返回运行当前脚本的工作目录的路径
// fs.realpathSync(path,[cache]) 获得真实路径
const appDir = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDir, relativePath)

module.exports = {
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src')
}