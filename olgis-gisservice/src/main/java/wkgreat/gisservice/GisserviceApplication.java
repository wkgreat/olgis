package wkgreat.gisservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author wkgreat
 */
@SpringBootApplication
@Slf4j
public class GisserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GisserviceApplication.class, args);
        log.info("OLGIS Ready ^_^");
    }

}
