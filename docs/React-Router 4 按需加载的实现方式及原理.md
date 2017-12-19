# React-router 4 按需加载的实现方式及原理

## React-router 4
介绍了在router4以后，如何去实现按需加载Component，在router4以前，我们是使用getComponent的的方式来实现按需加载的，router4中，getComponent方法已经被移除，下面就介绍一下react-router4是入围和来实现按需加载的。

### 1. router3的按需加载方式
route3中实现按需加载只需要按照下面代码的方式实现就可以了。
```
const about = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/about').default)
    },'about')
}

//配置route
<Route path="helpCenter" getComponent={about} />
```
### 2. router4按需加载方式（three steps）
#### one step:
创建Bundle.js文件,这个文件其实是个通过bundle-loader包装后的组件来使用，下面会具体讲这个东西。
```
import React from 'react';
import PropTypes from 'prop-types';

class Bundle extends React.Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    // 加载初始状态
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    // 重置状态
    this.setState({
      mod: null
    });
    // 传入组件的组件
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    // if state mode not undefined,The container will render children
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

Bundle.propTypes = {
  load: PropTypes.func,
  children: PropTypes.func
};

export default Bundle;
```
#### second step:
```
import aContainer from 'bundle-loader?lazy!./containers/A'

const A = (props) => (
  <Bundle load={aContainer}>
      //这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
    {(Container) => <Container {...props}/>}
  </Bundle>
)
```
#### third step:
```
render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Route path="/about" component={About}/>
        <Route path="/dashboard" component={A}/>
      </div>
    )
  }
```
### 3. router4按需加载方方式解析
- 首先解释一下按需加载，通俗的将就是我当前的location在Home,那么我只应该加载Home的东西，而不应该去加载About等等其他的
- Bundle.js这个文件的作用
先看这段代码：
```
module.exports = function (cb) {
    __webpack_require__.e/* require.ensure */(2).then((function (require) {
        cb(__webpack_require__(305));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
```
这里是我们通过import loadDashboard from 'bundle-loader?lazy!./containers/A'这种方式引入的container控件。我们使用了bundle-loader将A的源码转化成了上面的代码，具体实现大家可以看bundle-loader源码，代码很少。

上面说到Bundle.js其实就使用来处理这个文件的，这个文件需要一个callback的参数，在Bundle的load方法中，我们会设置这个callback，当路由要调到A Container这里的时候，就回去加载A Container,然后调用这个callback，这个callback会调用setState方法，将我们之前传入的load设置给mod，然后渲染出来。
### 4. webpack进行bundle-loader统一配置
这里匹配的是src/routers/下面的containers文件夹下面所有的js文件，包括二级目录。
```
    {
      // 匹配routers下面所有文件
      // ([^/]+)\/?([^/]*) 匹配xxx/xxx 或者 xxx
      test: /containers\/([^/]+)\/?([^/]*)\.jsx?$/,
      include: path.resolve(__dirname, 'src/routers/'),
      // loader: 'bundle-loader?lazy'
      loaders: ['bundle-loader?lazy', 'babel-loader']
    }
```
### 5. 部分源码
- bundle-loader的源码
```
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.getOptions(this) || {};
    if(query.name) {
        var options = {
            context: query.context || this.options.context,
            regExp: query.regExp
        };
        var chunkName = loaderUtils.interpolateName(this, query.name, options);
        var chunkNameParam = ", " + JSON.stringify(chunkName);
    } else {
        var chunkNameParam = '';
    }
    var result;
    if(query.lazy) {
        result = [
            "module.exports = function(cb) {\n",
            "    require.ensure([], function(require) {\n",
            "        cb(require(", loaderUtils.stringifyRequest(this, "!!" + remainingRequest), "));\n",
            "    }" + chunkNameParam + ");\n",
            "}"];
    } else {
        result = [
            "var cbs = [], \n",
            "    data;\n",
            "module.exports = function(cb) {\n",
            "    if(cbs) cbs.push(cb);\n",
            "    else cb(data);\n",
            "}\n",
            "require.ensure([], function(require) {\n",
            "    data = require(", loaderUtils.stringifyRequest(this, "!!" + remainingRequest), ");\n",
            "    var callbacks = cbs;\n",
            "    cbs = null;\n",
            "    for(var i = 0, l = callbacks.length; i < l; i++) {\n",
            "        callbacks[i](data);\n",
            "    }\n",
            "}" + chunkNameParam + ");"];
    }
    return result.join("");
}

/*
Output format:

    var cbs = [],
        data;
    module.exports = function(cb) {
        if(cbs) cbs.push(cb);
        else cb(data);
    }
    require.ensure([], function(require) {
        data = require("xxx");
        var callbacks = cbs;
        cbs = null;
        for(var i = 0, l = callbacks.length; i < l; i++) {
            callbacks[i](data);
        }
    });

*/
```
- A的源码
```
import React from 'react';
import PropTypes from 'prop-types';
import * as reactRedux from 'react-redux';
import BaseContainer from '../../../containers/ReactBaseContainer';

class A extends BaseContainer {
  constructor(props) {
    super(props);
    this.renderCustom = function renderCustom() {
      return (
        <div >
          Hello world In A
        </div>
      );
    };
  }
  render() {
    // 返回父级view
    return super.render();
  }
}

A.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return { state };
}

export default reactRedux.connect(mapStateToProps)(A);
```
- route.js的源码
```
import React from 'react';
import { BrowserRouter, Switch, Link } from 'react-router-dom';
import { Route } from 'react-router';
import PostContainer from '../containers/PostsContainer';
// 设置trunk文件的名字  the basename of the resource
import aContainer from './containers/A';
import bContainer from './containers/B';
import cContainer from './containers/C';
import Bundle from '../utils/Bundle';

const A = () => (
  <Bundle load={aContainer}>
    {Component => <Component />}
  </Bundle>
)

const app = () =>
  <div>
    {/* path = "/about" */}
    {/* "/about/" 可以，但"/about/1"就不可以了 exact 配置之后，需要路径绝对匹配,多个斜杠没有关系，这里直接在浏览器里面设置还有问题*/}
    {/* path = "/about/" */}
    {/* "/about/1" 可以，但"/about"就不可以了 用了strict，path要大于等于的关系，少一个斜杠都不行 */}
    {/* exact 和 strick 都用了就必须一模一样，连斜杠都一样 */}
    <Link to="/about/"> Link to about</Link>
    <Route  path="/" component={PostContainer} />
    <Route path="/about/" component={A} />
    {/* <Route path="/home" component={B} />
    <Route component={C} /> */}
  </div>
;
export default function () {
  // 用来判断本地浏览器是否支持刷新
  const supportsHistory = 'pushState' in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div>
        {app()}
      </div>
    </BrowserRouter>

  );
}
```
> 引用：
<br/>
[Implicit Code Splitting and Chunk Loading with React Router and Webpack](http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/)
<br/>
[官方文档《Code Splitting》](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)