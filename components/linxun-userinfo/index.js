// pages/my-userinfo/index.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  attached: function () {
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo;
        this.triggerEvent('userinfoChange');
        this.setData({
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.triggerEvent('userinfoChange');
          this.setData({
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      if (e.detail.userInfo) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          hasUserInfo: true
        })
        this.triggerEvent('userinfoChange');
      } else if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        wx.navigateTo({
          url: '/pages/authFail/index'
        })
      }
    },
  }
})
