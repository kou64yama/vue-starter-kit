declare module 'vue-loader/lib/plugin' {
  import { Plugin } from 'webpack';

  class VueLoaderPlugin extends Plugin {}

  export default VueLoaderPlugin;
}
