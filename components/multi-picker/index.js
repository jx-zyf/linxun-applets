// components/multi-picker/index.js
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
        level: -1,   // 级联层级，必填
        options: [], // 可选项数据源，必填
      },
      observer: function (newValue, oldValue) {
        if (!newValue.label) {
          console.error('linxun-multi-picker提示：label 未传入！')
        }
        if (!newValue.level) {
          console.error('linxun-multi-picker提示：level 未传入！')
        }
        if (!/^[1-9]{1}[0-9]*$/.test(newValue.level)) {
          console.error('linxun-multi-picker提示：level 格式有误！')
        }
        if (!newValue.options || !newValue.options.length) {
          console.error('linxun-multi-picker提示：options 未传入！')
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    selectValues: [], // 已选项
    multiText: '',
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
        console.error('linxun-multi-picker提示：label 未传入！')
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _changeVisible: function (visible) {
      this.setData({ visible });
    },
    _onOpen: function () {
      this._changeVisible(true);
    },
    _onClose: function () {
      this._changeVisible(false);
    },
    _onPickerChange: function (e) {
      const values = e.detail.options.map((n) => n.value);
      const multiText = e.detail.options.map((n) => n.label).join('/');
      const { label, required, level } = this.data.rule;
      this.setData({
        errorMsg: required && values.length < level ? `${label}是必选项` : '',
        multiText,
        selectValues: values,
      })
      this.triggerEvent('multiPickerChange', values)
    },
  }
})