## upload-image 

### feature

选择图片组件

### use
```
在需要使用选择图片的地方使用<upload-image></upload-image>即可
```

### 代码演示

> 温馨提示：使用前请在页面配置文件(.json)中引入该组件

wxml代码
```wxml
<image-upload rule="{{imageRule}}" bind:imageChange="onImageChange" data-field="{{imageRule.name}}"></image-upload>
```

js代码
```js
Page({
  data: {
    imageRule: {
      name: 'faceUrls',
      label: '人脸照片',
      count: 1,
      required: true,
      // sourceType: ['album', 'camera']
      sourceType: ['camera']
    },
    faceUrls: [],
  },

  onImageChange: function(e) {
    const { field } = e.currentTarget.dataset
    const imgs = e.detail
    this.setData({
      [field]: imgs
    })
  },
})
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 输入规则 | Object | {} |
| bind:imageChange/bindimageChange | 监听选择图片改变事件 | Function(value: string) | - |

rule相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| label | 字段名，必传 | String |   |
| required | 是否必填 | Boolean | false |
| count | 图片数量 | Number | 1 |
| sourceType | 图片来源：camera-相机，album-相册 | Array | ['camera', 'album'] |