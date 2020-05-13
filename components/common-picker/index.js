// components/common-picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rule: {
      type: Object,
      value: {
        label: undefined, // 字段名，必填
        required: false, // 是否必填
        rangeKey: 'label', // 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容，默认为label
        ranges: [], // 单选数组，必填
      },
      observer: function (newValue, oldValue) {
        if (!newValue.label) {
          console.error('linxun-common-picker提示：label 未传入！')
        }
        if (!newValue.ranges || !newValue.ranges.length) {
          console.error('linxun-common-picker提示：ranges 未传入！')
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: -1, // 滚动选择器下标
    errorMsg: '', // 提示信息
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const { label } = this.data.rule
      if (!label) {
        console.error('linxun-common-picker提示：label 未传入！')
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onPickerChange: function (e) {
      const value = e.detail.value
      const { label, required } = this.data.rule
      this.setData({
        errorMsg: required && !value ? `${label}是必选项` : '',
        selectIndex: value,
      })
      this.triggerEvent('pickerChange', value)
    },
  }
})