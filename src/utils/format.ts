/** @format */

/**
 * 手机号隐藏中间4位数
 */

export const formatMobile = (tel:string) => {
  if (tel) {
    tel = '' + tel
    const reg = /(\d{3})\d{4}(\d{4})/
    return tel.replace(reg, '$1****$2')
  } else {
    return ''
  }
}
