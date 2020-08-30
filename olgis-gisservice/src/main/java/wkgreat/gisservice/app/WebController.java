package wkgreat.gisservice.app;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author Ke Wang
 * @since 2020/8/28
 */
@Controller
@CrossOrigin(origins = "*")
public class WebController {

    @Value("${server.address}")
    private String address;

    @Value("${server.port}")
    private String port;

    String getAddress() {
        String ip = null;
        try {
            InetAddress ip4 = Inet4Address.getLocalHost();
            ip = ip4.getHostAddress();
            return ip;
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return ip;
    }

    @GetMapping(value = {"/","/index"})
    public String index(Model model) {
        String addr = null;
        if(StringUtils.isNotEmpty(address)) {
            addr = address;
        } else {
            addr = getAddress();
        }
        model.addAttribute("address",addr);
        model.addAttribute("port",port);
        return "index";
    }

}
