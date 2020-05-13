// pages/authFail/index.js//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function () {
    
  },

  toAuthorize: function () {
    wx.openSetting({
      success: function (res) {
        console.log(res)
        wx.navigateBack({
          delta: 2
        })
      },
      fail: function () {
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})