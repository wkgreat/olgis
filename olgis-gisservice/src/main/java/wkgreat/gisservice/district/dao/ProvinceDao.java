package wkgreat.gisservice.district.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import wkgreat.gisservice.district.bean.ChinaProvince;

/**
 * @author Ke Wang
 * @since 2020/8/20
 */
public interface ProvinceDao extends JpaRepository<ChinaProvince, Integer> {
}
