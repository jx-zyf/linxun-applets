// components/linxun-phone-input/index.js
const utils = require('../../utils/util')
const { PHONE_REG } = require('../utils/reg.js')

Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this._getCode()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    rule: { // 相关参数
      type: Object,
      value: {
        required: false, // 是否必填
        useButton: false, // 是否使用自动获取
      },
    },
    defaultValue: {
      type: String,
      value: undefined,
      observer: function (newValue, oldValue) {
        if (newValue) {
          this.setData({
            phone: newValue,
          })
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    phone: undefined, // 手机号
    errorMsg: '', // 提示信息
    code: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getCode: function () {
      wx.login({
        success: (res) => {
          this.setData({
            code: res.code
          })
        }
      })
    },

    _onInputChange: function (e) {
      const value = e.detail.value
      const { required } = this.data.rule
      this.setData({
        errorMsg: required && !value ? '手机号是必填项' : '',
        phone: value,
      })
      if (value) {
        this.setData({
          errorMsg: !PHONE_REG.test(value) ? '手机号格式有误' : '',
          phone: value,
        })
      }
      this.triggerEvent('phoneChange', value)
    },

    _onInputBlur: function (e) {
      const { required } = this.data.rule
      const value = e.detail.value
      this.setData({
        errorMsg: required && !value ? '手机号是必填项' : '',
      })
      if (value) {
        this.setData({
          errorMsg: !PHONE_REG.test(value) ? '手机号格式有误' : '',
        })
      }
    },

    _getPhoneNumber: function (e) {
      const { code } = this.data
      console.log(code)
      utils.getPhoneNumer(e, code).then(phone => {
        this.setData({
          phone: phone
        })
        this._getCode()
      }).catch(error => {
        console.log(error)
        utils.showToast(error)
      })
    },
  }
})
