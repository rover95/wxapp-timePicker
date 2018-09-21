
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pickerShow: {
      type: Boolean,
      observer:function(){
        // setTimeout(() => {
        //   this.setData({ pickerColumnShow: true });
        // }, 0);

      }
    },
    config: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    // pickerShow:true
    // limitStartTime: new Date().getTime()-1000*60*60*24*30,
    // limitEndTime: new Date().getTime(),
    // yearStart:2000,
    // yearEnd:2100
  },
  detached: function() {
    console.log("dele");
  },
  attached: function() {},
  ready: function() {
    this.readConfig();
    this.initPick();
    console.log(this.data.startValue);
    this.setData({
      startValue: this.data.startValue,
      endValue: this.data.endValue
    });

    this.setData({ pickerColumnShow: true });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //读取配置项
    readConfig() {
      let limitEndTime = new Date().getTime();
      let limitStartTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 30;
      console.log(this.data);
      if (this.data.config) {
        let conf = this.data.config;
        if (typeof conf.dateLimit == "number") {
          limitStartTime =
            new Date().getTime() - 1000 * 60 * 60 * 24 * conf.dateLimit;
        }
        this.setData({
          yearStart: conf.yearStart || 2000,
          yearEnd: conf.yearEnd || 2100,
          endDate: conf.endDate || false,
          hourColumn:
            conf.column == "hour" ||
            conf.column == "minute" ||
            conf.column == "second",
          minColumn: conf.column == "minute" || conf.column == "second",
          secColumn: conf.column == "second"
        });
      }

      let limitStartTimeArr = formatTime(limitStartTime);
      let limitEndTimeArr = formatTime(limitEndTime);
      this.setData({
        limitStartTime,
        limitStartTimeArr,
        limitEndTime,
        limitEndTimeArr
      });
    },
    onConfirm: function() {
      console.log(this.data.startPickTime, this.data.endPickTime);
      let startTime = new Date(this.data.startPickTime);
      let endTime = new Date(this.data.endPickTime);
      if (startTime <= endTime) {
        this.setData({
          startTime,
          endTime
        });
        let startArr = formatTime(startTime).arr;
        let endArr = formatTime(endTime).arr;
        // let s_h =

        let startTimeBack =
          startArr[0] +
          "-" +
          startArr[1] +
          "-" +
          startArr[2] +
          " " +
          (this.data.hourColumn ? startArr[3] : "00") +
          ":" +
          (this.data.minColumn ? startArr[4] : "00") +
          ":" +
          (this.data.secColumn ? startArr[5] : "00");

        let endTimeBack =
          endArr[0] +
          "-" +
          endArr[1] +
          "-" +
          endArr[2] +
          " " +
          (this.data.hourColumn ? endArr[3] : "00") +
          ":" +
          (this.data.minColumn ? endArr[4] : "00") +
          ":" +
          (this.data.secColumn ? endArr[5] : "00");

        let time = {
          startTime: startTimeBack,
          endTime: endTimeBack
        };
        console.log(time);

        //触发自定义事件
        this.triggerEvent("setPickerTime", time);
        this.triggerEvent("hidePicker", {});
      } else {
        wx.showToast({
          icon: "none",
          title: "时间不合理"
        });
      }
    },
    hideModal: function() {
      this.setData({
        pickerColumnShow: false
      });

      setTimeout(() => {
        this.setData({
          pickerColumnShow: true
        });
      }, 2000);
      this.triggerEvent("hidePicker", {});
    },
    changeStartDateTime: function(e) {
      let val = e.detail.value;
      this.compareTime(val, "start");
    },

    changeEndDateTime: function(e) {
      let val = e.detail.value;
      this.compareTime(val, "end");
    },
    //比较时间是否在范围内
    compareTime(val, type) {
      console.log(val);
      let h = val[3] ? this.data.HourList[val[3]] : "00";
      let m = val[4] ? this.data.MinuteList[val[4]] : "00";
      let s = val[5] ? this.data.SecondList[val[5]] : "00";
      let time =
        this.data.YearList[val[0]] +
        "-" +
        this.data.MonthList[val[1]] +
        "-" +
        this.data.DayList[val[2]] +
        " " +
        h +
        ":" +
        m +
        ":" +
        s;

      let start = this.data.limitStartTime;
      let end = this.data.limitEndTime;
      let timeNum = new Date(time).getTime();
      let year, month, day, hour, min, sec;
      console.log(timeNum < start, timeNum > end);

      if (timeNum < start) {
        let limitDate = this.data.limitStartTimeArr.arr;

        year = limitDate[0];
        month = limitDate[1];
        day = limitDate[2];
        hour = limitDate[3];
        min = limitDate[4];
        sec = limitDate[5];
      } else if (timeNum > end) {
        let limitDate = this.data.limitEndTimeArr.arr;
        year = limitDate[0];
        month = limitDate[1];
        day = limitDate[2];
        hour = limitDate[3];
        min = limitDate[4];
        sec = limitDate[5];
      } else {
        year = this.data.YearList[val[0]];
        month = this.data.MonthList[val[1]];
        day = this.data.DayList[val[2]];
        hour = this.data.HourList[val[3]];
        min = this.data.MinuteList[val[4]];
        sec = this.data.SecondList[val[5]];
      }
      console.log(this.data);

      console.log(year, month, day, hour, min, sec);
      if (type == "start") {
        this.setStartDate(year, month, day, hour, min, sec);
      } else if (type == "end") {
        this.setEndDate(year, month, day, hour, min, sec);
      }
    },
    getDays: function(year, month) {
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 2) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          ? 29
          : 28;
      } else {
        return daysInMonth[month - 1];
      }
    },
    initPick: function() {
      const date = new Date();
      const startDate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
      const nowYear = date.getFullYear();
      const nowMonth = date.getMonth() + 1;
      const nowDay = date.getDate();
      const nowHour = date.getHours();
      const nowMinute = date.getMinutes();

      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth() + 1;
      const startDay = startDate.getDate();
      const startHour = startDate.getHours();
      const startMinute = startDate.getMinutes();

      let YearList = [];
      let MonthList = [];
      let DayList = [];
      let HourList = [];
      let MinuteList = [];
      let SecondList = [];

      //设置年份列表
      for (let i = this.data.yearStart; i <= this.data.yearEnd; i++) {
        YearList.push(i);
      }

      // 设置月份列表
      for (let i = 1; i <= 12; i++) {
        MonthList.push(i);
      }
      // 设置日期列表
      for (let i = 1; i <= 31; i++) {
        DayList.push(i);
      }
      // 设置时列表
      for (let i = 0; i <= 23; i++) {
        if (0 <= i && i < 10) {
          i = "0" + i;
        }
        HourList.push(i);
      }
      // 分|秒
      for (let i = 0; i <= 59; i++) {
        if (0 <= i && i < 10) {
          i = "0" + i;
        }
        MinuteList.push(i);
        SecondList.push(i);
      }

      this.setData({
        YearList,
        MonthList,
        DayList,
        HourList,
        MinuteList,
        SecondList
      });

      this.setStartDate(
        startYear,
        startMonth,
        startDay,
        startHour,
        startMinute
      );
      this.setEndDate(nowYear, nowMonth, nowDay, nowHour, nowMinute);

      //!!!
      // setTimeout(() => {
      //   this.setStartDate(nowYear, nowMonth, nowDay, nowHour, nowMinute)
      //   this.setEndDate(nowYear, nowMonth, nowDay, nowHour, nowMinute)
      // }, 0);
    },
    setPickerDateArr(type, year, month, day, hour, minute, second) {
      let yearIdx = 0;
      let monthIdx = 0;
      let dayIdx = 0;
      let hourIdx = 0;
      let minuteIdx = 0;
      let secondIdx = 0;

      this.data.YearList.map((v, idx) => {
        if (parseInt(v) === year) {
          yearIdx = idx;
        }
      });

      this.data.MonthList.map((v, idx) => {
        if (parseInt(v) === month) {
          monthIdx = idx;
        }
      });

      // 重新设置日期列表
      let DayList = [];
      for (let i = 1; i <= this.getDays(year, month); i++) {
        DayList.push(i);
      }

      DayList.map((v, idx) => {
        if (parseInt(v) === day) {
          dayIdx = idx;
        }
      });
      if (type == "start") {
        this.setData({ startDayList: DayList });
      } else if (type == "end") {
        this.setData({ endDayList: DayList });
      }

      this.data.HourList.map((v, idx) => {
        if (parseInt(v) === parseInt(hour)) {
          hourIdx = idx;
        }
      });

      this.data.MinuteList.map((v, idx) => {
        if (parseInt(v) === parseInt(minute)) {
          minuteIdx = idx;
        }
      });
      this.data.SecondList.map((v, idx) => {
        if (parseInt(v) === parseInt(second)) {
          secondIdx = idx;
        }
      });

      return {
        yearIdx,
        monthIdx,
        dayIdx,
        hourIdx,
        minuteIdx,
        secondIdx
      };
    },
    setStartDate: function(year, month, day, hour, minute, second) {
      let pickerDateArr = this.setPickerDateArr(
        "start",
        year,
        month,
        day,
        hour,
        minute,
        second
      );
      console.log(pickerDateArr);
      this.setData({
        startYearList: this.data.YearList,
        startMonthList: this.data.MonthList,
        // startDayList: this.data.DayList,
        startHourList: this.data.HourList,
        startMinuteList: this.data.MinuteList,
        startSecondList: this.data.SecondList,
        startValue: [
          pickerDateArr.yearIdx,
          pickerDateArr.monthIdx,
          pickerDateArr.dayIdx,
          pickerDateArr.hourIdx,
          pickerDateArr.minuteIdx,
          pickerDateArr.secondIdx
        ],
        startPickTime:
          this.data.YearList[pickerDateArr.yearIdx] +
          "-" +
          this.data.MonthList[pickerDateArr.monthIdx] +
          "-" +
          this.data.DayList[pickerDateArr.dayIdx] +
          " " +
          this.data.HourList[pickerDateArr.hourIdx] +
          ":" +
          this.data.MinuteList[pickerDateArr.minuteIdx] +
          ":" +
          this.data.SecondList[pickerDateArr.secondIdx]
      });
      console.log("开始时间：" + this.data.startPickTime);
    },

    setEndDate: function(year, month, day, hour, minute, second) {
      let pickerDateArr = this.setPickerDateArr(
        "end",
        year,
        month,
        day,
        hour,
        minute,
        second
      );
      console.log(pickerDateArr);

      this.setData({
        endYearList: this.data.YearList,
        endMonthList: this.data.MonthList,
        // endDayList: this.data.DayList,
        endHourList: this.data.HourList,
        endMinuteList: this.data.MinuteList,
        endSecondList: this.data.SecondList,
        endValue: [
          pickerDateArr.yearIdx,
          pickerDateArr.monthIdx,
          pickerDateArr.dayIdx,
          pickerDateArr.hourIdx,
          pickerDateArr.minuteIdx,
          pickerDateArr.secondIdx
        ],
        endPickTime:
          this.data.YearList[pickerDateArr.yearIdx] +
          "-" +
          this.data.MonthList[pickerDateArr.monthIdx] +
          "-" +
          this.data.DayList[pickerDateArr.dayIdx] +
          " " +
          this.data.HourList[pickerDateArr.hourIdx] +
          ":" +
          this.data.MinuteList[pickerDateArr.minuteIdx] +
          ":" +
          this.data.SecondList[pickerDateArr.secondIdx]
      });
      // console.log('结束时间：' + this.data.endPickTime)
    }
  }
});


function formatTime(date) {
  console.log(typeof date);

  if (typeof date == 'string' || 'number') {
    date = new Date(date)
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return {
    str: [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'),
    arr: [year, month, day, hour, minute, second]
  }
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
