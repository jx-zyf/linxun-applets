// components/image-upload/index.js
const constant = require('../../utils/constant')
const utils = require('../../utils/util')
const { IMGMOSESIZE } = constant

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rule: {
      type: Object,
      value: {
        label: undefined, // 字段名，必填
        required: false,  // 是否必填
        count: 1,         // 图片张数
        sourceType: ['camera', 'album'],
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    curImgs: [],
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const { label } = this.data.rule
      if (!label) {
        console.error('image-upload提示：label 未传入！')
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择图片
    _chooseImage: function (e) {
      const { count = 1, sourceType = ['camera', 'album'] } = this.data.rule
      const { curImgs } = this.data
      wx.chooseImage({
        count: count - curImgs.length,
        sourceType: sourceType,
        sizeType: ['compressed'],
        success: res => {
          if (res && res.errMsg === 'chooseImage:ok') {
            let morethen = []
            res.tempFiles.map(item => {
              if (item.size > constant.IMGMOSESIZE * 1024 * 1000) {
                morethen.push(item.path)
                utils.showToast(`已为您过滤超过${IMGMOSESIZE}M的照片`)
              }
            })
            this.setData({
              curImgs: curImgs.concat(res.tempFilePaths.filter(item => !morethen.includes(item)))
            }, () => {
              this.triggerEvent('imageChange', this.data.curImgs)
            })
          } else {
            utils.showToast('请重新选择')
          }
        },
        fail: err => {
          console.log(err)
          utils.showToast('未选择图片')
        }
      })
    },

    // 预览图片
    _previewMultipleImage: function(e) {
      const { curImgs } = this.data
      wx.previewImage({
        current: e.currentTarget.id,
        urls: curImgs,
      })
    },

    // 删除图片
    _deleteImage: function (e) {
      const imgArr = this.data.curImgs
      const index = e.currentTarget.dataset.index
      imgArr.splice(index, 1)
      this.setData({
        curImgs: imgArr,
      }, () => {
        this.triggerEvent('imageChange', this.data.curImgs)
      })
    },
  }
})