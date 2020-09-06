import React from 'react';
import clsx from 'clsx';
import {ThemeProvider, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Header} from "./components/layout/src";
import {darkTheme, useStyles} from "./style";
import Logo from "./components/layout/src/logo";
import Box from "@material-ui/core/Box";
import OLMap from "./components/map/src";
import MapContextProvider from "./components/mapContext";
import Drawer from "./components/layout/src/drawer";

export default function OLMAPAPP() {

    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <MapContextProvider>
            <ThemeProvider theme={darkTheme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {[classes.appBarShift]: open})}
                    >
                        <Toolbar className={classes.header} variant="dense">

                            <IconButton
                                size="small"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={ clsx(classes.menuButton, {[classes.hide]: open}) }
                            >
                                <MenuIcon fontSize='small'/>
                            </IconButton>
                            <IconButton
                                size="small" onClick={handleDrawerClose}
                                className={ clsx(classes.menuButton, {[classes.hide]: !open}) }
                            >
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>

                            <Logo classes={classes}>
                                <Typography variant="button"> OLGIS </Typography>
                            </Logo>

                            <Header/>

                        </Toolbar>

                    </AppBar>

                    <Drawer open={open}/>

                    <Box className={classes.content}>
                        <div className={classes.toolbar} />
                    </Box>
                    <OLMap className={classes.map} id="map-div"/>
                </div>
            </ThemeProvider>
        </MapContextProvider>
    );
}