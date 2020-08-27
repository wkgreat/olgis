package wkgreat.gisservice.district.service;

import org.springframework.stereotype.Service;
import wkgreat.gisservice.district.bean.ChinaProvince;

/**
 * @author Ke Wang
 * @since 2020/8/20
 */
@Service
public interface DistrictService {

    ChinaProvince get();
}
