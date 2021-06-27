/**
 * 数组转化为树
 * data需要转化的数组
 * pid起始的父节点 id
 */
export const arrayToTree = (data: Array<any>, pid: any, key = 'id', pkey = 'parentId'): Array<any> => {
  if (!Array.isArray(data) || !data.length) return []
  const res: Array<any> = []
  data.forEach((item) => {
    if (item[pkey] === pid) {
      const childrenItem = arrayToTree(data, item[key], key, pkey)
      if (childrenItem.length) item.children = childrenItem
      res.push(item)
    }
  })
  return res
}
