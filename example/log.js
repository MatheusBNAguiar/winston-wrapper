const { Log } = require('../lib');

const baseDirectory = require('path').dirname(require.main.filename);
const config = {
  baseDirectory,
  label: 'test'
}


const logger = Log(config);

logger.info( {payload: ['content on array'] })
logger.info('Message example with object as second argument', { payload: ['content on array'] })
logger.info({ message: 'Message example passing through object ' }, { payload: ['content on array'] })
logger.info({ message: 'Message example passing through object ' })
logger.info({ message: 'Message example passing through object with payload', payload: ['content on array'] })
