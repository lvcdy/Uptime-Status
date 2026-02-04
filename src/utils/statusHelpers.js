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
    const statusColorMap = {
        [MONITOR_STATUS.ONLINE]: 'green',
        [MONITOR_STATUS.PAUSED]: 'yellow',
        [MONITOR_STATUS.PREPARING]: 'yellow',
        [MONITOR_STATUS.OFFLINE]: 'red'
    }

    const color = statusColorMap[status] || 'gray'

    return {
        dot: {
            [`bg-${color}-500 dark:bg-${color}-400`]: true
        },
        dotPing: {
            [`bg-${color}-500 dark:bg-${color}-400`]: true
        },
        text: {
            [`text-${color}-500`]: true
        },
        hover: {
            text: {
                [`hover:text-${color}-600 dark:hover:text-${color}-300`]: true
            },
            bg: {
                [`hover:bg-${color}-50 dark:hover:bg-${color}-900/30`]: true
            }
        }
    }
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
