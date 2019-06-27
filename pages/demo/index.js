//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    formData: {},
    idcardRule: {
      required: true,                             // 是否必填
      useImg: true,                               // 是否使用图片识别
      uploadImgUrl: '/api/upload/identifyNo',      // 身份证上传url
      uploadName: 'identify_card',                // 身份证上传name参数
    }
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
  },

  userinfoChange: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },

  onComponentChange: function (e) {
    const { field } = e.currentTarget.dataset;
    const value = e.detail;
    this.setData({
      formData: {
        ...this.data.formData,
        [field]: value,
      }
    })
  },

  submit: function () {
    console.log(this.data.formData);
  }
})