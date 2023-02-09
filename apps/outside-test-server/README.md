# Outside Test Server
**对工作空间的其它组件（packages内）采用npm下载方式安装，而不使用工作空间的库。**
用于验证发布内容的可用性。

说明如下：
``` json
// 仅针对已发布的包
// "web-csv-util": "workspace:^0.5.2"
 "web-csv-util": "0.5.2",
```