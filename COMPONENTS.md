## 组件部分说明



### 一、BottomNav

#### 1. 组件功能

该组件用于网站底部导航栏，目前有三个导航地址，可根据需要进行扩展。

#### 2. 依赖关系

内部使用**linkPlus**组件。

#### 3.提供的属性或接口

无。

---



### 二、LinkPlus

#### 1. 组件功能

该组件通过对next.js内部的Link组件进行分装，实现路由匹配，当路由匹配正确，会有高亮效果显示。

#### 2. 依赖关系

内部使用next.js 中的link组件。

#### 3. 提供的属性或接口

- href

  该接口用于接受组件匹配的路由，接收String类型的参数，示例：

  ```jsx
  <LinkPlus href="/index" />
  ```

  

- className

  该接口继承react标签中类名，是标签的默认样式，接收String类型的参数，示例：

  ```jsx
  <LinkPlus className={defaultClassName} />
  ```

  

- activeName

  该接口为标签的高亮样式，接收String类型的参数，示例：

  ```jsx
  <LinkPlus activeName={activeClassName} />
  ```

  

  

---



### 三、CommentArea

#### 1.组件功能

该组件为问题详情界面分离出来的一个部分。主要功能为获取并显示对应解决方案下的评论，并实现用户的评论发表功能。

#### 2. 依赖关系

无。

#### 3. 提供的属性或接口

- solutionID

  该接口用于接受解决方案的唯一标识，并通过唯一标识进行评论的获取以及发表。示例:

  ```jsx
  <CommentArea solutionID={ID} />
  ```

  

---



### 四、 DropDownContainer

#### 1.组件功能

该组件为下拉框，由标题部分和下拉容器部分组成。主要实现大篇幅内容的显示与隐藏。

#### 2. 依赖关系

无。

#### 3.提供的属性或接口

- title

  该接口用于标题的显示。示例：

  ```jsx
  <DropDownContainer title={text}/>
  ```

  

- children

  该接口用于显示容器内容。示例：

  ```jsx
  <DropDownContainer title={text}>
      {children}
  </DropDownContainer>
  ```

  

---



### 五、QuestionContainer

#### 1. 组件功能

该组件为问题列表容器。主要用于首页、搜索结果页面的问题列表展示。

#### 2. 依赖关系

内部使用QuestionItem组件记性问题的展示。

#### 3. 提供的属性或接口

- mode

  mode分为tab、search两种模式。

  tab模式为首页问题显示，内部依赖redux中的tabStore。此模式下列参数都无效。

  search模式时，下列两个参数为必选，否则会报错。

  示例：

  ```jsx
  <QuestionContainer mode="tab" />
  <QuestionContainer mode="search" />
  ```

  

- questionList

  模式为search时，接受服务端渲染后传递的初始化列表。示例：

  ```jsx
  <QuestionContainer mode="search" questionList={list} />
  ```

  

- keyword

  模式为search时，接受服务端传递的参数，用于后续追加搜索结果。示例：

  ```jsx
  <QuestionContainer mode="search" keyword={keyword} />
  ```



---



### 六、QuestionItem

#### 1.组件功能

该组件用于渲染问题项。可根据需要修改组件内显示的内容。

#### 2. 依赖关系

无。

#### 3.提供的属性或接口

- question

  该属性用于接收渲染的问题项对象。接收的参数内容将在特定问题项的制定位置显示。多用于和QuestionContainer配合。示例：

```jsx
{
    list.map(item => <QuestionItem question={item} />)
}
```



---



### 七、SearchInput

#### 1.组件功能

该组件用于搜索框，由输入框和联想面板组成。根据用户输入的关键字，查找并显示建议。

可以根据需要修改组件内部使用的相关api。

#### 2. 依赖关系

无。

#### 3.提供的属性或接口

无。

---



### 八、SolutionEditor

#### 1. 组件功能

该组件用于富文本编辑。封装自WangEditor。相关编辑器的配置可参考WangEditor官网。

#### 2. 依赖关系

无。

