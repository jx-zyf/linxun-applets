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
    multiPickerRule: {
      name: 'multiPicker',
      label: '级联选择',
      required: true,
      level: 3,   // 层级，防止未完全选择
      options: [{
        label: '广东省',
        value: '1',
        children: [{
          label: '深圳市',
          value: '1-1',
          children: [{
            label: '南山区',
            value: '1-1-1',
          }, {
            label: '宝安区',
            value: '1-1-2',
          }, {
            label: '龙华区',
            value: '1-1-3',
          }]
        }, {
          label: '广州市',
          value: '1-2',
          children: [{
            label: '天河区',
            value: '1-2-1',
          }, {
            label: '番禺区',
            value: '1-2-2',
          }]
        }]
      }, {
        label: '江西省',
        value: '2',
        children: [{
          label: '南昌市',
          value: '2-1',
          children: [{
            label: '青山湖区',
            value: '2-1-1',
          }, {
            label: '进贤县',
            value: '2-1-2',
          }]
        }, {
          label: '赣州市',
          value: '2-2',
          children: [{
            label: '章贡区',
            value: '2-2-1',
          }, {
            label: '南康区',
            value: '2-2-2',
          }]
        }]
      }]
    },
    selectMultiPickerValue: [],
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
    const { 
      formData, 
      selectPickerIndex, 
      faceUrls, 
      selectMultiPickerValue 
    } = this.data;
    console.log(formData, selectPickerIndex, faceUrls, selectMultiPickerValue);
  }
})