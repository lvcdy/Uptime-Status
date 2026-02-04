/**
 * 监控状态常量定义
 */

export const MONITOR_STATUS = {
    ONLINE: 2,      // 在线状态
    PAUSED: 0,      // 暂停状态
    PREPARING: 1,   // 准备中状态
    OFFLINE: 9      // 离线状态
}

export const STATUS_CONFIG = {
    [MONITOR_STATUS.ONLINE]: {
        text: '在线',
        color: 'green',
        classes: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    [MONITOR_STATUS.PAUSED]: {
        text: '暂停',
        color: 'yellow',
        classes: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    },
    [MONITOR_STATUS.PREPARING]: {
        text: '准备中',
        color: 'yellow',
        classes: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    },
    [MONITOR_STATUS.OFFLINE]: {
        text: '离线',
        color: 'red',
        classes: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    }
}

export const MONITOR_TYPE_MAP = {
    1: 'HTTPS',
    2: 'Keyword',
    3: 'PING',
    4: 'Port',
    default: 'HTTP'
}

export const ERROR_MESSAGES = {
    333333: '连接超时',
    444444: '无响应',
    100001: 'DNS解析失败',
    98: '离线状态',
    99: '失联状态',
    default: '连接异常'
}

export const REFRESH_INTERVAL = 300 // 5分钟 = 300秒