#### 3. 提供的属性或接口

- changeContent

  因为组件封装了WangEditor，所以外部无法直接拿去编辑器的内容。故在编辑器内容发生改变时，通过触发**changeContent**来更新内容。示例：

  ```jsx
  <SolutionEditor changeContent={(content) => setEditor(content)} />
  ```



---



### 九、Tabs

#### 1.组件功能

该组件用于显示首页分类标签。通过切换标签更改tabStore值，配合QuestionContainer达到刷新问题列表的功能。

#### 2.依赖关系

无。

#### 3.提供的属性或接口

- tabList

  该属性用于接收初始化分类标签，并提供展示、切换功能。示例：

  ```jsx
  <Tabs tabList={list} />
  ```



---



### 十、 TransitionGroup

#### 1.组件功能

该组件为列表渲染提供过渡动画。目前尚未提供过渡样式接口，需要定制可更改组件。

#### 2.依赖关系

无。

#### 3.提供的属性或接口。

- children

  组件接收插槽内容，并提供过渡动画。示例：

  ```jsx
  <TransitionGroup>
  {
      imageList.map((item, index) => (
          <li key={item.id} className="hello">
              <img src={item.dataUrl}/>
          </li>
      ))
  }
  </TransitionGroup>
  ```

  

---



### 十一、VerticalProgress

#### 1. 组件功能

该组件提供全屏的竖直进度条渲染。内部使用canvas实现气泡动画。该特性意味着在next.js等服务端渲染时。需要设置服务端渲染关闭，并动态导入该组件。

#### 2.依赖关系

无。

#### 3.提供的属性或接口（*本条目将于后面提供整体示例*）

- percent

  该属性用于显示进度。

- tip

  该属性用于显示进展中的提示。

- successTip

  该属性用于显示成功状态的提示。

- errorTip

  该属性用于显示失败状态的提示。

- progressStatus

  该属性提供三个选项：norma,  success,  error。分别对应三种状态正常显示、完成、错误。

- successSlot

  该属性用于进度完成状态下的展示。可提供dom标签对象。多用于适应状态的操作。

- errorSlot

  该属性用于进度错误状态下的展示。可提供dom标签对象。多用于适应状态的操作。

*示例：*

```jsx
<VerticalProgress 
    percent={progress}
    tip="发布进度" 
    successTip="发布成功!" 
    errorTip="发布失败"
    progressStatus={Status} 
    
    successSlot={
        <div className={styles['success-container']}>
            <button>返回首页</button>
        </div>
    }
    
    errorSlot={
        <div className={styles['success-container']}>
            <button>重新上传</button>
            <button>取消</button>
        </div>
    }
/>
```



---



### 十二、Notification

#### 1.组件功能

该组件提供消息通知显示的功能，且非标签类组件，而是函数方法；更多自定义可查看组件。

#### 2. 依赖关系

无。

#### 3.提供的属性或接口

- notification`<object>`

  组件接收一个对象作为参数，可提供的内容有：

  ```
  {
      title: String //通知的标题
      message: String //通知的内容
      type: String //通知展示的类型，有success, error, warning可选，默认为default
      delay: Number //通知存在持续时间, 默认存在3s, 以ms为单位
  }
  ```

  示例：

  ```javascript
   import notify from '/components/notification'
  
  notify({
      title: '通知',
      message: '这是一则消息',
      type: 'default',
      delay: 1000 //1s为1000ms
  })
  ```




---



### 十三、ImageLoad

#### 1.组件功能

该组件提供图片模糊加载，用户可以提供压缩图片的链接和原图片的链接，组件在加载完后加载原图。

#### 2. 依赖关系

无。

#### 3.提供的属性或接口

- normalUrl`<String>`

  该参数接收原图片的链接。

- compressedUrl`<String>`

  该参数接收压缩图片的链接。

  

  示例：

  ```jsx
   import ImageLoad from '/components/imageLoad'
  
  <ImageLoad normalUrl={"http://..."} compressedUrl={"http://..."} />
  ```

  
