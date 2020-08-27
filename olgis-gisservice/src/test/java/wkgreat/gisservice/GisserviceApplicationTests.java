package wkgreat.gisservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import wkgreat.gisservice.district.bean.ChinaProvince;
import wkgreat.gisservice.district.service.DistrictService;

@SpringBootTest
class GisserviceApplicationTests {

	@Autowired
	DistrictService districtService;

	@Test
	void contextLoads() {
		System.out.println("Come on");
		ChinaProvince province = districtService.get();
		System.out.println(province);
	}

}