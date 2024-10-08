import { createGlobalStyle } from 'styled-components';
import {
  COLORS,
  WEIGHTS,
  FONTS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '@constants/css';

const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


/**
Global Styles: https://courses.joshwcomeau.com/css-for-js/treasure-trove/010-global-styles
*/
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/* 2. Remove default margin for common elements */
body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, ul, ol, dl, dt, dd {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body, #root {
  height: 100%
}
/*
  4. Improve the typography across the site.
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/* 5. Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}
/* 6. Inherit fonts for inputs and buttons */
input, button, textarea, select {
  font: inherit;
}
/*
  7. Create a root stacking context
*/
#__next {
  isolation: isolate;
  height:100%;
}


/*
*
*
*
Global Styles
*
*
*
*/
#root {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  isolation: isolate;
}

body {
  color: var(--color-text);
  background: var(--color-background);
  font-family: var(--font-family);
}

a:focus {
  outline: 5px auto var(--color-primary);
}

body, input, button, select, option {
  font-weight: var(--font-weight-light);
  font-family: var(--font-family);
}

h1, h2, h3, h4, h5, h6, strong {
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
} 

h1, h2, h3, h4, h5, h6, p {
  text-rendering: optimizeLegibility;
} 

p {
  font-family: var(--font-family);
  margin-bottom: 1.5em;
  font-size: 1.125rem;
}

em {
  font-family: var(--font-family);
  font-style: italic;
}

strong {
  font-weight: var(--font-weight-medium);
}

::selection{
  background-color: var(--color-primary);
  color: white
}

@media(orientation: landscape) {
  ::-webkit-scrollbar {
    width: 9px;
    height: 11px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--color-gray-300);
    border: 2px solid var(--color-background);
  }
}

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.5;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
}
 
/** CSS Variables */
html {
  /*
    Silence the warning about missing Reach Dialog styles
  */
  --reach-dialog: 1;
 
  /* FONTS */
  --font-family: ${FONTS.primary};

  /* FONT SIZES */
  --font-size-xxs: ${FONT_SIZES.xxs};
  --font-size-xs: ${FONT_SIZES.xs};
  --font-size-sm: ${FONT_SIZES.sm};
  --font-size-md: ${FONT_SIZES.md};
  --font-size-lg: ${FONT_SIZES.lg};
  --font-size-xl: ${FONT_SIZES.xl};
  --font-size-xxl: ${FONT_SIZES.xxl};

  /* FONT WEIGHTS */
  --font-weight-lightest: ${WEIGHTS.lightest};
  --font-weight-light: ${WEIGHTS.light};
  --font-weight-normal: ${WEIGHTS.normal};
  --font-weight-medium: ${WEIGHTS.medium};
  --font-weight-semibold: ${WEIGHTS.semiBold};
  --font-weight-bold: ${WEIGHTS.bold};

  /* SPACING */
  --space-xxs: ${SPACING.xxs};
  --space-xs: ${SPACING.xs};
  --space-sm: ${SPACING.sm};
  --space-md: ${SPACING.md};
  --space-lg: ${SPACING.lg};
  --space-xl: ${SPACING.xl};
  --space-xxl: ${SPACING.xxl};

  /* BORDER-RADIUS */
  --border-radius-xxs: ${BORDER_RADIUS.xxs};
  --border-radius-xs: ${BORDER_RADIUS.xs};
  --border-radius-sm: ${BORDER_RADIUS.sm};
  --border-radius-md: ${BORDER_RADIUS.md};
  --border-radius-lg: ${BORDER_RADIUS.lg};
  --border-radius-xl: ${BORDER_RADIUS.xl};
  --border-radius-xxl: ${BORDER_RADIUS.xxl};

  /* COLORS */
  --color-background: hsl(${COLORS.white});
  --color-text: hsl(${COLORS.black});
  --color-black: hsl(${COLORS.black});
  --color-white: hsl(${COLORS.white});
  --color-primary: hsl(${COLORS.primary});
  --color-secondary: hsl(${COLORS.secondary});
  --color-accent: hsl(${COLORS.accent});
  --color-background-success: hsl(${COLORS.background.success});
  --color-background-error: hsl(${COLORS.background.error});
  --color-background-info: hsl(${COLORS.background.info});
  --color-background-warning: hsl(${COLORS.background.warning});
  --color-button-primary: hsl(${COLORS.button.primary});

  --color-gray-100: hsl(${COLORS.gray[100]});
  --color-gray-300: hsl(${COLORS.gray[300]});
  --color-gray-500: hsl(${COLORS.gray[500]});
  --color-gray-700: hsl(${COLORS.gray[700]});
  --color-gray-900: hsl(${COLORS.gray[900]});
  --color-gray-backdrop: hsl(${COLORS.gray[900]} / 0.8);
  --color-yellow-100: hsl(${COLORS.yellow[100]});
  --color-yellow-300: hsl(${COLORS.yellow[300]});
  --color-yellow-500: hsl(${COLORS.yellow[500]});
  --color-yellow-700: hsl(${COLORS.yellow[700]});
  --color-yellow-900: hsl(${COLORS.yellow[900]});
  --color-blue-100: hsl(${COLORS.blue[100]});
  --color-blue-200: hsl(${COLORS.blue[200]});
  --color-blue-300: hsl(${COLORS.blue[300]});
  --color-blue-400: hsl(${COLORS.blue[400]});
  --color-blue-500: hsl(${COLORS.blue[500]});
  --color-blue-600: hsl(${COLORS.blue[600]});
  --color-blue-700: hsl(${COLORS.blue[700]});
  --color-blue-800: hsl(${COLORS.blue[800]});
  --color-blue-900: hsl(${COLORS.blue[900]});
}


/** Third Party Overrides */
 #___gatsby, #gatsby-focus-wrapper {
   height: 100%;
 }
`;
export default GlobalStyles;
