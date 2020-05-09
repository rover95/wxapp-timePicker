# wxapp-timePicker
微信小程序自定义时间选择器，支持多种自定义功能。  

[在开发工具中浏览:](https://developers.weixin.qq.com/s/N9EdArmQ7a6j)  [https://developers.weixin.qq.com/s/N9EdArmQ7a6j](https://developers.weixin.qq.com/s/N9EdArmQ7a6j)   
复制链接在浏览器中打开  
  
配置项
```js
pickerConfig: {
  endDate: true,                          // 是否需要结束时间，为true时显示开始时间和结束时间两个picker
  column: "second",                       //可选的最小时间范围day、hour、minute、secend
  dateLimit: true,                        //是否现在时间可选范围，false时可选任意时间；当为数字n时，范围是当前时间的最近n天
  initStartTime:'2019-01-01 12:32:44',    //picker初始时间，默认当前时间
  initEndTime: "2019-12-01 12:32:44",     //picker初始结束时间，默认当前时间
  limitStartTime: "2015-05-06 12:32:44",  //最小可选时间
  limitEndTime: "2055-05-06 12:32:44",     //最大可选时间 
  yearStart: 1920, // 时间控件可选择的最小时间  //说明文档并不是很完整，有些配置项需要到源码里去找
  yearEnd: 2020, // 时间控件可选择的最大时间 //说明文档并不是很完整，有些配置项需要到源码里去找

}
```

其他限制条件可修改组件中的compareTime函数定义

endDate: true  
![gif](https://raw.githubusercontent.com/rover95/wxapp-timePicker/master/images/endDate.gif)
   
endDate: false  
![gif](https://raw.githubusercontent.com/rover95/wxapp-timePicker/master/images/noEndDate.gif)

## 更多

[小程序热力图组件](https://github.com/rover95/wxapp-heatmap)  
![img](https://raw.githubusercontent.com/rover95/image/master/img/heatmap3.png)

[自定义轮播图组件](https://github.com/rover95/wxapp-swiper)  
![gif](https://raw.githubusercontent.com/rover95/image/master/gif/swiper2.gif)
