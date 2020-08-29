package wkgreat.gisservice;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GisserviceApplicationTests{

	@Test
	void test() {
		System.out.println("First Text");
		Assert.assertEquals(1,1);
	}

}