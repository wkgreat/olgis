package wkgreat.domain.basic;

import lombok.Data;

import java.io.Serializable;

/**
 * @author Ke Wang
 * @since 2020/9/24
 */
@Data
public class BaseRequest implements Serializable {

    /**
     * 请求ID，前端生成
     * */
    String requestId;

}
