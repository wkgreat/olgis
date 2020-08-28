package wkgreat.gisservice.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Ke Wang
 * @since 2020/8/28
 */
@Controller
@CrossOrigin(origins = "*")
public class PageController {


    @GetMapping("/index")
    public String index() {
        return "index";
    }

}
