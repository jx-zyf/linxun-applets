// pages/basicInfo/index.js
const app = getApp()
const constant = require('../../utils/constant.js')
const utils = require('../../utils/util')

Page({

  data: {
    userInfo: null,
  },

  onLoad: function(options) {
    const { userInfo } = app.globalData
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }
  },

  getUserInfo: function(e) {
    utils.getUserInfo(e).then(userInfo => {
      console.log(userInfo);
      this.setData({
        userInfo: userInfo
      })
    })
  },
})