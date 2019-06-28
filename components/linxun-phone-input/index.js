// components/linxun-phone-input/index.js
const constant = require('../../utils/constant');
const { BASEURL, IMGMOSESIZE } = constant;
const { PHONE_REG } = require('../utils/reg.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rule: { // 相关参数
      type: Object,
      value: {
        required: false, // 是否必填
        useButton: false, // 是否使用自动获取
        getPhoneUrl: undefined, // 获取手机号url
      },
      observer: function (newValue, oldValue) {
        if (newValue.useButton && !newValue.getPhoneUrl) {
          console.error('linxun-phone-input提示：getPhoneUrl 未传入！');
        }
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    phone: undefined, // 手机号
    errorMsg: '', // 提示信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onInputChange: function (e) {
      const value = e.detail.value;
      this.setData({
        phone: value,
      })
      this.triggerEvent('phoneChange', value);
    },

    _onInputBlur: function (e) {
      const { required } = this.data.rule;
      const value = e.detail.value;
      this.setData({
        errorMsg: required && !value ? '手机号是必填项' : '',
      });
      if (value) {
        this.setData({
          errorMsg: !PHONE_REG.test(value) ? '手机号格式有误' : '',
        });
      }
    },

    _getPhoneNumber: function (e) {
      if (e.detail.errMsg === 'getPhoneNumber:ok') {
        const { encryptedData, iv } = e.detail;
        const { getPhoneUrl } = this.data.rule;
        wx.login({
          success: response => {
            wx.request({
              url: `${BASEURL}${getPhoneUrl}`,
              method: 'POST',
              data: {
                code: response.code,
                encryptedData,
                iv,
              },
              success: res => {
                const data = res.data;
                if (data && data.success) {
                  this.setData({
                    phone: data.result.phone,
                  })
                  this.triggerEvent('phoneChange', data.result.phone);
                } else {
                  wx.showToast({
                    title: '获取失败！请手动填写',
                    icon: 'none',
                  })
                }
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '授权失败！',
          icon: 'none',
        })
      }
    },
  }
})
