package wkgreat.gisservice.basicalgo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wkgreat.domain.basic.BaseResponse;
import wkgreat.domain.basic.RequestProgress;
import wkgreat.gisservice.basicalgo.beans.GeoHashFishnetRequest;
import wkgreat.gisservice.basicalgo.beans.GeoHashRequest;
import wkgreat.gisservice.basicalgo.service.GeoHashService;
import wkgreat.gisservice.socket.RequestProgressSocketEndPoint;

import java.io.IOException;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/grid/geohash")
public class GeoHashController {

    @Autowired
    GeoHashService geoHashService;

    @Autowired
    RequestProgressSocketEndPoint requestProgressSocketEndPoint;

    @GetMapping("/geohash")
    public BaseResponse<String> geohash(GeoHashRequest request) {
        String geohash = geoHashService.geohash(request);
        return BaseResponse.success(geohash);
    }

    @GetMapping("/fishnet")
    public BaseResponse<String> geohashFishnet(GeoHashFishnetRequest request) {
        String res = null;
        BaseResponse<String> response = null;
        String requestId = request.getRequestId();
        try {
            res = geoHashService.fishnet(request);
            response = BaseResponse.success(res);
            requestProgressSocketEndPoint.sendProgress(RequestProgress.success(requestId));
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("fishnet error, [{}]", e.getMessage());
            response = BaseResponse.error(e.getMessage());
            requestProgressSocketEndPoint.sendProgress(RequestProgress.failed(requestId, e.getMessage()));
        } finally {
            try {
                requestProgressSocketEndPoint.close(requestId);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return response;
    }

}
