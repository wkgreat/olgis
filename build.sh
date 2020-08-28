if [ ! -d "dist" ]; then
  mkdir "dist"
fi
mvn clean && mvn package && cp ./olgis-gisservice/target/*-app.jar ./dist