// globalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Georgia', serif;
    background-color: #f4e1c1; /* Cor de fundo clara, estilo biblioteca */
    color: #4b3f2f; /* Cor de texto escuro, imitando o estilo de prancheta de madeira */
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-family: 'Garamond', serif; /* Fonte com mais personalidade */
    font-weight: normal;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;

