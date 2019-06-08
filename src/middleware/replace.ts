export function logReplacer(logInstance: any, replacer: Function) {
  const levels = Object.keys(logInstance.levels);
  levels.forEach(level => {
    logInstance[level] = replacer(logInstance[level]);
  });
  return logInstance;
}
