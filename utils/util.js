const app = getApp()
const constant = require('./constant')
const { wgs2bd } = require('./mapConvertor')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const showToast = (text, type = 'none', duration = 2000) => {
  wx.showToast({
    title: text,
    icon: type,
    duration: duration
  })
  setTimeout(() => {
    wx.hideToast()
  }, duration)
}

const getUserInfo = e => {
  return new Promise((resolve, reject) => {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      resolve(e.detail.userInfo)
    } else {
      showToast('取消授权')
      resolve('取消授权')
    }
  })
}

const getPhoneNumer = (e, code) => {
  wx.showLoading({
    title: '正在获取...',
    mask: true,
  })
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        getPhone(e, code, resolve, reject)
      },
      fail: () => {
        wx.login({
          success: (res) => {
            getPhone(e, res.code, resolve, reject)
          }
        })
      }
    })
  })

}

const getPhone = (e, code, resolve, reject) => {
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    const {
      encryptedData,
      iv
    } = e.detail
    wx.request({
      url: `${constant.BASEURL}/api/wx/decryptPhone`,
      method: 'POST',
      data: {
        code: code,
        encryptedData,
        iv
      },
      success: res => {
        wx.hideLoading()
        if (res && res.data.success && res.data.result.checker_phone) {
          resolve(res.data.result.checker_phone)
        } else {
          showToast('获取失败！请重试或手动填写')
        }
      },
      fail: err => {
        wx.hideLoading()
        showToast('获取失败！请重试或手动填写！')
      }
    })
  } else {
    showToast('授权失败！')
    reject('授权失败！')
  }
}

// 判断是否为json (其实不严谨)
const isJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const uploadImg = filePath => {
  wx.showLoading({
    title: '图片上传中...',
    mask: true,
  })
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${constant.UPLOAD_URL}/api/upload/image`,
      filePath,
      name: 'image',
      success: res => {
        wx.hideLoading()
        if (res.errMsg === 'uploadFile:ok') {
          const data = isJson(res.data) ? JSON.parse(res.data) : res.data
          if (data && data.success) {
            resolve(data.result.upload_path)
          } else {
            reject('上传失败！请重试')
            showToast(data.errMsg || '上传失败！请重试')
          }
        } else {
          reject('上传失败！请重试')
          showToast(data.errMsg || '上传失败！请重试')
        }
      },
      fail: err => {
        console.log(err)
        wx.hideLoading()
        reject('网络错误！请重试')
        showToast('网络错误！请重试')
      }
    })
  })
}

const getToken = () => {
  wx.showLoading({
    title: '加载中...',
    mask: true,
  })
  return new Promise((resolve, reject) => {
    wx.login({
      success: wxRes => {
        myRequest({
          url: `${constant.BASEURL}/api/wx/authToken`,
          data: {
            code: wxRes.code
          }
        }).then(res => {
          resolve(res)
        }).catch(error => {
          console.log(error)
          showToast(error)
        })
      },
      fail: error => {
        console.log(error)
      }
    })
  })
}

const myRequest = (obj) => {
  wx.showLoading({
    title: '加载中...',
    mask: true,
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...obj,
      success: res => {
        wx.hideLoading()
        if (res && res.data.success) {
          resolve(res.data.result)
        } else {
          if (res.data.errCode === -300) {
            // token 失效，重新获取token
            getToken().then(getTokenRes => {
              app.globalData.isRegister = getTokenRes.is_bind
              app.globalData.token = getTokenRes.token
              wx.setStorageSync('user_identity', '1')
              // 重新请求
              wx.showLoading({
                title: '加载中...',
                mask: true,
              })
              wx.request({
                ...obj,
                data: {
                  ...obj.data,
                  wx_token: getTokenRes.token
                },
                success: res => {
                  wx.hideLoading()
                  if (res && res.data.success) {
                    resolve(res.data.result)
                  } else {
                    reject(res.data.errMsg || '系统错误')
                  }
                },
                fail: err => {
                  console.log(err)
                  wx.hideLoading()
                  reject('网络错误！请重试')
                }
              })
            })
          } else {
            reject(res.data.errMsg || '系统错误')
          }
        }
      },
      fail: err => {
        console.log(err)
        wx.hideLoading()
        reject('网络错误！请重试')
      }
    })
  })
}

// 获取经纬度及地址
const getLocation = () => {
  wx.showLoading({
    title: '加载中...',
    mask: true,
  })
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success: (wxLocationRes) => {
        wx.hideLoading()
        const result = wgs2bd({
          x: wxLocationRes.longitude,
          y: wxLocationRes.latitude
        })
        wx.request({
          url: `${constant.BDMAPURL}?location=${result.y},${result.x}&output=json&ak=${constant.BDMAPAK}`,
          success: res => {
            wx.hideLoading()
            if (res && res.errMsg === 'request:ok' && res.data.status === 0) {
              const {
                province,
                city,
                district,
                street,
                street_number
              } = res.data.result.addressComponent
              resolve({
                // longitude: result.x,
                // latitude: result.y,
                longitude: wxLocationRes.longitude,
                latitude: wxLocationRes.latitude,
                address: `${province}-${city}-${district}-${street}${street_number}`
              })
            } else {
              console.log(res.data.message)
              showToast('获取地理位置失败')
            }
          }
        })
      },
      fail: (res) => {
        wx.hideLoading()
        resolve('getLocation:fail')
        console.log(res)
        const errMsgs = ['getLocation:fail system permission denied', 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF']
        const authFailMsgs = ['getLocation:fail auth deny', 'getLocation:fail authorize no response']
        if (errMsgs.includes(res.errMsg)) {
          wx.showModal({
            title: '提示',
            content: '请先打开手机定位',
            showCancel: false,
          })
        } else if (authFailMsgs.includes(res.errMsg)) {
          wx.navigateTo({
            url: '/pages/authFail/index'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.errMsg,
            showCancel: false,
          })
        }
      }
    })
  })
}

// 获取url中的参数
const getUrlParam = (url, name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
  const r = url.split('?') && url.split('?')[1] 
    ? url.split('?')[1].match(reg) 
    : null //匹配目标参数
  if (r !== null) return decodeURI(r[2])
  return null //返回参数值
}

// 获取指定日期字符串（n天前/后）
const getDateStr = (dayCount, format = '-') => {
  /**
   * dayCount: 天数，可为负数
   * format: 日期格式，默认为 -
   */
  const now = new Date()
  now.setDate(now.getDate() + dayCount) // 获取dayCount天后的日期
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 获取当前月份的日期
  const day = now.getDate()

  return [year, month, day].map(formatNumber).join(format)
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

// 防抖
const debounce = (fn, time = 1000) => {
  let timeout = null
  return function() {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

// 节流
const throttle = (fn, time = 1000) => {
  let canRun = true
  return function() {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, time)
  }
}

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
  formatTime,
  showToast,
  getUserInfo,
  getPhoneNumer,
  uploadImg,
  getToken, 
  myRequest,
  getLocation,
  getUrlParam,
  getDateStr,
  formatDate,
  debounce,
  throttle,
  isIdCard
}
