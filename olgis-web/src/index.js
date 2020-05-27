import React from 'react';
import ReactDOM from 'react-dom';
import MapApp from './map';
import store from "./map/store";
import {Provider} from "react-redux";

import OLMAPAPP from './v2'
import TOC from "./map/common/components/toc";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

ReactDOM.render(
    <Provider store={store}>
        {/*<MapApp/>*/}
        <OLMAPAPP/>
    </Provider>,
    document.getElementById('root')
);