// components/linxun-idcard-input/index.js
const constant = require('../../utils/constant')
const { UPLOAD_URL, IMGMOSESIZE } = constant
const { isIdCard } = require('../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rule: { // 相关参数
      type: Object,
      value: {
        required: false, // 是否必填
        useImg: false, // 是否使用图片识别
        uploadImgUrl: undefined, // 身份证上传url
        uploadName: undefined, // 身份证上传name参数
      },
      observer: function (newValue, oldValue) {
        if (newValue && newValue.useImg && !newValue.uploadImgUrl) {
          console.error('linxun-idcard-input提示：uploadImgUrl 未传入！')
        }
        if (newValue && newValue.useImg && !newValue.uploadName) {
          console.error('linxun-idcard-input提示：uploadName 未传入！')
        }
      },
    },
    defaultValue: {
      type: Object,
      value: { type: '1', value: undefined },
      observer: function (newValue, oldValue) {
        if (newValue && newValue.value) {
          this.setData({
            selectIndex: newValue.type === '1' ? 0 : 1,
            idCard: newValue.value,
          })
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    idCard: undefined, // 身份证号
    typeConfig: [
      { label: '身份证', value: '1' },
      { label: '其他', value: '2' },
    ],
    selectIndex: 0,
    errorMsg: '', // 提示信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onPickerChange: function (e) {
      const value = e.detail.value
      const { typeConfig, idCard } = this.data
      this.setData({
        selectIndex: ~~value,
      })
      this.triggerEvent('idcardChange', {
        type: typeConfig[~~value].value,
        value: idCard,
      })
    },

    _onInputChange: function(e) {
      const value = e.detail.value
      const { required } = this.data.rule
      const { typeConfig, selectIndex } = this.data
      this.setData({
        errorMsg: required && !value ? '证件号是必填项' : '',
        idCard: value,
      })
      if (value) {
        this.setData({
          errorMsg: selectIndex === 0 && !isIdCard(value) ? '证件号不合法' : '',
          idCard: value,
        })
      }
      this.triggerEvent('idcardChange', {
        type: typeConfig[selectIndex].value,
        value,
      })
    },

    _onInputBlur: function(e) {
      const { required } = this.data.rule
      const value = e.detail.value
      const { selectIndex } = this.data
      this.setData({
        errorMsg: required && !value ? '证件号是必填项' : '',
      })
      if (value) {
        this.setData({
          errorMsg: selectIndex === 0 && !isIdCard(value) ? '证件号不合法' : '',
        })
      }
    },

    _chooseImage: function () {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: (res) => {
          if (res.errMsg === 'chooseImage:ok') {
            const { uploadImgUrl, uploadName } = this.data.rule
            const filePath = res.tempFilePaths[0]
            if (IMGMOSESIZE) {
              const tempFile = res.tempFiles[0]
              if (tempFile.size > IMGMOSESIZE * 1024 * 1000) {
                utils.showMsg(`您的图片超过${IMGMOSESIZE}M，请重新选择`)
                return
              }
            }
            wx.showLoading({
              title: '上传中...',
            })
            wx.uploadFile({
              url: `${UPLOAD_URL}${uploadImgUrl}`,
              filePath,
              name: uploadName,
              success: uploadRes => {
                wx.hideLoading()
                const data = JSON.parse(uploadRes.data)
                if (data && data.success) {
                  this.setData({
                    idCard: data.result.identify_no,
                    errorMsg: '',
                  })
                  this.triggerEvent('idcardChange', data.result.identify_no)
                } else {
                  wx.showToast({
                    title: data.errMsg || '上传失败！请重试',
                    icon: 'none',
                  })
                }
              }
            })
          } else {
            wx.showToast({
              title: '请重新选择',
              icon: 'none',
            })
          }
        },
      })
    },
  }
})