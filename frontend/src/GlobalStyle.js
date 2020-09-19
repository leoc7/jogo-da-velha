import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    html, body, #root {
        height: 100%;
        font-family: 'Ubuntu';
        -webkit-font-smoothing: antialiased;
        background: #f2f2f2;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    :root {
        --gray0: #333;
        --gray1: #666;
        --gray2: #999;
    }
`;
