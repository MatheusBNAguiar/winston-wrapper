interface LogArgs {
  message: string
}

interface RequestUsedArgs {
  uuid: string;
  ip: string;
  url: string;
  method: string
}

const buildBaseLogArgs = (...args: any[]) => {
  let logArgs = { message: '' };
  if (args.length === 1) {
    const [msg] = args;
    logArgs = { message: ((msg && msg.message) || msg) };
  }
  if (args.length > 1) {
    const [_, info] = args;
    logArgs = { ...logArgs, ...info }
  }
  return logArgs;
}

const addLogParams = (uuid: string, ip: string, url: string, method: string) => (logArgs: LogArgs) => {
  logArgs.message = `[${uuid}] \t[${ip}][${url}][${method}]\t ` + logArgs.message;
  return { ...logArgs, uuid, ip, url, method };
}

export const customLogFunction = (req: RequestUsedArgs) => (oldLogger: Function) => {
  const { uuid, ip, url, method } = req;
  const addParamsFunction = addLogParams(uuid, ip, url, method);
  return (...args: any[]) => {
    return oldLogger(
      addParamsFunction(
        buildBaseLogArgs(args)
      )
    );
  }
}
