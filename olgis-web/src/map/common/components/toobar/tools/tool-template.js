/**
 * 示例工具代码模版
 * */
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Button, Modal} from "antd";

class ToolTemplate extends Component {

    /**
     * 构造器
     * */
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false //对话框是否显示
        };

        //绑定方法
        this.onToolButtonClick = this.onToolButtonClick.bind(this);
        this.onModalOK = this.onModalOK.bind(this);
        this.onModalCancel = this.onModalCancel.bind(this);
    }

    render() {
        return (
            <Fragment>
                <Button ghost={false} onClick={this.onToolButtonClick} block={true}>示例工具按钮</Button>
                <Modal
                    title='示例工具'
                    visible={this.state.modalVisible}
                    onOk={this.onModalOK}
                    onCancel={this.onModalCancel}>
                </Modal>
            </Fragment>
        );
    }

    onToolButtonClick() {
        this.toggleModal();
        console.log("Button Clicked! Tool-Template");
    }

    toggleModal() {
        this.setState((preState) => ({
            modalVisible: !preState.modalVisible
        }));
    }

    onModalOK() {
        this.toggleModal();
    }

    onModalCancel() {
        this.toggleModal();
    }

}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ToolTemplate);