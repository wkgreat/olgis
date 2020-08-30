package wkgreat.gisservice.basicalgo.service;

import com.uber.h3core.H3Core;
import junit.framework.TestCase;
import org.junit.jupiter.api.Test;

import java.io.IOException;

/**
 * @author Ke Wang
 * @since 2020/8/29
 */
class UberH3Test extends TestCase {

    @Test
    public void test() throws IOException {
        H3Core h3Core = H3Core.newInstance();
        long h3 = h3Core.geoToH3(32,117,0);
        System.out.println(h3);

        String addr = h3Core.geoToH3Address(32,117, 0);
        System.out.println(addr);
    }

}