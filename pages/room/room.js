// room.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rooms: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.wuziyi.cc/?wechat/wuzi/rooms&app=sg',
      success: function (res) {
        console.debug(res.data);
        var data = res.data;
        for (var k in data) {
            for (var pid in data[k].players) {
              data[k].players[pid].showNick = false;
            }
        }
        that.setData({
          rooms: data
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  showNick: function(event) {
    console.debug(event);
    var rk = event.currentTarget.dataset.room;
    var pk = event.currentTarget.dataset.player;

    var data = this.data.rooms;
    for (var k in data) {
      for (var pid in data[k].players) {
        data[k].players[pid].showNick = false;
      }
    }
    data[rk].players[pk].showNick = true;

    this.setData({
      rooms: data
    })
  }
})