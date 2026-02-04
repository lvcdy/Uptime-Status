/**
 * 监控数据处理和业务逻辑工具
 */

import { formatDuration } from './formatters'
import { MONITOR_STATUS } from '@/constants/status'

/**
 * 获取宕机统计信息
 * @param {Object} monitor - 监控数据
 * @param {number} validDays - 有效天数
 * @returns {string} 宕机统计信息
 */
export const getDowntimeStats = (monitor, validDays) => {
  const downtimeLogs = monitor.stats?.downtimeLogs || []
  const downtimeCount = downtimeLogs.length
  const totalDowntime = formatDuration(monitor.stats?.totalDowntime)

  if (validDays <= 0) return '暂无数据'

  if (downtimeCount > 0 || monitor.status === MONITOR_STATUS.OFFLINE) {
    if (downtimeCount > 0) {
      return `最近${validDays}天 ${downtimeCount} 次故障，总计${totalDowntime}`
    }
    return '当前离线'
  }
  return `最近${validDays}天运行正常`
}

/**
 * 获取宕机日志（最多15条）
 * @param {Object} monitor - 监控数据
 * @returns {Array} 宕机日志数组
 */
export const getDowntimeLogs = (monitor) => {
  return (monitor.stats?.downtimeLogs || []).slice(0, 15)
}

/**
 * 计算有效监控天数
 * @param {Object} monitor - 监控数据
 * @param {Object} dateRange - 日期范围对象
 * @returns {number} 有效天数
 */
export const getValidDays = (monitor, dateRange) => {
  if (!monitor.stats?.dailyUptimes) return 0

  const createTime = monitor.create_datetime * 1000
  const now = Date.now()
  const effectiveCreateTime = createTime > now ? now : createTime

  const daysSinceStart = Math.max(0, Math.floor(
    (new Date(effectiveCreateTime) - dateRange.startDate) / 86400000
  ))

  return monitor.stats.dailyUptimes
    .slice(daysSinceStart)
    .filter(v => v != null && !isNaN(v))
    .length
}

/**
 * 处理URL跳转
 * @param {string} url - 要打开的URL
 */
export const openUrl = (url) => {
  if (!url) return
  const finalUrl = !url.startsWith('http://') && !url.startsWith('https://')
    ? 'http://' + url
    : url
  window.open(finalUrl, '_blank', 'noopener,noreferrer')
}

/**
 * 生成日期范围（30天）
 * @returns {Object} 包含startDate和dates数组的对象
 */
export const generateDateRange = () => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now)
    date.setDate(date.getDate() - (29 - i))
    return date
  })
  return { startDate: dates[0], dates }
}

/**
 * 排序监控列表
 * @param {Array} monitors - 监控数组
 * @returns {Array} 排序后的监控数组
 */
export const sortMonitors = (monitors) => {
  if (!monitors) return []
  return [...monitors].sort((a, b) => {
    // 如果状态相同，保持原有顺序
    if (a.status === b.status) return 0
    // 将离线状态(9)排到最后
    if (a.status === MONITOR_STATUS.OFFLINE) return 1
    if (b.status === MONITOR_STATUS.OFFLINE) return -1
    // 其他状态保持原有顺序
    return 0
  })
}
