package wkgreat.gisservice.district.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import wkgreat.gisservice.district.service.DistrictService;

/**
 * @author Ke Wang
 * @since 2020/8/20
 */
@RestController
public class DistrictController {

    @Autowired
    private DistrictService districtService;



}
