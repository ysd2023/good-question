# 程序接口---好问题

***接口以页面为模块划分***

### 一、首页

---



#### 1. 获取问题列表

##### 1.1 接口功能

- 根据标签页，分页获取问题
- 根据搜索关键字，分页获取问题

##### 1.2 接口地址(get)

- `url： /api/getQuestions`

##### 1.3 响应数据（`json`）

```
{
    page: Number //当前请求返回的页数
    questionList: Array<Object> //问题列表
}
```

*补充解释：question是`questionList`里面的对象*

```
question {
    questionID: Number //问题索引
    title: String //问题的标题
    summary: String //对问题的简单描述，可选
    cover: image[url] //问题的图像封面链接，可选
    publisher: Object //发起问题的人的信息
    tag: Array<Object> //问题所属标签
},
publisher {
    nickName: String //发起者的昵称
    avatar: image[url] //发起者头像链接
},
tag {
    id: Number //标签索引
    context: String 标签内容
}
```

##### 1.4 请求数据（`type[ formData | json ]`）

```
{
    summary: String //对请求问题的简单描述，可选
    page: Number //请求所需页面数据的页码，可选，默认为0
    tag: Object //请求问题包含的标签，可选
},
tag {
    id: Number //标签索引
    context: String 标签内容
}
```



---



#### 2. 获取问题详情

##### 2.1 接口功能

- 获取问题的相关信息

##### 2.2 接口地址(get)

- `url: '/api/detail`'

##### 2.3 响应数据（`json`）

```
{
    publisher: Object //发布者相关信息
    question: Object //问题的相关信息
}
```

*补充解释：*

```
publisher {
    nickName: String //发布者昵称
    avatar: image[url] //发布者头像链接
},
question {
    questionID: Number //问题索引
    title: String //问题的标题
    summary: String //对问题的简单描述，可选
<<<<<<< HEAD
    imageDescription: Array<image[url]> //问题的图像描述,可选
    tag: Array<String> //问题所属标签
=======
    solutionNum: Number //该解决方案的个数
    imageDescirption: Array<image[url]> //问题的图像描述,可选
    publisher: Object //发起问题的人的信息
    tag: Array<Object> //问题所属标签
},
tag {
    tagID: Number //标签索引
    context: String //标签内容
>>>>>>> 950d7cf (接口请求数据完善)
}
```

##### 2.4 请求数据（`type[ formData | json ]`）

```
{
    questionID: Number //问题索引
}
```



---



#### 3.获取解决方案

##### 3.1 接口功能

- 获取对应问题下的解决方案，分页获取
- 获取单个解决方案，根据唯一标识（pending）

##### 3.2 接口地址（get）

- `url: '/api/getSolution'`

##### 3.3 响应数据（`json`)

```
分页获取返回结果: {
    solutionList: Array<{
        solution: Object //解决方案
    }>
};
单个解决方案返回结果 {
    solution: Object<solution>//返回单个解决方案的内容
}
```

*补充解释：*

```
solution {
    solutionID: Number //解决方案索引
    resolver: Object //提出解决方案的用户信息
    content: String //解决方案内容
    comment: Number //评论数量
    favor: Number //同意数量
    opposition: Number //反对数量
    citeSolution: solution //引用的解决方案的索引
},
resolver {
    nickName: String //解决问题用户名字
    avatar: image[url] //解决问题用户头像链接
}
```



##### 3.4 请求数据（`type[ formData | json ]`）

```
{
    questionID: Number //问题索引，可选，与title二者选一
}
```

**仍需要继续讨论修改**


---



#### 4.获取评论

##### 4.1 接口功能

- 获取解决方案的评论，分页获取

##### 4.2 接口地址（get）

- `url: '/api/getComment'`

##### 4.3 响应数据（`json`）

```
{
    commentorList: Array<{
        commentID: Number //评论索引
        commentor: Object //评论者相关信息
        content: String //评论内容
        replyTarget: String //回复对象名字,可选
    }>
}
```

*补充解释：*

```
commentor {
    nickName: String //评论者昵称
    avatar: image[url] //评论者头像链接
}
```

##### 4.4 请求数据（`type[ formData | json ]`）

```
{
    solutionID:Number //解决方案索引
    page: Number //请求所需页面数据的页码，可选，默认为0
}
```



---



