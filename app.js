//app.js
App({

  loginPlayer: function() {
    var that = this;
    wx.request({
      url: "https://www.wuziyi.cc/?wechat/wuzi/player&app=sg&openid=" + that.globalData.openid + "&nick=" + that.globalData.userInfo.nickName + "&faceurl=" + encodeURIComponent(that.globalData.userInfo.avatarUrl),
      success: function (res) {
        console.debug(res);
        that.globalData.player = res.data.id;
      }
    })
  },
  saveOpenId: function(res) {
    var that = this;
    wx.request({
      url: 'https://www.wuziyi.cc/?wechat/admin/jscode2session&app=sg&code=' + res.code,
      success: function (res) {
        console.debug(res.data);
        that.globalData.openid = res.data.openid;
        that.saveUserInfo();
      }
    });
  },
  saveUserInfo: function() {
    var that = this;
    this.getUserInfo(function (userInfo) {
      that.globalData.userInfo = userInfo;
      that.loginPlayer();
    })
  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          that.saveOpenId(res);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  getOpenId: function() {
    return this.globalData.openid;
  },

  globalData: {
    userInfo: null,
    openid: null,
    player: null
  }
})
