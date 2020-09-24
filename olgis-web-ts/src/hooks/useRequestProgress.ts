import {useEffect, useState} from "react";

/**
 * 状态
 * */
export type ProgressStatus = "SESSION_OPEN" | "SESSION_CLOSE" | "SESSION_ERROR" | "RUNNING" | "SUCCESS" | "FAILED"

/**
 * 请求执行进度
 * */
export interface RequestProgress {
    /**
     * 请求进度状态
     * */
    status: ProgressStatus
    /**
     * 请求ID
     * */
    requestId: string
    /**
     * 请求执行进度
     * */
    progress: number

    /**
     * 执行信息
     * */
    message?: string
}

function useRequestProgress(url:string, requestId:string, open:boolean) {

    const [socket, setSocket] = useState<WebSocket|undefined>(undefined);
    const [progress, setProgress] = useState<RequestProgress|undefined>(undefined);

    const onopen = function() {
        setProgress({
            status: "SESSION_OPEN",
            requestId: requestId,
            progress: 0
        })
    };

    const onclose = function() {
        setProgress({
            status: "SESSION_CLOSE",
            requestId: requestId,
            progress: 0
        });
    };

    const onerror = function(ev: Event) {
        setProgress({
            status: "SESSION_ERROR",
            requestId: requestId,
            progress: 0,
            message: "session error"
        });
    };

    const onmessage = function(ev: MessageEvent) {
        const data = ev.data;
        const p = JSON.parse(data) as RequestProgress;
        setProgress(p);
    };

    useEffect(()=>{
        if(url && requestId && open) {
            const ws = new WebSocket(url);
            ws.onopen = onopen;
            ws.onclose = onclose;
            ws.onerror = onerror;
            ws.onmessage = onmessage;
            setSocket(ws)
        } else {
            if(socket) {
                socket.close();
                setSocket(undefined);
            }
        }
    },[url, requestId, open]);

    return progress;
}

export default useRequestProgress;
