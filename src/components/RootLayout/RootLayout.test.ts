import { shallowMount } from '@vue/test-utils';
import RootLayout from './RootLayout.vue';
import stubs from '@/test/stubs';

describe('RootLayout', () => {
  test('renders children correctly', () => {
    const wrapper = shallowMount(RootLayout, {
      stubs,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
