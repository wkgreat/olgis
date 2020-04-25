package wkgreat.domain.basic;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse<T> {

    T data;
    boolean success;
    int code;
    String message;

    /**
     * 成功
     * */
    public static <T> BaseResponse<T> success(T data) {
        BaseResponse<T> baseResponse = new BaseResponse<T>();
        baseResponse.setData(data);
        baseResponse.setCode(200);
        baseResponse.setSuccess(true);
        baseResponse.setMessage("success");
        return baseResponse;
    }

    /**
     * 客户端错误
     * */
    public static <T> BaseResponse<T> fail() {
        return fail(400, "unknown fail");
    }
    public static <T> BaseResponse<T> fail(String msg) {
        return fail(400, msg);
    }
    public static <T> BaseResponse<T> fail(int code, String msg) {
        BaseResponse<T> baseResponse = new BaseResponse<T>();
        baseResponse.setData(null);
        baseResponse.setCode(code);
        baseResponse.setSuccess(false);
        baseResponse.setMessage(msg);
        return baseResponse;
    }

    /**
     * 服务端错误
     * */
    public static <T> BaseResponse<T> error() {
        return error(500, "unknown error");
    }
    public static <T> BaseResponse<T> error(String msg) {
        return error(500, msg);
    }
    public static <T> BaseResponse<T> error(int code, String msg) {
        BaseResponse<T> baseResponse = new BaseResponse<T>();
        baseResponse.setData(null);
        baseResponse.setCode(code);
        baseResponse.setSuccess(false);
        baseResponse.setMessage(msg);
        return baseResponse;
    }

}
