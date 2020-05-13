## idcard-input 

### feature

身份证输入框

### use
```
在需要使用身份证输入框的地方使用<idcard-input></idcard-input>即可
```

### 代码演示

> 温馨提示：使用前请在页面配置文件(.json)中引入该组件

wxml代码
```wxml
<idcard-input rule="{{idcardRule}}" bind:idcardChange="onComponentChange" data-field="{{idcardRule.name}}"></idcard-input>
```

js代码
```js
Page({
  data: {
    formData: {},
    idcardRule: {
      name: 'idcard',
      required: true,                             // 是否必填
      useImg: false,                              // 是否使用图片识别
      uploadImgUrl: '/api/xxx',                   // 身份证上传url
      uploadName: 'xxx',                          // 身份证上传name参数
    },
  },

  onComponentChange: function (e) {
    const { field } = e.currentTarget.dataset;
    const value = e.detail;
    this.setData({
      formData: {
        ...this.data.formData,
        [field]: value,
      }
    })
  },
})
```

> 温馨提示：若需使用拍照识别身份证号，需要后端实现相关api，并在 `components/idcard-input/index.js` 的 `132` 和 `135` 行修改返回的字段名（由于返回的格式太多变，所以没有做成配置项）

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 输入规则 | Object | {} |
| defaultValue | 默认值 | String |   |
| bind:idcardChange/bindidcardChange | 监听身份证输入框输入内容改变事件 | Function(value: string) | - |

rule相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| required | 是否必填 | Boolean | false |
| useImg | 是否允许上传身份证照片自动识别 | Boolean | false |
| uploadImgUrl | 身份证上传路径，useImg为true时该字段必填 | String | - |
| uploadName | 身份证上传name参数，useImg为true时该字段必填 | String | - |