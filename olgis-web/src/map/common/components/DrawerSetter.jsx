import React from "react";
import {Collapse, Drawer} from 'antd';
import './DrawerSetter.css'

/**
 * {
 *     name: drawerName,
 *     olmap: olmap,
 *     visible: true | false,
 *     onOk: function,
 *     onCancel: function,
 *     components: {
 *         name1: component1,
 *         name2: component2,
 *         ...
 *     }
 * }
 * */
export const DrawerSetter = (props) => {

    return (
        <Drawer

            title={props.name}
            visible={props.visible}
            onClose={props.onOK}
            className="drawer-setter"
            placement='right'
            width={350}
            bodyStyle={{
                margin: "0px",
                padding: "0px"
            }}>
            <Collapse>
                {
                    Object.keys(props.components).map((k) => {
                        const Com = props.components[k];
                        return (
                            <Collapse.Panel key={k} header={k}>
                                <Com
                                    olmap={props.olmap}
                                />
                            </Collapse.Panel>
                        );
                    })
                }
            </Collapse>

        </Drawer>
    );

};