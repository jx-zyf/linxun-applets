//获取应用实例
const app = getApp()
const constant = require('../../utils/constant.js')
const utils = require('../../utils/util')

Page({
  data: {
    userInfo: null,
    formData: {},
    commonRule: {
      name: 'name',
      label: '姓名',
      required: true,
    },
    phoneRule: {
      name: 'phone',
      required: true,                             // 是否必填
      useButton: false,                           // 是否可以自动获取
    },
    idcardRule: {
      name: 'idcard',
      required: true,                             // 是否必填
      useImg: false,                              // 是否使用图片识别
      uploadImgUrl: '/api/xxx',                   // 身份证上传url
      uploadName: 'xxx',                          // 身份证上传name参数
    },
    pickerRule: {
      name: 'hobby',
      label: '爱好',
      required: true,
      rangeKey: 'title',
      ranges: [
        { title: '吃饭' },
        { title: '睡觉' },
        { title: '敲代码' },
      ]
    },
    selectPickerIndex: -1,
    imageRule: {
      name: 'faceUrls',
      label: '人脸照片',
      count: 1,
      required: true,
      // sourceType: ['album', 'camera']
      sourceType: ['camera']
    },
    faceUrls: [],
  },

  onLoad: function() {
    
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

  onPickerComponentChange: function(e) {
    const { field } = e.currentTarget.dataset
    const index = e.detail
    this.setData({
      [field]: index
    })
  },

  onImageChange: function(e) {
    const { field } = e.currentTarget.dataset
    const imgs = e.detail
    this.setData({
      [field]: imgs
    })
  },

  submit: function () {
    const { formData, selectPickerIndex, faceUrls } = this.data;
    console.log(formData, selectPickerIndex, faceUrls);
  }
})