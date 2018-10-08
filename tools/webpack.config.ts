import clientConfig from './webpack.client';
import serverConfig from './webpack.server';
import { Configuration } from 'webpack';

export default [clientConfig, serverConfig] as Configuration[];
