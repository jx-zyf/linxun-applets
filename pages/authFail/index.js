//index.js
const app = getApp();

Page({
  data: {
    height: null,
  },

  onLoad: function() {
    // if (app.globalData.authorize) {
    //   wx.switchTab({
    //     url: '/pages/index/index'
    //   })
    // }
  },

  toAuthorize: function() {
    wx.openSetting({
      success: function(res) {
        console.log(res);
        wx.navigateBack({
          delta: 2
        })
        // if (res.authSetting["scope.userInfo"] && res.authSetting["scope.userLocation"] && res.authSetting["scope.record"]) {
        //   app.globalData.authorize = true;
        //   // wx.switchTab({
        //   //   url: '/pages/index/index'
        //   // })
        //   wx.navigateBack({
        //     delta: 2
        //   })
        // } else {
        //   app.globalData.authorize = false;
        //   // wx.switchTab({
        //   //   url: '/pages/index/index'
        //   // })
        //   wx.navigateBack({
        //     delta: 2
        //   })
        // }
      },
      fail: function() {
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // onGotUserInfo: function(e) {
  //   // 没有 用户信息的情况下
  //   if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
  //     wx.redirectTo({
  //       url: '/pages/authFail/index'
  //     })
  //   } else {
  //     wx.setStorageSync('userInfo', e.detail.userInfo);
  //     app.globalData.userInfo = e.detail.userInfo;
  //     wx.switchTab({
  //       url: '/pages/index/index'
  //     })
  //   }
  // }


})