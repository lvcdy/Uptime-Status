/**
 * 状态样式处理工具
 */

import { MONITOR_STATUS } from '@/constants/status'

/**
 * 获取状态对应的样式类
 * @param {number} status - 监控状态
 * @returns {Object} 包含样式类的对象
 */
export const getStatusClasses = (status) => {
    const statusConfigMap = {
        [MONITOR_STATUS.ONLINE]: {
            dot: 'bg-green-500 dark:bg-green-400',
            dotPing: 'bg-green-500 dark:bg-green-400',
            text: 'text-green-500 dark:text-green-400',
            hover: {
                text: 'hover:text-green-600 dark:hover:text-green-300',
                bg: 'hover:bg-green-50 dark:hover:bg-green-900/30'
            }
        },
        [MONITOR_STATUS.PAUSED]: {
            dot: 'bg-yellow-500 dark:bg-yellow-400',
            dotPing: 'bg-yellow-500 dark:bg-yellow-400',
            text: 'text-yellow-500 dark:text-yellow-400',
            hover: {
                text: 'hover:text-yellow-600 dark:hover:text-yellow-300',
                bg: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
            }
        },
        [MONITOR_STATUS.PREPARING]: {
            dot: 'bg-yellow-500 dark:bg-yellow-400',
            dotPing: 'bg-yellow-500 dark:bg-yellow-400',
            text: 'text-yellow-500 dark:text-yellow-400',
            hover: {
                text: 'hover:text-yellow-600 dark:hover:text-yellow-300',
                bg: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
            }
        },
        [MONITOR_STATUS.OFFLINE]: {
            dot: 'bg-red-500 dark:bg-red-400',
            dotPing: 'bg-red-500 dark:bg-red-400',
            text: 'text-red-500 dark:text-red-400',
            hover: {
                text: 'hover:text-red-600 dark:hover:text-red-300',
                bg: 'hover:bg-red-50 dark:hover:bg-red-900/30'
            }
        }
    }

    return statusConfigMap[status] || statusConfigMap[MONITOR_STATUS.ONLINE]
}

/**
 * 获取卡片边框样式类
 * @param {number} status - 监控状态
 * @returns {string} 边框样式类
 */
export const getCardBorderClass = (status) => {
    const borderClassMap = {
        [MONITOR_STATUS.ONLINE]: 'after:border-green-500/50 dark:after:border-green-400/50',
        [MONITOR_STATUS.PAUSED]: 'after:border-yellow-500/50 dark:after:border-yellow-400/50',
        [MONITOR_STATUS.PREPARING]: 'after:border-yellow-500/50 dark:after:border-yellow-400/50',
        [MONITOR_STATUS.OFFLINE]: 'after:border-red-500/50 dark:after:border-red-400/50'
    }

    return borderClassMap[status] || 'after:border-gray-500/50 dark:after:border-gray-400/50'
}

/**
 * 获取监控类型
 * @param {Object} monitor - 监控对象
 * @returns {string} 监控类型
 */
export const getMonitorType = (monitor) => {
    const typeMap = {
        1: 'HTTPS',
        2: 'Keyword',
        3: 'PING',
        4: 'Port'
    }
    return typeMap[monitor.type] || 'HTTP'
}

/**
 * 获取错误消息
 * @param {number|Object} code - 错误代码
 * @returns {string} 错误消息
 */
export const getErrorMessage = (code) => {
    const errorMap = {
        333333: '连接超时',
        444444: '无响应',
        100001: 'DNS解析失败',
        98: '离线状态',
        99: '失联状态'
    }

    const errorCode = typeof code === 'object' ? code.code : code
    return errorMap[errorCode] || '连接异常'
}
