/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  primary: '#007AFF',
  background: '#1F2937',
  white: '#FFFFFF',
  black: '#000000',
  border: '#E1E1E1',
  text: '#333333',
  error: '#FF3B30',
  success: '#34C759',
  gray: '#8E8E93',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    textDim: '#9BA1A6',
    background: '#000000',
    tint: '#FFFFFF',
    icon: '#FFFFFF',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',
  },
};
