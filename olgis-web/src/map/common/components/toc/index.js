import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Group} from "ol/layer";
import {TOCTitle, TOCWrapper} from './style';
import LayerItem from './LayerItem';

const TOC = (props) => {

    const {olmap} = props;

    const makeLayerList = (layers) => {

        return layers.getArray().map(layer => {
            const name = layer.get('name');
            if (layer instanceof Group) { // 如果是groupLayer
                return (
                    <Fragment>
                        <LayerItem layerName={name} key={name}/>
                        {makeLayerList(layer.getLayers())}
                    </Fragment>
                );
            } else {
                return (
                    <LayerItem layerName={name} key={name}/>
                );
            }

        }).reverse();
    };

    return (
        <TOCWrapper>
            <TOCTitle><span>图层列表</span></TOCTitle>
            {makeLayerList(olmap.getLayers())}
        </TOCWrapper>
    );
};

const mapStateToProps = (state) => ({
    layerVersion: state.olmap.layerVersion,
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps, null)(TOC);