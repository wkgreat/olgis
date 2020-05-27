import React, {Component, Fragment} from 'react';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as tools from './tools';
import {Col, Icon, Menu, Row} from "antd";
import {TitleDiv} from "../../../style";
import logo from "../../../static/logo.gif";
import {DrawerSetter} from "../DrawerSetter";
import IconFont from "../IconFont";
import AddDrawLayer from "../draw/addDrawLayer";
import ScalebarSetting from "../scalebar/scalebarSetting";

class MapToobar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addCSVLayerToolVisible: false,
            addWKTLayerToolVisible: false,
            addXYZLayerToolVisible: false,
            addXYZVectorLayerToolVisible: false,
            addDrawLayerVisible: false,
            scalaBarToolVisible: false,
            geohashGridToolVisible: false
        };
    }

    render() {

        const {SubMenu, ItemGroup, Item} = Menu;

        return (
            <Fragment>
                <Row>
                    <Col span={4}>
                        <TitleDiv><img src={logo} height={40} alt='logo'/></TitleDiv>
                    </Col>
                    <Col span={20}>
                        <Menu mode="horizontal">
                            <SubMenu title={
                                <span className="submenu-title-wrapper">
                                        <Icon type="desktop"/>
                                        地图显示
                                    </span>
                            }>
                                <Item key="display:scalabar"
                                      onClick={this.setVisible("scalaBarToolVisible")}>
                                    <IconFont type="icon-Ruler"/>
                                    显示比例尺
                                </Item>
                            </SubMenu>

                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                        <Icon type="appstore"/>
                                        图层添加
                                    </span>
                                }
                            >
                                <ItemGroup title="瓦片图层">

                                    <Item key="setting:addXYZRasterLayer"
                                          onClick={this.setVisible("addXYZLayerToolVisible")}>添加XYZ栅格瓦片图层
                                    </Item>
                                    <Item key="setting:addXYZVectorLayer"
                                          onClick={this.setVisible("addXYZVectorLayerToolVisible")}>Mapbox矢量瓦片图层
                                    </Item>

                                </ItemGroup>

                                <ItemGroup title="矢量图层">

                                    <Item key="setting:addCSVLayer"
                                          onClick={this.setVisible("addCSVLayerToolVisible")}>添加CSV矢量图层
                                    </Item>

                                    <Item key="setting:addWKTLayer"
                                          onClick={this.setVisible("addWKTLayerToolVisible")}>添加WKT矢量图层
                                    </Item>

                                </ItemGroup>

                                <ItemGroup title="手绘图层">
                                    <Item key="setting:drawLayer" onClick={this.setVisible("addDrawLayerVisible")}>
                                        添加手绘图层
                                    </Item>
                                </ItemGroup>
                            </SubMenu>

                            <Menu.SubMenu title={
                                <span className="submenu-title-wrapper">
                                        <Icon type="experiment"/>
                                        空间分析
                                    </span>
                            }>
                                <Menu.Item key="analysis:measure"
                                           disabled={true}
                                           onClick={this.setVisible("scalaBarToolVisible")}>
                                    <IconFont type="iconruler-alt-"/>
                                    测距
                                </Menu.Item>
                                <Menu.Item key="analysis:geohashgrid" onClick={this.setVisible("geohashGridToolVisible")}>
                                    GeoHash格网
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Col>
                </Row>

                <DrawerSetter
                    visible={this.state.scalaBarToolVisible}
                    onOK={this.setInvisible("scalaBarToolVisible")}
                    onCancel={this.setInvisible("scalaBarToolVisible")}
                    name="比例尺设置"
                    olmap={this.props.olmap}
                    components={{
                        ScalebarSetting: ScalebarSetting
                    }}
                />
                <AddDrawLayer
                    visible={this.state.addDrawLayerVisible}
                    onOK={this.setInvisible("addDrawLayerVisible")}
                    onCancel={this.setInvisible("addDrawLayerVisible")}
                />

                <tools.AddXYZLayerTool
                    visible={this.state.addXYZLayerToolVisible}
                    onOK={this.setInvisible("addXYZLayerToolVisible")}
                    onCancel={this.setInvisible("addXYZLayerToolVisible")}
                />
                <tools.AddXYZVectorLayerTool
                    visible={this.state.addXYZVectorLayerToolVisible}
                    onOK={this.setInvisible("addXYZVectorLayerToolVisible")}
                    onCancel={this.setInvisible("addXYZVectorLayerToolVisible")}
                />
                <tools.AddCSVLayerTool
                    visible={this.state.addCSVLayerToolVisible}
                    onOK={this.setInvisible("addCSVLayerToolVisible")}
                    onCancel={this.setInvisible("addCSVLayerToolVisible")}
                />
                <tools.AddWKTLayerTool
                    visible={this.state.addWKTLayerToolVisible}
                    onOK={this.setInvisible("addWKTLayerToolVisible")}
                    onCancel={this.setInvisible("addWKTLayerToolVisible")}
                />
                <tools.GeohashGridTool
                    visible={this.state.geohashGridToolVisible}
                    onOK={this.setInvisible("geohashGridToolVisible")}
                    onCancel={this.setInvisible("geohashGridToolVisible")}
                />
            </Fragment>
        );
    }

    setVisible(key) {
        let p = {};
        p[key] = true;
        return () => {
            this.setState(p);
        }
    }

    setInvisible(key) {
        let p = {};
        p[key] = false;
        return () => {
            this.setState(p);
        }
    }
}


const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps, null)(MapToobar);