## phone-input 

### feature

手机号输入框

### use
```
在需要使用手机号输入框的地方使用<phone-input></phone-input>即可
```

### 代码演示

> 温馨提示：使用前请在页面配置文件(.json)中引入该组件

wxml代码
```wxml
<phone-input rule="{{phoneRule}}" bind:phoneChange="onComponentChange" data-field="{{phoneRule.name}}"></phone-input>
```

js代码
```js
Page({
  data: {
    formData: {},
    phoneRule: {
      name: 'phone',
      required: true,                             // 是否必填
      useButton: false,                           // 是否可以自动获取
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

> 温馨提示：使组件内调用了 `utils/util.js` 中的获取手机号 `getPhone` 公用方法，需根据后端接口自行调整api地址和返回参数（在 `utils/util.js` 中修改 `getPhone` 方法）

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 输入框规则 | Object | {} |
| defaultValue | 默认值 | String | - |
| bind:phoneChange/bindphoneChange | 监听手机号输入框内容改变 | Function(value: string) | - |

rule相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| required | 是否必填 | Boolean | false |
| useButton | 是否允许自动获取手机号 | Boolean | false |