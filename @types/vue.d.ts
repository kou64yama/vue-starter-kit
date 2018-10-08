declare module '*.vue' {
  import Vue from 'vue';

  const ComponentClass: typeof Vue;

  export default ComponentClass;
}
