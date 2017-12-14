### Express Webpack React 模板

## 创建过程

1. `npm install --save-dev react react-dom babel-core babel-cli babel-loader babel-preset-env babel-preset-react babel-preset-stage-3 react-hot-loader webpack webpack-dev-server webpack-dev-middleware webpack-hot-middleware`
2. `npm install --save-dev url-loader file-loader style-loader css-loader less less-loader`
3. `npm install --save-dev html-webpack-plugin extract-text-webpack-plugin`
4. `npm install --save express ejs serve-favicon morgan cookie-parser body-parser`
5. `npm install --save-dev babel-cli nodemon cross-env`
6. `npm install --save isomorphic-fetch`
7. `npm install --save-dev clean-webpack-plugin copy-webpack-plugin`

## 使用方法
* 开发过程：
    1. `npm install`
    2. `npm run dev`
* 构建过程：
    1. `npm install`
    2. `npm run build`
* 产品运行：
    1. 先运行构建过程，该过程将在项目目录中创建public目录，并将编译后的源代码及资源文件拷贝到里面
    2. 进入public目录，运行 `npm start`

## 调试方法

1. 调试控制器：
    运行 `npm dev:debug`
2. 调试server.js：
    运行 `npm build:debug` 生成调试文件。
3. Visual Studio Code 的调试配置：
    ```
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via NPM",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script",
                "debug"
            ],
            "port": 9229,
            "sourceMaps": true,
            "restart": true
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/debug/server.js",
            "sourceMaps": true
        }
    ```
    调试控制器时，可以用*'Launch Via NPM'*配置；
    调试server.js时要用*'Launch Program'*配置;
4. 客户端调试
    * Chrome安装react-devtools_2_5_0.crx插件
    * 在 `npm run dev` 和 `npm run dev:build`的情况下均可进行源代码调试。先刷新页面，在react面板上右键，选“source”可看到原始的代码，不是经过babel转译的代码


## 参考
* > [Setting up our React/ES6 Development environment with Webpack, Express and babel](https://blog.hellojs.org/setting-up-your-react-es6-development-environment-with-webpack-express-and-babel-e2a53994ade)

* > [Express结合Webpack的全栈自动刷新](https://segmentfault.com/a/1190000004505747)


## Antd
1. `npm install babel-plugin-import antd`

temp:
```
{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'less-loader' ]
                })
            }
```

## 调试方法1：
`.vscode/tasks.json`
```
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build:debug",
            "type": "npm",
            "script": "build:debug",
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```
`.vscode/launch.json`
```
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug local",
            "program": "${workspaceFolder}/src/server/server.js",
            "sourceMaps": true,
            "restart": true,
            "env": {
                "NODE_ENV": "dev"
            },
            "preLaunchTask": "build:debug",
            "outFiles": [
                "${workspaceFolder}/build/server/server.js"
            ]
        }
    ]
}
```