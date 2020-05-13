## common-input 

### feature

通用输入框

### use
```
在需要使用输入框的地方使用<common-input></common-input>即可
```

### 代码演示

> 温馨提示：使用前请在页面配置文件(.json)中引入该组件

wxml代码
```wxml
<common-input rule="{{commonRule}}" bind:inputChange="onComponentChange" data-field="{{commonRule.name}}"></common-input>
```

js代码
```js
Page({
  data: {
    formData: {},
    commonRule: {
      name: 'name',
      label: '姓名',
      required: true,
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

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 输入规则 | Object |   |
| defaultValue | 默认值 | String |   |
| bind:inputChange/bindinputChange | 监听输入框输入内容改变事件 | Function(value: string) | - |

rule相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| label | 字段名，必传 | String |   |
| required | 是否必填 | Boolean | false |
| type | 输入框类型 | String | text |
| max | 输入框最大长度 | Number | -1，无长度限制 |
| ~~pattern~~ | ~~输入内容正则校验~~ | ~~RegExp~~ | ~~暂未实现~~ |