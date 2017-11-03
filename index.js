require.config({
    // module name mapped to CDN url
    paths: {
            // Require.js appends `.js` extension for you
            'react': 'https://unpkg.com/react@16.0.0/umd/react.development',
            'react-dom': 'https://unpkg.com/react-dom@16.0.0/umd/react-dom.development',
            'axios' : 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.0/axios',
            'redux' : 'https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.min'
            // 아직은 필요 없다.
            // , 'react-redux' : 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.6/react-redux.min'
            /* redux, react-redux도 추가 할 것이다. */
        }
    });

require(["./build/dist/index"]);