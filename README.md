### webpack 代码分割

使用webpack中的`import()`进行代码分割，`import()`返回Promise，需要浏览器支持

> yarn add —dev babel-polyfill babel-plugin-dynamic-import-webpack

```
// .babelrc
{
  "plugins": ["dynamic-import-webpack"]
}
```

```
// webpack.base.config.js 
// 生成子路由文件
output: {
  chunkFilename: 'assets/js/[name].child.js'
}
```

```
// router.js
<Switch>
  <Route path='/' exact render={() => {
    return <Bundle load={() => import('./views/Home')}>
      {Home => <Home></Home>}
    </Bundle>
  }} />
  <Route render={() => {
    return <Bundle load={() => import('./views/NoRouter')}>
      {NoRouter => <NoRouter></NoRouter>}
    </Bundle>
  }} />
</Switch>
```

```
// Bundle.js

import React, { Component } from 'react'

export default class Bundle extends Component {
  constructor() {
    super()
    this.state = { 
      mod: null 
    }
  }

  async componentDidMount() {
    const { default: mod } = await this.props.load()

    this.setState({mod: mod.default || mod})
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}
```

