import React, {Component, useContext, useEffect} from 'react';
import {MapContext} from "../../mapContext";

const OLMap = (props) => {

    const olmap = useContext(MapContext);

    let mapDivResizeFunc = () => {
        let mapDiv = document.getElementById(props.id);
        if(mapDiv) {
            mapDiv.style.height = window.innerHeight + "px";
        }
    };


    useEffect(()=>{

        document.body.onload = mapDivResizeFunc;
        document.body.onresize = mapDivResizeFunc;
        document.body.onchange = mapDivResizeFunc;

        olmap.setTarget(props.id);
        var that = this;
        setTimeout(()=>{
            olmap.updateSize();
        },1000);

    }, []);

    useEffect(()=>{
        olmap.render();
        olmap.updateSize();
    });

    return (
        <div id={props.id} {...props} style={{
            backgroundColor: '#040508'
        }}/>
    );
};

class OLMap2 extends Component {

    constructor(props) {
        super(props);

        let mapDivResizeFunc = () => {
            let mapDiv = document.getElementById(this.props.id);
            if(mapDiv) {
                mapDiv.style.height = window.innerHeight + "px";
            }
        };

        document.body.onload = mapDivResizeFunc;
        document.body.onresize = mapDivResizeFunc;
        document.body.onchange = mapDivResizeFunc;
    }

    render() {
        return (
            <div id={this.props.id} style={{
                backgroundColor: '#040508',
                zIndex: -1
            }}/>
        );
    }

    componentDidMount() {
        console.log("Map Mount");
        console.log(this.props.olmap);
        this.props.olmap.setTarget(this.props.id);
        var that = this;
        setTimeout(()=>{
            that.props.olmap.updateSize();
        },1000);

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.olmap.render();
        this.props.olmap.updateSize();
    }

}

export default OLMap