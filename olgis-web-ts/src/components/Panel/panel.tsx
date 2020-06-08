import React, {FC, useState} from "react";
import ToolDrawer from "../tools/toolDrawer";
import TOC from "../TOC/toc";
import {
    Box,
    List,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from "./expansionPanel";
import ListItemActivator from "../tools/toolActivator";
import AddXYZTileLayerTool from "../tools/AddXYZTileLayer/addXYZTileLayerTool";
import AddDrawLayerToolDrawer from "../tools/AddDrawLayer/addDrawLayerToolDrawer";
import ScalebarSettingDialog from "../tools/ScalebarSetting/scalebarSettingDialog";
import AddMapboxVectorTileLayer from "../tools/AddMapboxVectorTileLayer/addMapboxVectorTileLayer";
import {defaultMinWidth, panelStyle} from "./panel.style";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import {ArrowLeft} from "@material-ui/icons";
import clsx from "clsx";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export interface PanelProps {
    open ?: boolean
    minWidth ?: number;
}

const Panel:FC<PanelProps> = (props) => {

    const classes = panelStyle();

    const [isOpen, setIsOpen] = useState(props.open);

    const handleCloseButtonClick = ()=>{
        console.log("cliked!!!");
        setIsOpen(!isOpen);
    };

    const panelClasses = clsx({
        [classes.panelOpen]: isOpen,
        [classes.panelClose]: !isOpen
    });
    const paperClasses = clsx({
        [classes.paperOpen]: isOpen,
        [classes.paperClose]: !isOpen
    });

    return (
        <ToolDrawer
            className={panelClasses}
            classes={{
                paper: paperClasses
            }}
            PaperProps={{
                elevation: isOpen ? 10 : 0
            }}
            variant="permanent"
            anchor="left"
        >
            <div className={classes.panelHeader}>
                {isOpen ? <Typography display="block" variant="body1" align="center" >OLGIS 功能面板</Typography> : null}
                <IconButton className={classes.toggleButton} size="small" onClick={handleCloseButtonClick}>
                    {isOpen ? <ChevronLeftIcon fontSize="small"/> : <ChevronRightIcon fontSize="small"/>}
                </IconButton>
            </div>
            <ExpansionPanel square>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon fontSize="small"/>}
                    aria-controls="panel1a-content"
                    id="toc-panel-header"
                >
                    TOC
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TOC open={true} boxProps={{css: {minWidth: props.minWidth}}}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon fontSize="small"/>}
                    aria-controls="panel1a-content"
                    id="layer-panel-header"
                >
                    图层工具
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        <ListItemActivator label="添加XYZ瓦片图层" target={AddXYZTileLayerTool}/>
                        <ListItemActivator label="通过绘制添加图层" target={AddDrawLayerToolDrawer}/>
                        {/*<ListItemActivator label="添加XYZ矢量瓦片图层" target={AddXYZVectorLayer}/>*/}
                        <ListItemActivator label="添加Mapbox矢量瓦片图层" target={AddMapboxVectorTileLayer}/>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon fontSize="small"/>}
                    aria-controls="panel1a-content"
                    id="map-com-panel-header"
                >
                    地图组件
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        <ListItemActivator label="比例尺设置" target={ScalebarSettingDialog}/>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>


        </ToolDrawer>

    );

};

Panel.defaultProps = {
    open: true,
    minWidth: defaultMinWidth
};

export default Panel;