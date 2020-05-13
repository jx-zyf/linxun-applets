const CARD_REG = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

const PHONE_REG = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

const CAR_REG = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[DF]?[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}[DF]?$/

const HM_REG = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/   // 港澳通行证

const TW_REG = /^([0-9]{8}|[0-9]{10})$/            // 台湾通行证

const PASSPORT_REG = /^[a-zA-Z0-9]{5,17}$/         // 护照

module.exports = {
  CARD_REG,
  PHONE_REG,
  CAR_REG,
  HM_REG,
  TW_REG,
  PASSPORT_REG,
}