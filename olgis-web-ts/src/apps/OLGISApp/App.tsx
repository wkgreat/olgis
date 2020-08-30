import React, {useState} from 'react';
import MapContextProvider from "../../components/MapContext/mapContext";
import Map from "../../components/Map/map";
import {
    AppBar,
    Button,
    createMuiTheme,
    createStyles,
    CssBaseline,
    IconButton,
    Theme,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import Panel from "./Panel/panel";
import StatusBar from "../../components/StatusBar/statusBar";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {SERVICE_URL} from "../../components/common/utils";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
} );

darkTheme.palette.primary.main = 'rgb(83,131,255)';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer - 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function App() {

    const classes = useStyles();

    const [panelOpen, setPanelOpen] = useState(false);

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <MapContextProvider showDefaultControls={false}>
              <AppBar position="fixed"
                      className={clsx(classes.appBar, {
                          [classes.appBarShift]: panelOpen,
                      })}>
                  <Toolbar variant="dense">
                      <IconButton edge="start" className={classes.menuButton}
                                  color="inherit" aria-label="menu" onClick={()=>setPanelOpen(!panelOpen)}>
                           {panelOpen ? <ChevronLeftIcon/> : <MenuIcon />}
                      </IconButton>

                      <Typography variant="h6" className={classes.title}>
                          OLGIS
                      </Typography>
                      <Button color="inherit">{`服务端地址: ${SERVICE_URL}`}</Button>
                  </Toolbar>
              </AppBar>
              <Panel open={panelOpen} width={drawerWidth}/>
              <Map/>
              <StatusBar visible={true}/>
          </MapContextProvider>
      </ThemeProvider>

  );
}

export default App;