#### 5. 发布解决方案

##### 5.1 接口功能

-  对问题提出解决方案

##### 5.2 接口地址（post）

- `url: '/api/publishSolution'`

##### 5.3 响应数据（`json`）

```
{
    statu: Boolean //发布状态
    reason: String //理由
}
```

##### 5.4 请求数据（`json`）

```
{
    citeSolutionID: Number //被引用的解决方案的id,可选，空则表示无引用
    content: String //解决方案内容，可选
}
```

**需要补充，PS：`pending`表示待定**

*请求数据content内含标签 : '’<‘、’>‘等符号，需要进行转义*

---



#### 6. 上传图片

##### 6.1 接口功能

- 上传问题、解决方案里面用到的图片

##### 6.2 接口地址（post）

- `url: '/api/uploadImage'`

##### 6.3 响应数据（`json`）

```
{
    errno: 0, // PS: 值是数字，成功为0，失败为非0
    data: {
        url: String, // 图片地址 
        alt: String, // 图片描述文字，可选
    },
    message: String //图片上传失败理由
}
```

##### 6.4 请求数据（`formData`）

```
{
    upload-image: File
}
```



---



#### 7. 删除图片（pending)



---



#### 8. 评论

##### 8.1 接口功能

- 对解决方案进行评论
- 对用户的评论进行评论

##### 8.2 接口地址（post）

- `url: '/api/Comment'`

##### 8.3 响应数据（`json`）

```
{
    statu: Boolean //评论发表状态
    reason: String //失败理由
}
```


##### 8.4 请求数据（`json`）

```
{
    
    commentor: Object //评论者相关信息
    content: String //评论内容
    replyTarget: String //回复对象名字,可选
},
commentor {
    commentorID: Number //评论者索引
}
```



---



#### 9. 方案表态

##### 9.1 接口功能

- 对已发表的解决方案表明自己态度，如赞成、反对
- 对已发表的评论表明自己态度

##### 9.2 接口地址（post）

- `url: '/api/indicateAttitude'`

##### 9.3 响应数据(`json`)

```
{
    statu: Boolean //表态请求状态
    reason: String //失败理由
}
```

##### 9.4 请求数据

```
{
    solutionID:Number //解决方案索引
    attitude: Boolean //态度。true: 赞成; false: 反对. 
}
```



---



#### 10.搜索词联想

##### 10.1 接口功能

- 根据用户输入的关键字，给出相关的搜索建议

##### 10.2 接口地址（get）

- `url: '/api/suggest'`

##### 10.3 响应数据(`json`)

```
{
    suggestList: Array<String> //相关的搜索建议
}
```

##### 10.4 请求数据(`json`)

```
{
    keyword: String //用户输入的关键字
}
```



---



### 二、想法

---



#### 1. 发布问题

##### 1.1 接口功能

- 用户发起问题

##### 1.2 接口地址(post)

- `url: '/api/ publishQuestion'`

##### 1.3 响应数据(`json`)

```
{
    statu: Boolean //问题发布状态
    reason: String //发布失败理由
}
```

##### 1.4 请求数据（`json`)

```
{
    question: Object //发布的问题
},
question {
    questionID: Number //问题索引
    title: String //问题的标题
    summary: String //对问题的简单描述，可选
    cover: image[url] //问题的图像封面链接，可选
    publisher: Object //发起问题的人的信息
    tag: Array<Object> //问题所属标签
},
```

**需要补充**



---



### 三、我的

---



#### 1. 获取个人信息

##### 1.1 接口功能

- 获取用户的个人信息

##### 1.2 接口地址（get)

- `url: '/api/userInfo'`

##### 1.3 响应数据（`json`）

```
{
    nickName: String //用户昵称
    avatar: image[url] //用户头像链接
    account: String //用户账号
}
```

##### 1.4 请求数据(无)

**使用session获取身份**



---



#### 2. 获取相关活跃信息

##### 2.1 接口功能

- 获取用户的获赞总数、发布问题总数、解决方案总数

##### 2.2 接口地址（get）

- `url: /api/activityInfo`

##### 2.3 响应数据(`json`)

```
{
    likes: Number //获赞总数
    questions: Number //提出问题总数
    solutions: Number //发布解决方案总数
}
```

##### 2.4 请求数据（无）

**使用session获取身份**



