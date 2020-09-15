import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    html, body, #root {
        height: 100%;
        font-family: 'Ubuntu';
        -webkit-font-smoothing: antialiased;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    :root {
        --shimmer0: #5b5b5b;
        --shimmer1: #8e8e8e;

        --gray0: #ccc;
        --gray1: #666;
        --gray2: #999;
    }
`;
