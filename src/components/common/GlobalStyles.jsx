import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    body {
        font-family: 'Lato','Noto Sans KR', sans-serif;
        letter-spacing: -0.2px;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    h3 {
        font-size: 1.17em;
    }

    h4 {
        font-size: 1em;
    }

    h5 {
        font-size: 0.83em;
    }

    h6 {
        font-size: 0.67em;
    }

`;

export default GlobalStyle;
