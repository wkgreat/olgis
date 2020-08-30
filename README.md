# OLGIS - Web GIS APP
一个WebGIS应用，前端使用OpenLayers及React，后端使用springboot

## Test Run or debug in IDE
第一步: 执行maven编译命令
```shell script
mvn compile
```
第二步: 在IDE中运行或调试

## 构建及部署
第一步: 执行脚本进行打包
```shell script
sh build.sh
```

第二步: 打包好的jar包在dist文件夹中，将jar包发送至服务器，执行一下命令运行,
```shell script
java -jar olgis-gisservice-x.x.x-app.jar
```

## 使用
浏览器访问 `http://[服务器地址]:[端口号]`

