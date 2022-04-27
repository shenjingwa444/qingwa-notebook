export function friendlyDate(datsStr){
  let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let timeOver = now - time
  let str
  let sec = 1000*60
  switch (true){
    case timeOver < sec:
      str = '刚刚'
      break;
    case timeOver < sec*60:
      str = Math.floor(timeOver/sec)+'分钟前'
      break;
    case timeOver < sec*60*24:
      str = Math.floor(timeOver/(sec*60))+'小时前'
      break;
    default:
      str = Math.floor(timeOver/(sec*60*24))+'天前'
  }
  return str
}
