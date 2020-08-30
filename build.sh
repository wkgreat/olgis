if [ ! -d "dist" ]; then
  mkdir "dist"
else
  rm -rf "./dist/*"
fi
mvn clean && mvn package -P prod && cp ./olgis-gisservice/target/*-app.jar ./dist