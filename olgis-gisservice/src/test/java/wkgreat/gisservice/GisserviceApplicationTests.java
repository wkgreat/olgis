package wkgreat.gisservice;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import wkgreat.gisservice.district.service.DistrictService;

@SpringBootTest
class GisserviceApplicationTests{

	@Autowired
	DistrictService districtService;

	@Test
	void test() {
		System.out.println("First Text");
		Assert.assertEquals(1,1);
	}

}