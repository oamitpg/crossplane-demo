import {
  createUnifiedTheme,
  palettes,
  UnifiedThemeProvider,
  type PageTheme,
} from '@backstage/theme';
import { ThemeBlueprint } from '@backstage/plugin-app-react';
import LightIcon from '@material-ui/icons/WbSunny';
import DarkIcon from '@material-ui/icons/Brightness2';

const fontFamily =
  '"Inter Variable", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// Page headers: a calm flat gradient instead of the stock wave artwork.
// The ids are the themeIds the built-in pages ask for, so every page picks one up.
const headerTheme = (from: string, to: string): PageTheme => ({
  colors: [from, to],
  shape: 'none',
  backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
  fontColor: '#ffffff',
});

const pageThemes = (from: string, to: string) =>
  Object.fromEntries(
    [
      'home',
      'documentation',
      'tool',
      'service',
      'website',
      'library',
      'other',
      'app',
      'apis',
      'card',
    ].map(id => [id, headerTheme(from, to)]),
  );

const shape = { radius: 10, border: '1px solid' };

const components = (border: string) => ({
  MuiPaper: {
    styleOverrides: {
      rounded: { borderRadius: shape.radius },
      elevation1: { boxShadow: 'none' },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        border: `${shape.border} ${border}`,
        boxShadow: 'none',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        borderRadius: 8,
        fontWeight: 600,
      },
    },
  },
  MuiChip: {
    styleOverrides: { root: { borderRadius: 8, fontWeight: 500 } },
  },
  MuiTableCell: {
    styleOverrides: {
      head: { fontWeight: 600, textTransform: 'none' as const },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: { textTransform: 'none' as const, fontWeight: 600 },
    },
  },
});

const typography = {
  htmlFontSize: 16,
  fontFamily,
  h1: { fontSize: 36, fontWeight: 700, marginBottom: 8 },
  h2: { fontSize: 28, fontWeight: 700, marginBottom: 8 },
  h3: { fontSize: 22, fontWeight: 600, marginBottom: 8 },
  h4: { fontSize: 18, fontWeight: 600, marginBottom: 6 },
  h5: { fontSize: 16, fontWeight: 600, marginBottom: 4 },
  h6: { fontSize: 14, fontWeight: 600, marginBottom: 2 },
};

export const lightTheme = createUnifiedTheme({
  fontFamily,
  typography,
  defaultPageTheme: 'home',
  pageTheme: pageThemes('#4338ca', '#6366f1'),
  components: components('#e5e7eb'),
  palette: {
    ...palettes.light,
    primary: { main: '#4f46e5' },
    secondary: { main: '#7c3aed' },
    background: { default: '#f8f9fb', paper: '#ffffff' },
    border: '#e5e7eb',
    link: '#4338ca',
    linkHover: '#3730a3',
    tabbar: { indicator: '#4f46e5' },
    navigation: {
      ...palettes.light.navigation,
      background: '#ffffff',
      color: '#4b5563',
      selectedColor: '#4338ca',
      indicator: '#4f46e5',
      navItem: { hoverBackground: '#eef2ff' },
      submenu: { background: '#ffffff' },
    },
  },
});

export const darkTheme = createUnifiedTheme({
  fontFamily,
  typography,
  defaultPageTheme: 'home',
  pageTheme: pageThemes('#1e1b4b', '#312e81'),
  components: components('#2a2f3a'),
  palette: {
    ...palettes.dark,
    primary: { main: '#818cf8' },
    secondary: { main: '#a78bfa' },
    background: { default: '#0b0d12', paper: '#12151c' },
    border: '#2a2f3a',
    link: '#a5b4fc',
    linkHover: '#c7d2fe',
    tabbar: { indicator: '#818cf8' },
    navigation: {
      ...palettes.dark.navigation,
      background: '#0f1218',
      color: '#9ca3af',
      selectedColor: '#e0e7ff',
      indicator: '#818cf8',
      navItem: { hoverBackground: '#1b2030' },
      submenu: { background: '#0f1218' },
    },
  },
});

// Same extension names as the built-in themes, so these replace them and the
// light/dark switcher in Settings keeps working.
export const lightThemeExtension = ThemeBlueprint.make({
  name: 'light',
  params: {
    theme: {
      id: 'light',
      title: 'Light',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={lightTheme}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
  },
});

export const darkThemeExtension = ThemeBlueprint.make({
  name: 'dark',
  params: {
    theme: {
      id: 'dark',
      title: 'Dark',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={darkTheme}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
  },
});
