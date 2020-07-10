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

darkTheme.palette.primary.main = 'rgba(18,255,92,0.9)';

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
