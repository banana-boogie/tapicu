export const COLORS = {
  black: '0 0% 12%',
  white: '0deg 0% 100%',
  blue: {
    100: '190deg 77% 88%',
    200: '190deg 76% 82%',
    300: '189deg 75% 75%',
    400: '190deg 74% 59%',
    500: '190deg, 100%, 42%',
    600: '195deg, 100%, 39%',
    700: '201deg, 100%, 36%',
    800: '214deg, 97%, 27%',
    900: '239deg, 94%, 19%',
  },
  yellow: {
    100: '55deg 100% 50%',
    300: '52deg 100% 50%',
    500: '49deg 80% 50%',
    700: '46deg 100% 50%',
    900: '43deg 100% 33%',
  },
  gray: {
    100: '0deg 0% 30%)',
    300: '0deg 0% 80%',
    500: '196deg 4% 60%',
    700: '220deg 5% 40%',
    900: '220deg 3% 20%',
  },
  orange: {
    300: '28deg 75% 71%',
  },
  primary: '207deg, 100%, 49%',
  secondary: '240deg 60% 63%',
  accent: '28deg 75% 71%',
  success: '158deg 67% 95%',
  error: '353deg 80% 96%',
};

export const FONTS = {
  primary: 'Open Sans, sans-serif',
};

export const FONT_SIZES = {
  xxs: '8px',
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const WEIGHTS = {
  lightest: 300,
  light: 400,
  normal: 500,
  medium: 600,
  semiBold: 700,
  bold: 800,
};

export const SPACING = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const BORDER_RADIUS = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
};

export const QUERIES = {
  tabletAndBigger: `min-width: ${BREAKPOINTS.tablet / 16}rem`,
};
