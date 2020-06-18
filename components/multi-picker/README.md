## multi-picker

### feature

弹出滚动器级联选择

> 基于 [Wux Weapp](https://www.wuxui.com/#/cascader)，站在巨人的肩膀上就是好

### use
```
在需要使用弹出滚动器单选的地方使用<multi-picker></multi-picker>即可
```

### 代码演示

> 温馨提示：使用前请在页面配置文件(.json)中引入该组件

wxml代码
```wxml
<multi-picker rule="{{pickerRule}}" bind:multiPickerChange="onPickerComponentChange" data-field="selectPickerValues"></multi-picker>
```

js代码
```js
Page({
  data: {
    pickerRule: {
      name: 'area',
      label: '地区选择',
      required: true,
      options: [
        {
          label: '广东省',
          value: '广东省id',
          children: [
            {
              label: '深圳市',
              value: '深圳市id'
            }
          ]
        }
      ]
    },
    selectPickerIndex: []，
  },

  onPickerComponentChange: function(e) {
    const { field } = e.currentTarget.dataset;
    const values = e.detail;
    this.setData({
      [field]: values
    })
  },
})
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 规则 | Object |   |
| bind:multiPickerChange/bindmultiPickerChange | 监听级联选择框选中内容改变事件 | Function(selectValues: array) | - |

rule 相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| label | 字段名，必传 | String |   |
| required | 是否必填 | Boolean | false |
| level | 层级，必传，且大于0 | Number |  |
| options | 可选项数据源，必填 | Array | [] |

options 配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| label | 描述 | String |   |
| value | 属性值 | String |  |
| children | 子选项 | Array | [] |

> 由于本人不能忍受 `wx:key` 的警告，所以 `options` 暂时只支持 `label` `value` 和 `children`