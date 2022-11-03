//數字千分位轉換
export function currency(num) {
  let parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

//UNIX轉普通時間
export function date(time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}
