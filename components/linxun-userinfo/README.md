### linxun-userinfo 

#### feature

获取用户微信信息

#### use

```
在需要用户信息的page外层套上<linxun-userinfo></linxun-userinfo>即可，前提是需要在页面配置文件加上改该组件的引用
```

所需参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| bind:userinfoChange/binduserinfoChange | 用户授权后的回调，在这里一定可以获取到app.globalData.userInfo，一般当页面需要userInfo渲染时才需要，若只是需要接口调用传参使用可不监听此事件 | Function | - |
