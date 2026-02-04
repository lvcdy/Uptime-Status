/**
 * 监控数据处理工具模块
 * @module monitor
 */

/** 监控数据处理相关常量 */
const CONSTANTS = {
  THIRTY_DAYS: 30,
  MS_PER_DAY: 24 * 60 * 60 * 1000,
  DOWNTIME_TYPE: 1,
  HOURS_IN_DAY: 24
}

/** 数据验证工具函数 */
const isValidNumber = (value) => value != null && !isNaN(value) && value > 0
const isValidArray = (arr) => Array.isArray(arr) && arr.length > 0
const isValidTimestamp = (timestamp) => isValidNumber(timestamp) && timestamp > 0

/**
 * 获取30天前的时间戳
 * @returns {number} UNIX时间戳
 */
const getThirtyDaysAgo = () => {
  return Math.floor((Date.now() - CONSTANTS.THIRTY_DAYS * CONSTANTS.MS_PER_DAY) / 1000)
}

/**
 * 生成时间范围字符串
 * @returns {string} 格式化的时间范围字符串
 */
const generateTimeRanges = () => {
  return Array.from({ length: CONSTANTS.THIRTY_DAYS }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const start = new Date(date).setHours(0, 0, 0, 0)
    const end = new Date(date).setHours(23, 59, 59, 999)
    return `${Math.floor(start / 1000)}_${Math.floor(end / 1000)}`
  }).join('-')
}

/**
 * 监控数据处理类
 * @class
 */
class MonitorDataProcessor {
  /**
   * 计算平均响应时间
   * @static
   * @param {Object} monitor - 监控数据对象
   * @returns {number|null} 平均响应时间或null
   */
  static calculateAvgResponseTime(monitor) {
    try {
      if (isValidArray(monitor.response_times)) {
        const twentyFourHoursAgo = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000)
        const validTimes = monitor.response_times.filter(time =>
          time && isValidNumber(time.value) && time.datetime >= twentyFourHoursAgo
        )
        return validTimes.length > 0
          ? Math.round(validTimes.reduce((sum, time) => sum + time.value, 0) / validTimes.length)
          : null
      }
      return isValidNumber(monitor.average_response_time)
        ? Math.round(monitor.average_response_time)
        : null
    } catch (error) {
      console.error('计算平均响应时间出错:', error)
      return null
    }
  }

  static processDowntimeLogs(logs = []) {
    const thirtyDaysAgo = getThirtyDaysAgo()
    const recentLogs = logs.filter(log =>
      log.type === CONSTANTS.DOWNTIME_TYPE && log.datetime >= thirtyDaysAgo
    )
    return {
      logs: recentLogs.sort((a, b) => b.datetime - a.datetime),
      totalDowntime: recentLogs.reduce((total, log) => total + (log.duration || 0), 0)
    }
  }

  static processUptimeData(uptimeRanges) {
    const dailyUptimes = uptimeRanges?.split('-').map(Number).reverse() || []
    const validUptimes = dailyUptimes.filter(isValidNumber)
    return {
      dailyUptimes,
      uptime: validUptimes.length > 0
        ? validUptimes.reduce((sum, value) => sum + value, 0) / validUptimes.length
        : 0
    }
  }

  static processDailyResponseTimes(monitor) {
    try {
      const hourlyResponseTimes = Array(CONSTANTS.HOURS_IN_DAY).fill(null)

      if (!isValidArray(monitor.response_times)) {
        return hourlyResponseTimes
      }

      const hourlyGroups = monitor.response_times.reduce((groups, time) => {
        if (!time || !isValidNumber(time.value)) return groups
        const date = new Date(time.datetime * 1000)
        const hourIndex = Math.floor((Date.now() - date.getTime()) / (60 * 60 * 1000))
        if (hourIndex >= 0 && hourIndex < CONSTANTS.HOURS_IN_DAY) {
          if (!groups[hourIndex]) groups[hourIndex] = []
          groups[hourIndex].push(time.value)
        }
        return groups
      }, {})

      Object.entries(hourlyGroups).forEach(([hourIndex, times]) => {
        if (times.length > 0) {
          hourlyResponseTimes[hourIndex] = Math.round(
            times.reduce((sum, value) => sum + value, 0) / times.length
          )
        }
      })

      return hourlyResponseTimes
    } catch (error) {
      console.error('处理响应时间数据出错:', error)
      return Array(CONSTANTS.HOURS_IN_DAY).fill(null)
    }
  }
}

/**
 * 处理监控数据
 * @param {Object} monitor - 原始监控数据
 * @returns {Object} 处理后的监控数据
 * @throws {Error} 处理失败时抛出错误
 */
export const processMonitorData = (monitor) => {
  try {
    const avgResponseTime = MonitorDataProcessor.calculateAvgResponseTime(monitor)
    const dailyResponseTimes = MonitorDataProcessor.processDailyResponseTimes(monitor)
    const { logs: downtimeLogs, totalDowntime } = MonitorDataProcessor.processDowntimeLogs(
      monitor.logs
    )
    const { dailyUptimes, uptime } = MonitorDataProcessor.processUptimeData(
      monitor.custom_uptime_ranges
    )

    return {
      ...monitor,
      stats: {
        avgResponseTime,
        dailyResponseTimes,
        uptime,
        dailyUptimes,
        downtimeLogs,
        totalDowntime
      }
    }
  } catch (error) {
    console.error('处理监控数据失败:', error)
    throw new Error('处理监控数据失败: ' + error.message)
  }
}

// 导出工具函数
export { generateTimeRanges }