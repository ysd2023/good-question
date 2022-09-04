# 程序（网页部分）说明

---



## 一、应用框架

### 1.开发环境

- `node.js 16` + `next.js` + `react.js` 

---



### 2.第三方库扩展&依赖

1. `scss`
2. `axios`
3. `redux`
4. `react-redux`
5. `PropTypes`
6. `wangEditor`
7. `nanoid`

---



## 二、使用

### 1. 安装&启动开发服务

``` shell
npm i //安装依赖
```

```shell
npm run dev //启动开发环境
```

---



### 2. 编译打包&部署

```shell
npm run build //打包编译
```

**若想将打包编译后的文件单独到另一个文件夹启动服务，建议将.next文件夹及package.json一同移动并在目标位置再使用`npm i`**

```shell
npm run start //部署并启动服务
```

---



## 三、目录结构说明

### 1. components

该目录用于存放界面会用到的分离出来的组件

---



### 2. pages

该目录用于存放页面，所见即为网站的路由

---



### 3. styles

该目录用于存放组件或页面会用到的样式

---



### 4. public

该目录主要用于存放界面会用到的字体、图片等文件

---



### 5. middleware

该目录用于处理、封装相关中间件

---



### 6.redux

该目录用于存放redux相关的文件

---



## 其他说明

**由于本项目使用next.js构建，并在前端使用服务端渲染功能，在一些api的使用上会涉及到cookie使用，需要使用像nginx这样的反向代理，才可以正常使用**

*前端的请求基础url须得设置为配置反向代理的暴露url（nginx监听的url），该文件位于项目下middleware的axios里面*
