### linxun-phone-input 

#### feature

手机号输入框

#### use
```
在需要使用手机号输入框的地方使用<linxun-phone-input></linxun-phone-input>即可
```

所需参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 输入框规则 | Object | {} |
| bind:phoneChange/bindphoneChange | 监听手机号输入框内容改变 | Function(value: string) | - |

rule相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| required | 是否必填 | Boolean | false |
| useButton | 是否允许自动获取手机号 | Boolean | false |
| getPhoneUrl | 自动获取手机号路径，useButton为true时该字段必填 | String | - |