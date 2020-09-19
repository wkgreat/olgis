package wkgreat.domain.gis.shapefile;

import org.geotools.data.DefaultTransaction;
import org.geotools.data.Transaction;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.data.simple.SimpleFeatureStore;
import org.opengis.feature.simple.SimpleFeatureType;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Ke Wang
 * @since 2020/9/19
 * 写shapefile文件
 */
public class ShapefileWriter {

    /**
     * 新建shapefile文件，并将Features写入
     * @param newFile 新建文件
     * @param collection 要素集合 {@link SimpleFeatureCollection}
     * */
    public void writeFeatures(File newFile, SimpleFeatureCollection collection) throws IOException {
        //DataStoreFactory
        ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory();

        Map<String, Serializable> params = new HashMap<>();
        params.put("url", newFile.toURI().toURL());
        params.put("create spatial index", Boolean.TRUE);

        //createNewDataStore
        ShapefileDataStore newDataStore = (ShapefileDataStore) dataStoreFactory.createNewDataStore(params);
        newDataStore.createSchema(collection.getSchema());

        //Transaction
        Transaction transaction = new DefaultTransaction("create");
        String typeName = newDataStore.getTypeNames()[0];
        System.out.println(typeName);
        //FeatureSource
        SimpleFeatureSource featureSource = newDataStore.getFeatureSource(typeName);
        SimpleFeatureType SHAPE_TYPE = featureSource.getSchema();
        System.out.println("SHAPE_TYPE: " + SHAPE_TYPE);

        //featureSource -> SimpleFeatureStore
        if(featureSource instanceof SimpleFeatureStore) {
            //SimpleFeatureStore
            SimpleFeatureStore featureStore = (SimpleFeatureStore) featureSource;

            featureStore.setTransaction(transaction);

            try {
                //addFeatures
                featureStore.addFeatures(collection);
                transaction.commit();
            } catch (Exception problem) {
                problem.printStackTrace();
                transaction.rollback();
            } finally {
                transaction.close();
            }

        } else {
            System.out.println(typeName + " does not support read/write access");
            System.exit(1);
        }
    }

}
