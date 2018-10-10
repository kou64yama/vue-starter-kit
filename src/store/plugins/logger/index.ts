import createBrowserLogger from 'vuex/dist/logger';
import createServerLogger from './logger.server';

export default (process.env.BROWSER ? createBrowserLogger : createServerLogger);
