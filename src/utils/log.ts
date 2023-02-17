import log from 'npmlog';
import isDebug from './isDebug';

const PREFIX = 'one:';
if (isDebug()) {
  // 级别为调试信息的打印出来
  log.level = 'verbose';
} else {
  log.level = 'info';
}

log.heading = 'one-cli';

// 自定义 level 级别
log.addLevel('success', 2000, { fg: 'green', bold: true });

export { log, PREFIX };
