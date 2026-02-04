/**
 * 数据格式化工具函数
 */

import { format } from 'date-fns'

/**
 * 格式化响应时间
 * @param {number} time - 响应时间（毫秒）
 * @returns {string} 格式化的响应时间
 */
export const formatResponseTime = (time) => `${Math.round(time || 0)} ms`

/**
 * 格式化运行时间（百分比）
 * @param {number} uptime - 运行时间百分比
 * @returns {string} 格式化的运行时间
 */
export const formatUptime = (uptime) => `${Number(uptime || 0).toFixed(2)}%`

/**
 * 格式化持续时间
 * @param {number} seconds - 持续秒数
 * @returns {string} 格式化的持续时间
 */
export const formatDuration = (seconds) => {
    if (!seconds) return '0秒'

    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    // 如果超过100小时，只显示小时
    if (h >= 100) {
        return `约${h}小时`
    }

    return [
        h && `${h}小时`,
        m && `${m}分钟`,
        (!h && !m && s) && `${s}秒`
    ].filter(Boolean).join('')
}

/**
 * 格式化日期时间
 * @param {number} timestamp - UNIX时间戳（秒）
 * @returns {string} 格式化的日期时间
 */
export const formatDateTime = (ts) => format(new Date(ts * 1000), 'MM-dd HH:mm')
