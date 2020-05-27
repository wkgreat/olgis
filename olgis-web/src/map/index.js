import React, {Fragment} from 'react';
import Olmap from "./common/components/map";
import {connect} from 'react-redux';
import {GlobalStyle} from '../style';
import 'antd/dist/antd.css';
import './static/iconfont/iconfont.css';
import MapToolbar from "./common/components/toobar";
import TOC from "./common/components/toc";
import {Layout} from "antd";

const {Header,Content} = Layout;

const mapId = "map-div";

const MapAPP = (props) => (
    <Fragment>
        <GlobalStyle/>
        <Layout>
            <Header {...props.header}>
                <MapToolbar/>
            </Header>
            <Content>
                <Olmap id={mapId}/>
            </Content>
        </Layout>
        <TOC/>
    </Fragment>
);

let mapDivResizeFunc = () => {
    let mapDiv = document.getElementById(mapId);
    if(mapDiv) {
        mapDiv.style.height = window.innerHeight - 48 + "px";
    }
};

document.body.onload = mapDivResizeFunc;
document.body.onresize = mapDivResizeFunc;
document.body.onchange = mapDivResizeFunc;

const state2props = (state) => ({
    header: {
        style: {
            height: state.mapapp.headerHeight,
            backgroundColor: state.mapapp.themeColor
        }
    }
});

export default connect(state2props, null)(MapAPP);