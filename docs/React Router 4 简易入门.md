# React Router 4 简易入门

React Router 4 是一个流行的纯React重写的包。现在的版本中已不需要路由配置，现在一切皆组件。
本文涵盖了开始使用React Router构建网站所需要的一切知识。

## 安装
React Router被拆分成三个包：**react-router**, **react-router-dom** 和 **react-router-native**。**react-router**提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。
进行网站（将会在浏览器环境中）构建，我们应当安装**react-router-dom**。**react-router-dom**暴露出**react-router**中暴露的对象与方法，因此你只需要安装并引用**react-router-dom**即可。
```
npm install --save react-router-dom
```

## 路由器（Router）
在你开始项目前，你需要决定你使用的路由器类型。对于网页项目，存在**&lt;BrowserRouter&gt;**与**&lt;HashRouter&gt;**两种组件。当存在服务区来管理动态请求时，需要用**&lt;BrowserRouter&gt;**组件，而**&lt;HashRouter&gt;**被用于静态网站。

通常，我们更倾向选择**&lt;BrowserRouter&gt;**，但如果你的网站仅用来呈现静态谁的，那么**&lt;HashRouter&gt;**将会是一个好选择。

对于我们的项目，将会有服务器的动态支持，因此我们选择**&lt;BrowserRouter&gt;**作为路由器组件。

### 历史（History）
每个路由器都会创建一个`history`对象并用其保持追踪当前`location`[注1]并且在有变化时对网站进行重新渲染。这个`history`对象保证了**React Router**提供的其他组件的可用性，所以其他组件必须在router内部渲染。一个React Router组件如果向父级上追溯却找不到**router**组件，那么这个组件将无法正常工作。

### 渲染（Router）
路由器组件无法接受两个及以上的子元素。基于这种限制的存在，创建一个`<App>`组件来渲染应用其余部分是一个有效的方法（对于服务端渲染，将应用从router组件中分离也是重要的）。
```
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'))
```
## &lt;App&gt;
应通过`<App>`组件定义。简化一下，我们将应用拆分成两个部分。`<Header>`组件包含网站的导航链接。`<Main>`组件则呈现其余内容。
```
// this component will be rendered by our <__Router>
const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)
```
*注意：你可以按你喜欢的方式对应用布局，但是将路由与导航拆分出来对于这个入门教程会更加简单。*
## 路由（Route）
`<Route>`组件是React Router中主要的结构单元。在任意位置只要匹配了URL的路径名（pathname）你就可以创建`<Route>`元素进行渲染。
### 路径（Path）
`<Route>`接受一个数为string类型的`path`，该值是路由匹配的路径名的类型。例如：`<Route path='/roster'/>`会匹配以`/roster`[注2]开头的路径名。在当前path参数与当前location的路径相匹配时，路由就会开始渲染React元素。若不匹配，路由不会进行任何操作[注3]。
```
<Route path='/roster'/>
// 当路径名为'/'时，path不匹配
// 当路径名为'/roster'或'/roster/2'时，path匹配
// 当你只想匹配'/roster'时，你需要使用"exact"参数
// 则路由仅匹配'/roster'而不会匹配'/roster/2'
<Route exact path='/roster'/>
```
*注意：在匹配路由时，React Router只关注location的路径名。当URL如下时：*
```
http://www.example.com/my-projects/one?extra=false
```
*React Router去匹配的只是`/my-projects/one`这一部分。*
### 匹配路径
·path-to-regexp`包用来决定route元素的path参数与当前location是否匹配。它将路径字符串编译成正则表达式，并与当前location的路径名进行匹配比较。除了上面的例子外，路径字符串有更多高级的选项，详见[path-to-regexp文档](https://github.com/pillarjs/path-to-regexp)。当路由地址匹配成功后，会创建一个含有以下属性的match对象：
* url：与当前location路径名所匹配部分
* path：路由的地址
* isExact： path是否等于pathname
* params： 从path-to-regexp获取的路径中取出的值都被包含在这个对象中
使用[router tester](https://pshrmn.github.io/route-tester/#/)这款工具来对路由与URL进行检验。
<br>
*注意: 本例中路由路径仅支持绝对路径[注4]*
### 创建你的路由
可以在路由器（Router）组件中的任意位置创建多个<Route>，介通常我们会把它们放在同一个位置。使用`<Switch>`组件来包裹一组`<Route>`。`<Switch>`会遍历自身的子元素（即路由）并对第一个匹配当前路径的元素进行渲染。
<br/>
对于本网站，我们希望匹配以下路径：
* /：主页
* /roster：团体列表
* /roster/:number：运动员页面，使用运动员的编号作为标识
* /schedule：团队的赛程表
为了在应用中能匹配路径，在创建`<Route>`元素时必须带有需要匹配的path作为参数。
```
<Switch>
    <Route exact path='/' component={Home}/>
    {/* both /roster and /roster/:number begin with /roster */}
    <Route path='roster' component={Roster}/>
    <Route path='/schedule' component={Schedule}/>
