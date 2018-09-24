# wxapp-timePicker
微信小程序自定义时间选择器，支持多种自定义功能。[在开发工具中浏览](wechatide://minicode/OGPpLFmW7t2k)  
配置
```js
pickerConfig: {
  endDate: true,                          // 是否需要结束时间，为true时显示开始时间和结束时间两个picker
  column: "second",                       //可选的最小时间范围hour、minute、secend
  dateLimit: true,                        //是否现在时间可选范围，false时可选任意时间；未数字n时，范围是当前时间的最近n天
  limitStartTime: "2015-05-06 12:32:44",  //最小可选时间
  limitEndTime: "2055-05-06 12:32:44"     //最大可选时间 
}
```

其他限制条件可修改组件中的compareTime函数定义

endDate: true  
![gif](https://raw.githubusercontent.com/rover95/wxapp-timePicker/master/images/endDate.gif)
   
endDate: false  
![gif](https://raw.githubusercontent.com/rover95/wxapp-timePicker/master/images/noEndDate.gif)
