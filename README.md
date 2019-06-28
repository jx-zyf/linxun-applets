## 元羿-小程序业务常用组件

### 目标组件

- [x] 获取用户信息
- [x] 身份证输入框
- [x] 手机号输入框
- [x] 普通文本输入框
- [ ] 地理位置输入框
- [ ] 单张图片上传
- [ ] 多张图片上传
- [ ] ······

### 仅供公司内部小程序使用

项目目录结构

```md
├─components                    # 自定义组件
│  ├─linxun-common-input        # 普通输入框
│  ├─linxun-idcard-input        # 身份证输入框
│  ├─linxun-phone-input         # 手机号输入框
│  ├─linxun-userinfo            # 获取用户信息
│  ├─style                      # 自定义组件公用样式
│  └─utils                      # 自定义组件工具库
├─pages
│  ├─authFail                   # 重新授权页
│  └─demo                       # 组件使用demo页
├─style                         # 项目公用样式
└─utils                         # 项目公用工具库
```