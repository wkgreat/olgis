import React from 'react';
import MapContextProvider from "./components/MapContext/mapContext";
import Map from "./components/Map/map";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import Panel from "./components/Panel/panel";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
} );

darkTheme.palette.primary.main = '#55ffec';

function App() {
  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <MapContextProvider showDefaultControls={false}>
              <Map/>
              <Panel open={true}/>
          </MapContextProvider>
      </ThemeProvider>

  );
}

export default App;
