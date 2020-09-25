package wkgreat.gisservice.basicalgo.beans;

import lombok.Data;
import lombok.EqualsAndHashCode;
import wkgreat.domain.basic.BaseRequest;

/**
 * @author Ke Wang
 * @since 2020/9/25
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class H3GridRequest extends BaseRequest {

    Double west;
    Double south;
    Double east;
    Double north;
    Integer res;
}
