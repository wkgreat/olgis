import React from 'react';
import MapContextProvider from "./components/MapContext/mapContext";
import Map from "./components/Map/map";
import TOC from "./components/TOC/toc";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

function App() {
  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <MapContextProvider showDefaultControls={false}>
              <TOC open={true}/>
              <Map/>
          </MapContextProvider>
      </ThemeProvider>

  );
}

export default App;
