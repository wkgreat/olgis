package wkgreat.gisservice.basicalgo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wkgreat.domain.basic.BaseResponse;
import wkgreat.gisservice.basicalgo.service.UberH3Service;

/**
 * @author Ke Wang
 * @since 2020/8/29
 */
@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/grid/h3")
public class UberH3Controller {

    @Autowired
    UberH3Service uberH3Service;

    /**
     * 获取地理点位H3索引边界
     * @param lon 点经度
     * @param lat 点纬度
     * @param res 分辨率
     * @return h3边界多边形geojson数据
     * */
    @GetMapping("/getH3Boundary")
    BaseResponse<String> getH3Boundary(Double lon, double lat, int res){
        BaseResponse<String> baseResponse = null;
        try {
            String geojson = uberH3Service.getH3Boundary(lon, lat, res);
            baseResponse = BaseResponse.success(geojson);
            return baseResponse;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("getH3Boundary Error, [{}]", e.getMessage());
            baseResponse = BaseResponse.error(e.getMessage());
        }
        return baseResponse;
    }

    /**
     * 获取矩形范围内的H3格网
     * @param west 西边界
     * @param south 南边界
     * @param east 东边界
     * @param north 北边界
     * @param res H3格网分辨率
     * @return H3格网geojson数据
     * */
    @GetMapping("/getH3Grid")
    BaseResponse<String> getH3Grid(Double west, Double south, Double east, Double north, int res) {
        BaseResponse<String> baseResponse = null;
        try {
            String geojson = uberH3Service.getH3Grid(west, south, east, north, res);
            baseResponse = BaseResponse.success(geojson);
            return baseResponse;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("getH3Boundary Error, [{}]", e.getMessage());
            baseResponse = BaseResponse.error(e.getMessage());
        }
        return baseResponse;
    }

}
