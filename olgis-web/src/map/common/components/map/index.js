import React, {Component} from 'react';
import {connect} from 'react-redux';

class Olmap extends Component {

    render() {
        return (
            <div id={this.props.id} style={{
                backgroundColor: '#040508'
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

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

export default connect(mapStateToProps, null)(Olmap);