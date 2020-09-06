package wkgreat.gisservice.info;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InfoService {

    @GetMapping("/info")
    public String appInfo() {
        return "gisservice.";
    }

}
