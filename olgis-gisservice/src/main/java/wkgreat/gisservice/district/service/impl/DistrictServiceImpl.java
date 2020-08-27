package wkgreat.gisservice.district.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wkgreat.gisservice.district.bean.ChinaProvince;
import wkgreat.gisservice.district.dao.ProvinceDao;
import wkgreat.gisservice.district.service.DistrictService;

import javax.transaction.Transactional;

/**
 * @author Ke Wang
 * @since 2020/8/20
 */
@Service
public class DistrictServiceImpl implements DistrictService {

    @Autowired
    ProvinceDao provinceDao;

    @Transactional
    @Override
    public ChinaProvince get() {
        return provinceDao.getOne(370000);
    }
}
