package wkgreat.gisservice.district.bean;

import lombok.Data;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Point;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author Ke Wang
 * @since 2020/8/20
 */
@Entity
@Table(name = "china_provinces")
@Data
public class ChinaProvince implements Serializable {

    @Column(name = "province_name")
    private String provinceName;

    @Id
    @Column(name = "province_adcode")
    private Integer provinceAdcode;

    @Column(name = "province_citycode")
    private String provinceCitycode;

    @Column(name = "center", columnDefinition = "geometry")
    private Point center;

    @Column(name = "the_geom", columnDefinition = "geometry")
    private MultiPolygon theGeom;

}
