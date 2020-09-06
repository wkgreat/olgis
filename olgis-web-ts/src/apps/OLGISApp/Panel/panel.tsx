import React, {FC, useEffect, useState} from "react";
import TOC from "../../../components/TOC/toc";
import {Box, Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import TocIcon from '@material-ui/icons/Toc';
import LayersIcon from '@material-ui/icons/Layers';
import MapIcon from '@material-ui/icons/Map';
import GridOnIcon from '@material-ui/icons/GridOn';
import {ListItemActivator} from "../../../components/tools/toolActivator";
import AddXYZTileLayerTool from "../../../components/tools/AddXYZTileLayer/addXYZTileLayerTool";
import AddDrawLayerToolDrawer from "../../../components/tools/AddDrawLayer/addDrawLayerToolDrawer";
import ScalebarSettingDialog from "../../../components/tools/ScalebarSetting/scalebarSettingDialog";
import AddMapboxVectorTileLayer from "../../../components/tools/AddMapboxVectorTileLayer/addMapboxVectorTileLayer";
import {panelStyle} from "./panel.style";
import clsx from "clsx";
import AddXYZVectorLayer from "../../../components/tools/AddXYZVectorLayer/addXYZVectorLayer";
import AddCSVPointsLayer from "../../../components/tools/AddCSVPointsLayer/addCSVPointsLayer";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import AddGeohashFishnet from "../../../components/tools/grid/geohash/addGeohashFishnet";
import AddUberH3Cell from "../../../components/tools/grid/h3/addUberH3Cell";
import AddUberH3GridByExtent from "../../../components/tools/grid/h3/addUberH3GridByExtent";
import MeasureTool from "../../../components/tools/MeasureTool/measureTool";

export interface PanelProps {
    open ?: boolean
    width ?: number;
}

const Panel:FC<PanelProps> = ({open, width}) => {

    const classes = panelStyle({width});

    const [isOpen, setIsOpen] = useState();
    const [panelWidth, setPanelWidth] = useState(width);
    const [tocOpen, setTocOpen] = useState(true);
    const [layerListOpen, setLayerListOpen] = useState(true);
    const [mapComListOpen, setMapComListOpen] = useState(true);
    const [geoGridOpen, setGeoGridOpen] = useState(true);
    const [spatialAnalysis, setSpatialAnalysis] = useState(true);

    useEffect(()=>{
        setIsOpen(open);
        setPanelWidth(width);
    }, [open, width]);

    const paperClasses = clsx({
        [classes.paperOpen]: isOpen,
        [classes.paperClose]: !isOpen
    });

    return (
        <Drawer
            className={classes.drawer}
            classes={{
                paper: paperClasses
            }}
            PaperProps={{
                elevation: isOpen ? 10 : 0
            }}
            variant="permanent"
            anchor="left"
        >
            <Box className={classes.panelHeader}>
                <Typography display="block" variant="body1" align="center" >OLGIS 功能面板</Typography>
            </Box>

            <List
                component="nav"
                aria-labelledby="Functions"
            >
                <ListItem button onClick={()=>setTocOpen(!tocOpen)}>
                    <ListItemIcon>
                        <TocIcon/>
                    </ListItemIcon>
                    <ListItemText primary="TOC"/>
                    {tocOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={tocOpen} timeout="auto" unmountOnExit classes={{
                    container: classes.collapse
                }}>
                    <TOC open={true} css={{minWidth: panelWidth}}/>
                </Collapse>


                <ListItem button onClick={()=>setLayerListOpen(!layerListOpen)}>
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary="图层工具"/>
                    {layerListOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={layerListOpen} timeout="auto" unmountOnExit classes={{
                    container: classes.collapse
                }}>
                    <List>
                        <ListItemActivator label="添加XYZ瓦片图层" target={<AddXYZTileLayerTool/>}/>
                        <ListItemActivator label="通过绘制添加图层" target={<AddDrawLayerToolDrawer/>}/>
                        <ListItemActivator label="添加XYZ矢量瓦片图层" target={<AddXYZVectorLayer/>}/>
                        <ListItemActivator label="添加Mapbox矢量瓦片图层" target={<AddMapboxVectorTileLayer/>}/>
                        <ListItemActivator label="添加CSV矢量图层" target={<AddCSVPointsLayer/>}/>
                    </List>
                </Collapse>

                <ListItem button onClick={()=>setMapComListOpen(!mapComListOpen)}>
                    <ListItemIcon>
                        <MapIcon/>
                    </ListItemIcon>
                    <ListItemText primary="地图组件"/>
                    {mapComListOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={mapComListOpen} timeout="auto" unmountOnExit classes={{
                    container: classes.collapse
                }}>
                    <List>
                        <ListItemActivator label="比例尺设置" target={<ScalebarSettingDialog/>}/>
                    </List>
                </Collapse>

                <ListItem button onClick={()=>setGeoGridOpen(!geoGridOpen)}>
                    <ListItemIcon>
                        <GridOnIcon/>
                    </ListItemIcon>
                    <ListItemText primary="地理网格工具"/>
                    {geoGridOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={geoGridOpen} timeout="auto" unmountOnExit classes={{
                    container: classes.collapse
                }}>
                    <List>
                        <ListItemActivator label="添加GeoHash渔网" target={<AddGeohashFishnet/>}/>
                        <ListItemActivator label="添加Uber-H3格子" target={<AddUberH3Cell/>}/>
                        <ListItemActivator label="添加Uber-H3网格" target={<AddUberH3GridByExtent/>}/>
                    </List>
                </Collapse>

                <ListItem button onClick={()=>setSpatialAnalysis(!spatialAnalysis)}>
                    <ListItemIcon>
                        <GridOnIcon/>
                    </ListItemIcon>
                    <ListItemText primary="空间分析"/>
                    {geoGridOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={spatialAnalysis} timeout="auto" unmountOnExit classes={{
                    container: classes.collapse
                }}>
                    <List>
                        <ListItemActivator label="地图测量工具" target={<MeasureTool/>}/>
                    </List>
                </Collapse>


            </List>

        </Drawer>

    );

};

Panel.defaultProps = {
    open: true,
    width: 240
};

export default Panel;
