// components/linxun-common-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {      // 字段名，必填
      type: String,
      value: undefined,
    },
    required: {    // 是否必填
      type: Boolean,
      value: false,
    },
    // pattern: {    // 校验正则  20190628 传递失败，待解决
    //   type: RegExp,
    //   value: undefined,
    // },
    type: {    // 输入框类型，默认文本类型
      type: String,
      value: 'text',
    },
    max: {    // 最大长度
      type: Number,
      value: -1,
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
      const { label } = this.data;
      if (!label) {
        console.error('linxun-common-input提示：label 未传入！');
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onInputChange: function (e) {
      const value = e.detail.value;
      this.setData({
        inputVal: value,
      })
      this.triggerEvent('inputChange', value);
    },

    _onInputBlur: function (e) {
      const { label, required, pattern } = this.data;
      const value = e.detail.value;
      this.setData({
        errorMsg: required && !value ? `${label}是必填项` : '',
      });
      // if (value && pattern) {
      //   this.setData({
      //     errorMsg: !pattern.test(value) ? `${label}格式有误` : '',
      //   });
      // }
    },
  }
})
