import React, {Component} from "react";
import VScalaBarSetting from "./vScalebarSetting";

/**
 * className    string (defaults to 'ol-scale-line')
 CSS Class name.

 minWidth    number (defaults to 64)
 Minimum width in pixels.

 render    function
 Function called when the control should be re-rendered. This is called in a requestAnimationFrame callback.

 target    HTMLElement | string
 Specify a target if you want the control to be rendered outside of the map's viewport.

 units    module:ol/control/ScaleLine~Units | string (defaults to 'metric')
 Units.

 bar    boolean (defaults to false)
 Render scalebars instead of a line.

 steps    number (defaults to 4)
 Number of steps the scalebar should use. Use even numbers for best results. Only applies when bar is true.

 text    boolean (defaults to false)
 Render the text scale above of the scalebar. Only applies when bar is true.
 *
 * */
class ScalebarSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            props: {
                minWidth: 64,
                units: "metric",
                bar: false,
                steps: 4,
                text: "",
            }
        };
        this.opers = {
            setVisible: this.setVisible.bind(this),
            setProp: this.setProp.bind(this),
            setMinWidth: this.setMinWidth.bind(this),
            setUnits: this.setUnits.bind(this),
            setBar: this.setBar.bind(this),
            setSteps: this.setSteps.bind(this),
            setText: this.setText.bind(this)
        }

    }

    render() {
        let p = {...this.state.props, ...this.opers, visible: this.state.visible};
        this.props.olmap.setScaleBar(this.state.visible, this.state.props);
        return (
            <VScalaBarSetting {...p}/>
        );
    }

    setVisible(visible) {
        this.setState(preState => {
            if (preState.visible !== visible) {
                this.props.olmap.toggleScalaBar(visible);
                return {visible};
            }
        });
    }

    setProp(key, value) {
        this.setState((preState) => {
            preState.props[key] = value;
            return preState;
        });
    }

    setMinWidth(minWidth) {
        this.setProp("minWidth", minWidth);
    }

    setUnits(units) {
        this.setProp("units", units);
    }

    setBar(bar) {
        this.setProp("bar", bar);
    }

    setSteps(steps) {
        this.setProp("steps", steps)
    }

    setText(text) {
        this.setProp("text", text);
    }
}

export default ScalebarSetting;