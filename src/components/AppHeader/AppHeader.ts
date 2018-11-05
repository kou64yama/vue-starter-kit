import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppNavigation from '../AppNavigation';

@Component({ components: { AppNavigation } })
export default class AppHeader extends Vue {}
