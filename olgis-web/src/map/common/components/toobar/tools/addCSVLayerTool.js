import React, {Component, Fragment} from 'react';
import {Divider, Icon, Input, Modal, Radio, Select, Upload} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from '../../store';
import * as OLMAP from "../../map/olmapLayer";
import axios from 'axios';

class AddCSVLayerTool extends Component {

    constructor(props) {
        super(props);

        this.csvType = {
            STRING: 'string',
            FILE: 'file',
            URL: 'URL'
        };

        this.state = {

            okDisabled: false,
            inputName: 'CSV_Vector',
            inputCSVType: this.csvType.STRING,
            inputCSV: '',
            lonFieldIndex: 0,
            latFieldIndex: 1,
            timeFieldIndex: -1

        };

        this.onRadioChange = this.onRadioChange.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onCSVInputChange = this.onCSVInputChange.bind(this);
        this.readCSVFile = this.readCSVFile.bind(this);
        this.readCSVURL = this.readCSVURL.bind(this);
        this.getCSVHeadInfo = this.getCSVHeadInfo.bind(this);
        this.onModalOK = this.onModalOK.bind(this);
        this.onModalCancel = this.onModalCancel.bind(this);
    }

    render() {

        return (
            <Modal
                title='添加CSV矢量图层'
                visible={this.props.visible}
                onOk={this.onModalOK}
                onCancel={this.onModalCancel}
                okButtonProps={{disabled: this.state.okDisabled}}
            >
                <Radio.Group onChange={this.onRadioChange} value={this.state.inputCSVType}>
                    <Radio value={this.csvType.STRING}>CSV字符串</Radio>
                    <Radio value={this.csvType.FILE}>CSV文件</Radio>
                    <Radio value={this.csvType.URL}>CSV的URL</Radio>
                </Radio.Group>

                <Divider/>
                {this.getCSVSettingPanel(this.state.inputCSVType)}
                <br/>

                经度字段:
                <Select style={{width: '150px'}} size='small' defaultValue={this.state.lonFieldIndex}
                        onChange={(v) => this.setState({lonFieldIndex: v})}>
                    {this.getCSVHeadInfo()}
                </Select><br/>
                纬度字段:
                <Select style={{width: '150px'}} size='small' defaultValue={this.state.latFieldIndex}
                        onChange={(v) => this.setState({latFieldIndex: v})}>
                    {this.getCSVHeadInfo()}
                </Select><br/>
                时间字段:
                <Select style={{width: '150px'}} size='small' defaultValue={this.state.timeFieldIndex}
                        onChange={(v) => this.setState({timeFieldIndex: v})}>
                    <Select.Option value={-1} key={-1}>无时间字段</Select.Option>
                    {this.getCSVHeadInfo()}
                </Select><br/>
            </Modal>
        );

    }

    onRadioChange = e => {
        this.setState({
            inputCSVType: e.target.value
        })
    };

    getCSVSettingPanel(csvType) {
        switch (csvType) {
            case this.csvType.STRING:
                return (
                    <Fragment>
                        请输入图层名称:
                        <Input value={this.state.inputName} onChange={this.onNameInputChange}/>
                        请粘贴CSV内容:
                        <Input.TextArea placeholder='Please Enter CSV Text'
                                        autoSize={{minRows: 5, maxRows: 8}} value={this.state.inputCSV}
                                        onChange={this.onCSVInputChange}/>
                    </Fragment>
                );
            case this.csvType.FILE:
                return (
                    <Fragment>
                        请输入图层名称:
                        <Input value={this.state.inputName} onChange={this.onNameInputChange} addonAfter={
                            <Upload action={this.readCSVFile} showUploadList={false}>
                                <Icon type="upload"/>
                            </Upload>
                        }/>
                        <Input.TextArea placeholder='Please Enter CSV Text'
                                        autoSize={{minRows: 5, maxRows: 8}} value={this.state.inputCSV}
                                        onChange={this.onCSVInputChange}/>
                    </Fragment>
                );
            case this.csvType.URL:
                return (
                    <Fragment>
                        请输入图层名称:
                        <Input value={this.state.inputName} onChange={this.onNameInputChange}/>
                        请输入CSV的URL地址:
                        <Input.Search
                            placeholder="input CSV URL"
                            enterButton="读取"
                            size="large"
                            onSearch={value => this.readCSVURL(value)}
                        />
                        <Input.TextArea placeholder='Please Enter CSV Text'
                                        autoSize={{minRows: 5, maxRows: 8}} value={this.state.inputCSV}
                                        onChange={this.onCSVInputChange}/>
                    </Fragment>
                );
            default:
                return "";
        }
    }

    onCSVInputChange(e) {
        this.setState({
            inputCSV: e.target.value
        });
    }

    readCSVFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                this.setState({inputCSV: reader.result});
                this.getCSVHeadInfo();
                resolve(reader.result);
            };
            reader.onerror = () => {
                this.setState({inputCSV: ""});
                this.getCSVHeadInfo();
                console.error("read csv file error");
                reject("");
            }
        });
    }

    readCSVURL(url) {
        if (url) {
            axios.get(url).then(res => {
                const data = res.data;
                this.setState({inputCSV: data});
                this.getCSVHeadInfo();
            }).catch(e => {
                this.setState({inputCSV: ""});
                this.getCSVHeadInfo();
                console.error("csv url error");
            })
        }
    }

    onNameInputChange(e) {
        const inputName = e.target.value;
        this.setState((preState) => ({
            inputName
        }));
    }

    onModalOK() {
        this.props.addLayer(this.props.olmap, this.state.inputName, this.state.inputCSV, {
            lon: this.state.lonFieldIndex,
            lat: this.state.latFieldIndex,
            time: this.state.timeFieldIndex
        });
        this.props.onOK();
    }

    onModalCancel() {
        this.props.onCancel();
    }

    getCSVHeadInfo() {
        const csv = this.state.inputCSV;
        const head = csv.split("\n")[0];
        const fields = head.split(",");
        return fields.map((field, index) => <Select.Option value={index} key={index}>{field}</Select.Option>);
    }
}

const mapStateToProps = (state) => ({
    olmap: state.olmap.olmap
});

const mapDispatchToProps = (dispatch) => ({
    addLayer: (olmap, name, csv, fieldIndex) => {
        const layer = OLMAP.makeCSVLayer(olmap, name, csv, fieldIndex);
        const action = actionCreators.addLayerAction(layer);
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCSVLayerTool);