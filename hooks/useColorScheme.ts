import { useColorScheme as useNativeColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

export function useColorScheme() {
  const systemColorScheme = useNativeColorScheme();
  const [colorScheme, setColorScheme] = useState('dark');

//   useEffect(() => {
//     if (systemColorScheme) {
//       setColorScheme(systemColorScheme);
//     }
//   }, [systemColorScheme]);

  return 'dark';
}
