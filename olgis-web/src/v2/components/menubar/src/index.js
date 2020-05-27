import React, {Component, Fragment} from 'react';
import {Box, Button} from "@material-ui/core";
import LayerMenu from "../../menus/src/LayerMenu";
import VectorAnalysisMenu from "../../menus/src/VectorAnalysisMenu";
import RasterAnalysisMenu from "../../menus/src/RasterAnalysisMenu";

class Menubar extends Component {

    constructor(props) {
        super(props);
        this.state= {
            menus: []
        };
        this.addMenu = this.addMenu.bind(this);
    }

    addMenu(text, menu) {
        this.setState((preState)=>({
            menus: {...preState.menus, text:menu}
        }));
    }

    render() {
        return (
            <Box
                display="flex"
                alignItems="center"
                component='div'
            >
                <LayerMenu classes={this.props.classes}/>
                <VectorAnalysisMenu classes={this.props.classes}/>
                <RasterAnalysisMenu classes={this.props.classes}/>
            </Box>
        );
    }
}

export default Menubar;