---



#### 3. 修改用户信息

##### 3.1 接口功能

- 修改用户的头像，昵称

##### 3.2 接口地址（post）

- `url: '/api/updateUser'`

##### 3.3 请求数据（`formData`）

```
{
    avatar: File | null // 用户头像文件，null则表示不修改
    nickName: String | null // 用户昵称，null表示不修改
}
```

##### 3.4 响应数据(`json`)

```
{
    statu: Boolean //修改请求状态，true: 成功; false: 失败;
    reason: String //失败理由
}
```



---



#### 4. 获取提出问题

##### 4.1 接口功能

- 获取用户提出的问题，分页获取

##### 4.2 接口地址(get)

- `url: '/api/myQuestion'`

##### 4.3 响应数据(`json`)

```
{
    questionList: Array<{
        title: String //问题的标题
        summary: String //问题的描述
        date: String //提出问题的时间
        questionID: Number //问题的标识,可以获取问题的信息
    }>
}
```


##### 4.4 请求数据（`type [ formData | json]`）

```
{}
```

**需要补充**



---



#### 5. 获取发布方案

##### 5.1 接口功能

- 获取用户发布的解决方案，分页获取

##### 5.2 接口地址(get)

- `url: '/api/myQuestion'`

##### 5.3 响应数据(`json`)

```
{
    solutionList: Array<{
        title: String //问题的标题
        summary: String //问题的描述
        questionID: [pending] //问题的标识,可以获取问题的信息
        solution: String //提出的解决方案
        date: String //发布解决方案的时间
    }>
}
```

##### 5.4 请求数据（`type [ formData | json]`）

```
{}
```

**需要补充**



---



### 四、其他

---



#### 1. 登录

##### 1.1 接口功能

- 用户进行登录

##### 1.2 接口地址（post)

- `url: /api/login`

##### 1.3 响应数据(`json`)

```
{
    statu: Boolean //请求响应状态，true: 成功; false: 失败
    reason: String //失败原因
}
```

##### 1.4 请求数据 (`json`)

```
{
    account: String //用户账号
    password: String //用户密码
}
```



---



#### 2. 验证登录状态

##### 2.1 接口功能

- 验证用户登录转台是否过期

##### 2.2 接口地址（get）

- `url: '/api/auth'`

##### 2.3 响应数据(`json`)

```
{
    statu: Boolean //验证状态，true: 已登录; false: 未登录|登录过期
    reason: String //失败理由
}
```

##### 2.4 请求数据(无)

**由session判断**



---



#### 3. 注册

##### 3.1 接口功能

- 新用户进行注册

##### 3.2 接口地址（post）

- `url: '/api/register'`

##### 3.3 响应数据（`json`）

```
{
    statu: Boolean //注册请求状态，true: 成功; false: 失败;
    reason: String //失败理由
}
```

##### 3.4 请求数据(`json`)

```
{
    email: String //邮箱
    password: String //密码
    vaildCode: String //验证码
}
```



---



#### 4. 获取验证码

##### 4.1 接口功能

- 获取用户用于注册账号需要的验证码

##### 4.2 接口地址（get）

- `url: 'api/getCode'`

##### 4.3 响应数据(`json`)

```
{
    statu: Boolean //获取状态，true: 获取成功; false: 获取失败
    reason: String //失败理由
    vaildCode: String //验证码，可选
}
```

##### 4.4 请求数据(`json`)

```
{
    email: String //邮箱
}
```



---



#### 5. 退出登录

##### 5.1 接口功能

- 用户退出系统

##### 5.2 接口地址（get）

- `url: 'api/quit'`

##### 5.3 响应数据(`json`)

```
{
    statu: Boolean //请求状态，true: 请求成功; false: 请求失败
    reason: String //失败理由
}
```

##### 5.4 请求数据(无)

**由session判断**



---



#### 6. 找回密码

##### 6.1 接口功能

- 用户重新设置密码

##### 6.2 接口地址（post）

- `url: 'api/reset'`

##### 6.3 响应数据(`json`)

```
{
    statu: Boolean //请求状态，true: 请求成功; false: 请求失败
    reason: String //失败理由
}
```

##### 6.4 请求数据(`json`)

```
{
    account: String //帐号
    newPassword: String //新的密码
    validateCode: String //验证码
}
```





