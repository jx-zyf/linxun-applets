// components/linxun-common-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rule: { // 相关参数
      type: Object,
      value: {
        label: undefined, // 字段名，必填
        required: false,  // 是否必填
        type: 'text',     // 输入框类型，默认文本类型
        max: -1,          // 最大长度
      },
    },
    defaultValue: {
      type: String,
      value: undefined,
      observer: function (newValue, oldValue) {
        if (newValue) {
          this.setData({
            inputVal: newValue,
          })
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputVal: undefined,   // 输入框内容
    errorMsg: '',   // 提示信息
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const { label } = this.data.rule
      if (!label) {
        console.error('linxun-common-input提示：label 未传入！')
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onInputChange: function (e) {
      const value = e.detail.value
      const { label, required, pattern } = this.data.rule
      this.setData({
        errorMsg: required && !value ? `${label}是必填项` : '',
        inputVal: value,
      })
      this.triggerEvent('inputChange', value)
    },

    _onInputBlur: function (e) {
      const { label, required, pattern } = this.data.rule
      const value = e.detail.value
      this.setData({
        errorMsg: required && !value ? `${label}是必填项` : '',
      })
      // if (value && pattern) {
      //   this.setData({
      //     errorMsg: !pattern.test(value) ? `${label}格式有误` : '',
      //   })
      // }
    },
  }
})
