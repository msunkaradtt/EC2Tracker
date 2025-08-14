// src/theme.ts
import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'Inter_400Regular',
};

export const lightTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
  "colors": {
    "primary": "rgb(64, 89, 170)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(220, 225, 255)",
    "onPrimaryContainer": "rgb(0, 22, 78)",
    "secondary": "rgb(0, 107, 95)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(98, 250, 227)",
    "onSecondaryContainer": "rgb(0, 32, 28)",
    "tertiary": "rgb(0, 100, 148)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(202, 230, 255)",
    "onTertiaryContainer": "rgb(0, 30, 48)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(254, 251, 255)",
    "onBackground": "rgb(27, 27, 31)",
    "surface": "rgb(254, 251, 255)",
    "onSurface": "rgb(27, 27, 31)",
    "surfaceVariant": "rgb(226, 225, 236)",
    "onSurfaceVariant": "rgb(69, 70, 79)",
    "outline": "rgb(118, 118, 128)",
    "outlineVariant": "rgb(198, 198, 208)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(48, 48, 52)",
    "inverseOnSurface": "rgb(242, 240, 244)",
    "inversePrimary": "rgb(182, 196, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(245, 243, 251)",
      "level2": "rgb(239, 238, 248)",
      "level3": "rgb(233, 233, 246)",
      "level4": "rgb(231, 232, 245)",
      "level5": "rgb(227, 228, 243)"
    },
    "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
    "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
    "backdrop": "rgba(47, 48, 56, 0.4)"
  }
};

export const darkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({config: fontConfig}),
  "colors": {
    "primary": "rgb(182, 196, 255)",
    "onPrimary": "rgb(5, 41, 122)",
    "primaryContainer": "rgb(38, 65, 145)",
    "onPrimaryContainer": "rgb(220, 225, 255)",
    "secondary": "rgb(60, 221, 199)",
    "onSecondary": "rgb(0, 55, 49)",
    "secondaryContainer": "rgb(0, 80, 71)",
    "onSecondaryContainer": "rgb(98, 250, 227)",
    "tertiary": "rgb(142, 205, 255)",
    "onTertiary": "rgb(0, 52, 79)",
    "tertiaryContainer": "rgb(0, 75, 112)",
    "onTertiaryContainer": "rgb(202, 230, 255)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(27, 27, 31)",
    "onBackground": "rgb(228, 225, 230)",
    "surface": "rgb(27, 27, 31)",
    "onSurface": "rgb(228, 225, 230)",
    "surfaceVariant": "rgb(69, 70, 79)",
    "onSurfaceVariant": "rgb(198, 198, 208)",
    "outline": "rgb(143, 144, 154)",
    "outlineVariant": "rgb(69, 70, 79)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(228, 225, 230)",
    "inverseOnSurface": "rgb(48, 48, 52)",
    "inversePrimary": "rgb(64, 89, 170)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(35, 35, 42)",
      "level2": "rgb(39, 41, 49)",
      "level3": "rgb(44, 46, 56)",
      "level4": "rgb(46, 47, 58)",
      "level5": "rgb(49, 51, 62)"
    },
    "surfaceDisabled": "rgba(228, 225, 230, 0.12)",
    "onSurfaceDisabled": "rgba(228, 225, 230, 0.38)",
    "backdrop": "rgba(47, 48, 56, 0.4)"
  }
};