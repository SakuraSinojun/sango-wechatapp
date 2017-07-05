//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.debug("click");
    wx.navigateTo({
      url: '../room/room'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    wx.navigateTo({ url: "../room/room" });
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})