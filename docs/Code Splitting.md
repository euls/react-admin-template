# Code Splitting
One great feature of the web is that we don't have to make our visitors download the entire app before they can use it. You can think of code splitting as incrementally downloading the app. To accomplish this we'll use [webpack](https://webpack.js.org/), [babel-plugin-syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/), and [react-loadable](https://github.com/thejameskyle/react-loadable).
<br/>
[webpack](https://webpack.js.org/) has built-in support for [dynamic imports](https://github.com/tc39/proposal-dynamic-import); however, if you are using [Babel](https://babeljs.io/) (e.g., to compile JSX to JavaScript) then you will need to use the [babel-plugin-syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) plugin. This is a syntax-only plugin, meaning Babel won't do any additional transformations. The plugin simply allows Babel to parse dynamic imports so webpack can bundle them as a code split. Your `.babelrc` should look something like this:
```
{
  "presets": [
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import"
  ]
}
```
[react-loadable](https://github.com/thejameskyle/react-loadable) is a higher-order component for loading components with dynamic imports. It handles all sorts of edge cases automatically and makes code splitting simple! Here's an example of how to use [react-loadable](https://github.com/thejameskyle/react-loadable):
```
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```
That's all there is to it! Simply use LoadableDashboard (or whatever you named your component) and it will automatically be loaded and rendered when you use it in your application. The loader option is a function which actually loads the component, and loading is a placeholder component to show while the real component is loading.
## Code Splitting and Server-Sice Rendering
[react-loadable](https://github.com/thejameskyle/react-loadable) includes [a guide for server-side rendering](https://github.com/thejameskyle/react-loadable/tree/6902cc87f618446c54daa85d8fecec6836c9461a#server-side-rendering). All you should need to do is include [babel-plugin-import-inspector](https://github.com/thejameskyle/react-loadable/tree/6902cc87f618446c54daa85d8fecec6836c9461a#babel-plugin-import-inspector) in your .babelrc and server-side rendering should just work™. Here is an example .babelrc file:
```
{
  "presets": [
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import",
    ["import-inspector", {
      "serverSideRequirePath": true
    }]
  ]
}
```