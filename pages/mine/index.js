// pages/mine/index.js
const app = getApp()
const constant = require('../../utils/constant.js')
const utils = require('../../utils/util')

Page({
  data: {
    userInfo: null,
  },

  onLoad: function () {

  },

  onShow: function () {
    const { userInfo } = app.globalData
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  getUserInfo: function (e) {
    utils.getUserInfo(e).then(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    })
  },
  
  toBasicInfo: function () {
    wx.navigateTo({
      url: '/pages/basicInfo/index',
    })
  },

  about: function () {
    wx.showModal({
      title: '关于',
      content: '我是林寻',
      showCancel: false,
    })
  }
})