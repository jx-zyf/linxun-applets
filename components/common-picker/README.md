## common-picker

### feature

弹出滚动器单选

### use
```
在需要使用弹出滚动器单选的地方使用<common-picker></common-picker>即可
```

### 代码演示

> 温馨提示：使用前请在页面配置文件(.json)中引入该组件

wxml代码
```wxml
<common-picker rule="{{pickerRule}}" bind:pickerChange="onPickerComponentChange" data-field="selectPickerIndex"></common-picker>
```

js代码
```js
Page({
  data: {
    pickerRule: {
      name: 'hobby',
      label: '爱好',
      required: true,
      rangeKey: 'title',
      ranges: [
        { title: '吃饭' },
        { title: '睡觉' },
        { title: '敲代码' },
      ]
    },
    selectPickerIndex: -1，
  },

  onPickerComponentChange: function(e) {
    const { field } = e.currentTarget.dataset
    const index = e.detail
    this.setData({
      [field]: index
    })
  },
})
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 规则 | Object |   |
| bind:pickerChange/bindpickerChange | 监听单选框选中内容改变事件 | Function(selectIndex: string) | - |

rule 相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| label | 字段名，必传 | String |   |
| required | 是否必填 | Boolean | false |
| rangeKey | 显示内容的key | String | label |
| ranges | 单选数组 | Array | [] |