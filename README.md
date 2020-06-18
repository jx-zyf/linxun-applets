## 小程序业务常用组件及方法

### 组件

- [x] 普通文本输入框
- [x] 身份证输入框
- [x] 手机号输入框
- [x] 弹窗单选
- [x] 选择图片
- [x] 级联选择
- [ ] 单选框
- [ ] 复选框
- [ ] ······

### 方法

> 常用方法封装在 `utils/util.js` 中

- [x] 提示 `showToast`
- [x] 获取用户微信信息 `getUserInfo`
- [x] 自动获取手机号 `getPhoneNumer`
- [x] 上传图片 `uploadImg`
- [x] 获取token `getToken`
- [x] 接口请求 `myRequest`
- [x] 获取经纬度及地址 `getLocation`  // 需要在 `utils/constant.js` 中配置百度地图ak
- [x] 获取url中的参数 `getUrlParam`
- [x] 防抖 `debounce`
- [x] 节流 `throttle`
- [x] 判断身份证是否有效 `isIdCard`
- [ ] ······

### 方便自己使用

项目目录结构

```md
├─components                    # 自定义组件
│  ├─-common-input              # 普通输入框
│  ├─-common-picker             # 弹窗单选
│  ├─-idcard-input              # 身份证输入框
│  ├─-phone-input               # 手机号输入框
│  ├─-image-upload              # 图片上传
│  ├─style                      # 自定义组件公用样式
│  └─utils                      # 自定义组件工具库
    ├─constant.js               # 常量配置文件
    ├─reg.js                    # 常用正则表达式
    ├─mapConvertor.js           # 经纬度格式转换
    └─util.js                   # 常用工具函数                   
├─pages
│  ├─authFail                   # 重新授权页
│  └─home                       # 组件使用demo页
│  └─mine                       # 个人中心页
│  └─basicInfo                  # 个人信息页
├─style                         # 项目公用样式
└─utils                         # 项目公用工具库
```