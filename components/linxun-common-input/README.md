### linxun-common-input 

#### feature

通用输入框

#### use
```
在需要使用输入框的地方使用<code><linxun-common-input></linxun-common-input></code>即可
```

所需参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| label | 字段名，必传 | String |   |
| required | 是否必填 | Boolean | false |
| type | 输入框类型 | String | text |
| max | 输入框最大长度 | Number | -1，无长度限制 |
| ~~pattern~~ | ~~输入内容正则校验~~ | ~~RegExp~~ | ~~暂未实现~~ |
| bind:inputChange/bindinputChange | 监听输入框输入内容改变事件 | Function(value: string) | - |