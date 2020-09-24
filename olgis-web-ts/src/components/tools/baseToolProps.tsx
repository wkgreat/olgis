import {RequestProgress} from "../../hooks/useRequestProgress";

export type ToolCallback = (event?:any) => void

/**
 * 定义的所有工具属性应该继承BaseToolProps
 * */
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

    /**
     * progress 处理
     * */
    onProgress ?: (progress: RequestProgress) => any

}

export default BaseToolProps;