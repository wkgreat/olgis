package wkgreat.gisservice.basicalgo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.geojson.feature.FeatureJSON;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import wkgreat.gisservice.GisserviceApplicationTests;


/**
 * @author Ke Wang
 * @since 2020/8/30
 */
class GeoHashControllerTest extends GisserviceApplicationTests {

    @Autowired
    protected MockMvc mockMvc;

    @Test
    public void testGeohash() throws Exception {
        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.get("/grid/geohash/geohash")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .param("lon","0")
                        .param("lat","0")
                        .param("len","6")
        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();

        String resJson = mvcResult.getResponse().getContentAsString();
        Assert.assertNotNull(resJson);
        Assert.assertFalse(resJson.isEmpty());

        JSONObject jobj = JSON.parseObject(resJson);
        String msg = jobj.getString("message");
        Boolean suc = jobj.getBoolean("success");
        String data = jobj.getString("data");

        System.out.println(msg);

        Assert.assertNotNull(suc);
        Assert.assertEquals(suc, true);
        Assert.assertEquals(data.length(), 6);
        Assert.assertEquals(data, "s00000");

    }

    @Test
    public void testFishnet() throws Exception {
        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.get("/grid/geohash/fishnet")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .param("west","117")
                        .param("east","117.1")
                        .param("south","32")
                        .param("north","32.1")
                        .param("len","4")
        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();

        String resJson = mvcResult.getResponse().getContentAsString();
        Assert.assertNotNull(resJson);
        Assert.assertFalse(resJson.isEmpty());

        JSONObject jobj = JSON.parseObject(resJson);
        String msg = jobj.getString("message");
        Boolean suc = jobj.getBoolean("success");
        String data = jobj.getString("data");

        System.out.println(msg);

        Assert.assertNotNull(suc);
        Assert.assertEquals(suc, true);
        Assert.assertTrue(data!=null && !data.isEmpty());

        SimpleFeatureCollection collection
                = (SimpleFeatureCollection) new FeatureJSON().readFeatureCollection(data);

        Assert.assertNotNull(collection);
        Assert.assertFalse(collection.isEmpty());



    }

}