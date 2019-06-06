const { Log } = require('../lib');

const baseDirectory = require('path').dirname(require.main.filename);
const config = {
  baseDirectory,
  label: 'test'
}

Log(config).info('Message example')
Log(config).info('Message example with object as second argument', { payload: ['content on array'] })
Log(config).info({ message: 'Message example passing through object ' })
Log(config).info({ message: 'Message example passing through object with payload', payload: ['content on array'] })
