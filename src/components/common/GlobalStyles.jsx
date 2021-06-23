import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    body {
        font-family:  'Spoqa Han Sans Neo', 'Lato', 'Noto Sans KR','-apple-system',
      'BlinkMacSystemFont',
       sans-serif;
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
    ::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

`;

export default GlobalStyle;
