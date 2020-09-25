package wkgreat.gisservice.basicalgo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wkgreat.domain.basic.BaseResponse;
import wkgreat.gisservice.basicalgo.beans.H3BoundaryRequest;
import wkgreat.gisservice.basicalgo.beans.H3GridRequest;
import wkgreat.gisservice.basicalgo.service.UberH3Service;
import wkgreat.gisservice.socket.RequestProgressSocketEndPoint;

import java.io.IOException;

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

    @Autowired
    RequestProgressSocketEndPoint requestProgressSocketEndPoint;

    /**
     * 获取地理点位H3索引边界
     * @param request {@link H3BoundaryRequest}
     * @return h3边界多边形geojson数据
     * */
    @GetMapping("/getH3Boundary")
    BaseResponse<String> getH3Boundary(H3BoundaryRequest request){
        BaseResponse<String> baseResponse = null;
        String requestId = request.getRequestId();
        try {
            String geojson = uberH3Service.getH3Boundary(request);
            baseResponse = BaseResponse.success(geojson);
            requestProgressSocketEndPoint.sendSuccessProgress(requestId);
            return baseResponse;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("getH3Boundary Error, [{}]", e.getMessage());
            baseResponse = BaseResponse.error(e.getMessage());
            requestProgressSocketEndPoint.sendFailedProgress(requestId, e.getMessage());
        } finally {
            try {
                requestProgressSocketEndPoint.close(requestId);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return baseResponse;
    }

    /**
     * 获取矩形范围内的H3格网
     * @param request {@link H3GridRequest}
     * @return H3格网geojson数据
     * */
    @GetMapping("/getH3Grid")
    BaseResponse<String> getH3Grid(H3GridRequest request) {
        BaseResponse<String> baseResponse = null;
        String requestId = request.getRequestId();
        try {
            String geojson = uberH3Service.getH3Grid(request);
            baseResponse = BaseResponse.success(geojson);
            requestProgressSocketEndPoint.sendSuccessProgress(requestId);
            return baseResponse;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("getH3Boundary Error, [{}]", e.getMessage());
            baseResponse = BaseResponse.error(e.getMessage());
            requestProgressSocketEndPoint.sendFailedProgress(requestId, e.getMessage());
        } finally {
            try {
                requestProgressSocketEndPoint.close(requestId);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return baseResponse;
    }

}
