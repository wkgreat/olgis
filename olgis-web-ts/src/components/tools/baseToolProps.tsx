type ToolCallback = (event?:any) => void

interface BaseToolProps {

    /**
     * 激活信号
     * */
    signal ?: number

    /**
     * 工具名称
     * */
    title ?: string

    /**
     * 是否显示
     * */
    open ?: boolean;

    /**
     * 是否显示OK按钮
     * */
    enableOK ?: boolean;

    /**
     * OK的回调函数
     * */
    onOK ?: ToolCallback;

    /**
     * 是否显示Cancel按钮
     * */
    enableCancel ?: boolean;

    /**
     * Cancel的回调函数
     * */
    onCancel ?: ToolCallback;

}

export default BaseToolProps;