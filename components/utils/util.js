
// 判断身份证是否有效
const isIdCard = (val) => {
  // 香港身份证号码校验
  // 开头一位或两位大写字母，然后接上6-10位数字，最后一位数字或字母校验
  const isMatchHongKong = /^[a-zA-Z]{1,2}[0-9]{6,10}[0-9A-Za-z]$/

  // 澳门身份证号码校验
  // 开头数字1或者5或者7，然后接上6位数字，再接上一位数字或者大写字母校验
  const isMatchAoMen = /^[1|5|7][0-9]{6}[0-9A-Za-z]$/

  // 台湾身份证号码校验
  // 开头一位小写或者大写字母，接上9位数字
  const isMatchTaiWan = /^[a-zA-Z][0-9]{9}$/
  if (isMatchHongKong.test(val) || isMatchAoMen.test(val) || isMatchTaiWan.test(val)) {
    return true
  }
  const kindArray = ['81', '82', '83']
  const targetVal = val.slice(0, 2)
  if (kindArray.includes(targetVal)) {
    return true
  } else {
    const isMatchCard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!isMatchCard.test(val)) {
      return false;
    }
    const arr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const arr2 = val.split('')
    let total = 0
    for (let i = 0; i < arr.length; i++) {
      total += ~~arr[i] * ~~arr2[i]
    }
    // 最后一位
    const last = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2][total % 11]
    return arr2[arr2.length - 1].toString().toUpperCase() == last.toString().toUpperCase()
  }
}

module.exports = {
  isIdCard
}