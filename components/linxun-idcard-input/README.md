### linxun-idcard-input 

#### feature

身份证输入框

#### use
```
在需要使用身份证输入框的地方使用<linxun-idcard-input></linxun-idcard-input>即可
```

所需参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| rule | 输入框规则 | Object | {} |
| bind:idcardChange/bindidcardChange | 监听身份证输入框输入内容改变事件 | Function(value: string) | - |

rule相关配置

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| required | 是否必填 | Boolean | false |
| useImg | 是否允许上传身份证照片自动识别 | Boolean | false |
| uploadImgUrl | 身份证上传路径，useImg为true时该字段必填 | String | - |
| uploadName | 身份证上传name参数，useImg为true时该字段必填 | String | - |