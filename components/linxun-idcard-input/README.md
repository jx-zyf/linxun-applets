### linxun-idcard-input 

#### feature

身份证输入框

#### use

在需要使用身份证输入框的地方使用<code><linxun-idcard-input></linxun-idcard-input></code>即可

所需参数
* rule：Object类型，非必传，输入框相关规则
    * required：Boolean类型，身份证是否为必填字段，默认false
    * useImg：Boolean类型，是否允许上传身份证照片自动识别，默认false
    * uploadImgUrl：String类型，身份证上传路径，useImg为true时该字段必填
    * uploadName：String类型，身份证上传name参数，useImg为true时该字段必填
* bind:idcardChange="Your Function"：监听身份证输入框输入内容改变事件，父组件可以在这里拿到输入框的值