</Switch>
```
### `<Route>`是如何渲染的？
当一个路由的path匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。
* component：一个React组件。当带有component参数的route匹配成功后，route会返回一个新的元素，基为component参数所对应的React组件（使用`React.createElement`创建）。
* render：一个返回React element的函数[注5]。当匹配成功后调用该函数。该过程与传入component参数类似，并且对于行级渲染与需要向元素传入额外参数的操作会更有用。
* children：一个返回React element的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。
```
<Route path='/page' component={Page}/>
const extraProps = {color: 'red'}
<Route path='/page' render{(props) => (
    <Page {...props} data={extraProps}/>
)}/>
<Route path='/page' children={(props)=>(
    props.match
    ? <Page {...props}/>
    : <EmptyPage {...props}/>
)}/>
```
通常`component`参数与`render`参数被更经常地使用。`children`参数偶尔会被使用，它更常用在path无法匹配时呈现的'空'状态。在本例中并不会有额外的状态，所以我们将使用`<Route>`的component参数。
通过`<Route>`渲染的元素会被传入一些参数。分别是match对象，当前location对象[注6]以及history对象（由router创建）[注7]。
### `<Main>`
现在我们清楚了根路由的结构，我们需要实际渲染我们的路由。对于这个应用，我们将会在`<Main>`组件中渲染`<Switch>`与`<Route>`，这一过程会将route匹配生成的HTML放在`<main>`节点中。
```
import {Switch, Route} from 'react-router-dom'
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/roster' component={Roster}/>
            <Route path='/schedule' component={Schedule}/>
        </Switch>
    </main>
)
```
*注意：主页路由包含额外参数。该参数用来保证路由能准确匹配*
### 嵌套路由
运动员由`/roster/:number`并未包含在上述`<Switch>`中。它由`<Roster>`组件负责在路径包含`'/roster'`的情形下进行渲染。
在`<Roster>`组件中，我们将为两种路径进行渲染：
* /roster：对应路径名仅仅是/roster时，因此需要在exact元素上添加exact参数。
* /roster/:number：该路由使用一个路由参数来获取/roster后的路径名。
```
const Roster = () => (
    <Switch>
        <Route exact path='/roster' component={FullRoster}/>
        <Route path='/roster/:number' component={Player}/>
    </Switch>
)
```
组合在相同组件中分享共同前缀的路由是一种有用的方法。这就需要简化父路由并且提供一个区域来渲染具有相同前缀的通用路由。
例如，`<Roster>`用来渲染所有以/roster开始的全部路由。
```
const Roster = () => (
    <div>
        <h2>This is a roster page!</h2>
        <Switch>
            <Route exact path='/roster' component={FullRoster}/>
            <Route path='/roster/:number' component={Player}/>
        </Switch>
    </div>
)
```
### 路径参数
有时路径名中存在我们需要获取的参数。例如，在运动员界面，我们需要获取运动员的编号。我们可以向route的路径字符串中添加path参数。如`'/roster/:number'`中:number这种写法意味着/roster/后的路径名将会被获取并存在`match.params.number`中。例如，路径名`/roster/6`会获致到一个对象：
```
{ number: '6' } //注：获取的值是字符串类型的
```
`<Player>`组件可以使用props.match.params对象来确定需要被渲染的运动员的数据。
```
// 返回运动员对象的API
import PlayerAPI from './PlayerAPI'
const Player = (props) => {
    const player = Player.get(parseInt(props.match.params.number, 10))
    if (!player) {
        return <div>Sorry, but the player was not found</div>
    }
    return (
        <div>
            <h1>{player.name} (#{player.number})</h1>
            <h2>{player.position}</h2>
        </div>
    )
}
```
你可以通过阅读[path-to-regexp文档](https://github.com/pillarjs/path-to-regexp)来了解更多。
除了`<Player>`组件，我们的页面还包含`<FullRoster>`,`<Schedule>`以及`<Home>`组件。
```
const FullRoster = () => (
    <div>
        <ul>
            {
                PlayerAPI.all().map( p => (
                    <li key={p.number}>
                        <Link to={`/roster/${p.number}`}>{p.name}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
)
const Schedule = () => (
    <div>
        <ul>
            <li>6/5 @ Evergreens</li>
            <li>6/8 vs Kickers</li>
            <li>6/14 @ United</li>
        </ul>
    </div>
)
const Home = () => (
    <div>
        <h1>Welcome to the Tornadoes Website!</h1>
    </div>
)
```
## Link
现在，我们应用需要在各个页面间切换。如果使用锚点元素实现，在每次点击时页面将被重新加载。React Router提供了`<Link>`组件用来避免这种状况的发生。当你点击`<Link>`时，URL会更新，组件会被重新渲染，但是页面不会重新加载。
```
import {Link} from 'react-router-dom'
const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/roster'>Roster</Link></li>
                <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
        </nav>
    </header>
)
```
`<Link>`使用'to'参数来描述需要定位的页面。它的值即可是字符串也可是location对象（包含pathname, search, hash与state属性）。如果其值为字符串将会被转换为location对象。
```
<Link to={{pathname: '/roster/7'}}>Player #7</Link>
```
*注意：本例的link的pathname属性只能是绝对路径[注4]。*
## 例子
一个完整的[网站例子](http://codepen.io/pshrmn/pen/YZXZqM)
## 获取路由
希望当下你已准备好深入构建你自己的网站了。
<br/>
我们已经了解了构建网站所需要的所有必须组件（`<BrowserRouter>`，`<Route>`，以及`<Link>`）。当然，还有一些我们没有涉及的组件。所幸React Router拥有优质的[文档](https://reacttraining.com/react-router/web/guides/quick-start)，你可以查看并从中了解更多的信息。文档也提供一系列的例子与源代码。
## 注释
* [1] locations是一个含有描述URL不同部分属性的对象：
```
// 一个基本的location对象
{pathname: '/', search: '', hash: '', key: 'abc123', state:{}}
```
* [2]你可以渲染无路径的`<Route>`，其将会匹配所有location。此法用于访问存在上下文中的变量与方法。
* [3]如果你使用children参数，即便在当前location不匹配时route也将进行渲染。
* [4]当需要支持相对路径的`<Route>`与`<Link>`时，你需要多做一些工作。相对`<Link>`将会比你之前看到的更为复杂。因其使用了父级的match对象而非当前URL来匹配相对路径。
* [5]这是一个本质上无状态的函数组件。内部实现，component参数与render参数的组件是有很大区别的。使用component参数的组件会使用React.createElement来创建元素，使用render参数的组件则会调用render函数。如果我们定义一个内联函数并将其传给component参数，这将会比使用render参数慢很多。
```
<Route path='/one' component={One}/>
// React.createElement(props.component)
<Route path='/two' render={()=> <Two/>}>
// props.render()
```
* [6] `<Route>`与`<Switch>`组件都会带有location参数。这能让你使用与实际location不同的location去匹配地址。
* [7] 可以传入staticContext参数，不过这仅在服务端渲染时有用。