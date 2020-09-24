package wkgreat.domain.basic;

import lombok.Data;

/**
 * @author Ke Wang
 * @since 2020/9/24
 * 请求进度
 */
@Data
public class RequestProgress {

    /**
     * 请求状态
     * */
    public enum RequestStatus{
        /** 正在处理中 */
        RUNNING,
        /** 请求成功完成 */
        SUCCESS,
        /** 请求request失败 */
        FAILED
//        /** websocket建立失败，不影响请求 */
//        SESSION_FAILED
    }

    /**
     * 请求ID
     * */
    String requestId;

    /**
     * 请求状态
     * */
    RequestStatus status;

    /**
     * 进度 0-100 (%)
     * */
    Double progress;

    /**
     * 执行信息
     * */
    String message;

    public static RequestProgress running(String requestId, Double progress) {
        RequestProgress requestProgress = new RequestProgress();
        requestProgress.setRequestId(requestId);
        requestProgress.setStatus(RequestStatus.RUNNING);
        requestProgress.setProgress(progress);
        return requestProgress;
    }

    public static RequestProgress running(String requestId, double cur, double total) {
        RequestProgress requestProgress = new RequestProgress();
        requestProgress.setRequestId(requestId);
        requestProgress.setStatus(RequestStatus.RUNNING);
        requestProgress.setProgress(calcProgress(cur, total));
        return requestProgress;
    }

    public static RequestProgress success(String requestId) {
        RequestProgress requestProgress = new RequestProgress();
        requestProgress.setRequestId(requestId);
        requestProgress.setStatus(RequestStatus.SUCCESS);
        requestProgress.setProgress(100.0);
        return requestProgress;
    }

    public static RequestProgress failed(String requestId) {
        RequestProgress requestProgress = new RequestProgress();
        requestProgress.setRequestId(requestId);
        requestProgress.setStatus(RequestStatus.FAILED);
        requestProgress.setProgress(0.0);
        requestProgress.setMessage("");
        return requestProgress;
    }

    public static RequestProgress failed(String requestId, String message) {
        RequestProgress requestProgress = new RequestProgress();
        requestProgress.setRequestId(requestId);
        requestProgress.setStatus(RequestStatus.FAILED);
        requestProgress.setProgress(0.0);
        requestProgress.setMessage(message);
        return requestProgress;
    }

//    public static RequestProgress sessionFailed(String requestId) {
//        RequestProgress requestProgress = new RequestProgress();
//        requestProgress.setRequestId(requestId);
//        requestProgress.setStatus(RequestStatus.SESSION_FAILED);
//        requestProgress.setProgress(0.0);
//        return requestProgress;
//    }

    public static Double calcProgress(double cur, double total) {
        return (cur / total) * 100;
    }


}
