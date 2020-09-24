package wkgreat.gisservice.basicalgo.beans;

import lombok.Data;
import wkgreat.domain.basic.BaseRequest;

/**
 * @author Ke Wang
 * @since 2020/9/24
 */
@Data
public class GeoHashFishnetRequest extends BaseRequest {

    Double west;
    Double east;
    Double south;
    Double north;
    Integer len;

}
