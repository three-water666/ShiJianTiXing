import React, { useEffect, useState } from "react";
import "./index.less";
import { View, Text } from "@tarojs/components";
import { Subject } from "../../utils/Subject";
import {
    getFirstDayOfMonth,
    getFirstDayOfCalendar,
    formatDayWithTwoWords,
    isCurrentMonth,
    isCurrentDay,
    getWeekLabelList,
} from "../../utils/Utils";

interface DayItem {
    date: Date;
    monthDay: number | string;
    isCurrentMonth: boolean;
    isCurrentDay: boolean;
}

export default ({
    observer,
    weekLabelIndex = 1,
}: {
    observer: Subject;
    weekLabelIndex?: number;
}) => {
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date());
    const [weekList, setWeekList] = useState<DayItem[][]>([]);
    const [weekLabelArray, setWeekLabelArray] = useState<string[]>([]);
    // 设置weekList值
    const setWeekListValue = (firstDayOfmonth: Date) => {
        let newWeekList = [];
        // 当前天
        let dayOfCalendar = getFirstDayOfCalendar(firstDayOfmonth, weekLabelIndex);

        // 遍历层数为6，因为日历显示当前月数据为6行
        for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
            let weekItem = [];
            // 每一周为7天
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                let dayItem: DayItem = {
                    date: dayOfCalendar,
                    // 几号
                    monthDay: formatDayWithTwoWords(dayOfCalendar.getDate()),
                    // 是否当月日期
                    isCurrentMonth: isCurrentMonth(firstDayOfmonth, dayOfCalendar),
                    // 是否当天
                    isCurrentDay: isCurrentDay(dayOfCalendar),
                };
                if (
                    weekIndex !== 0 &&
                    dayIndex === 0 &&
                    dayItem.isCurrentMonth === false
                ) {
                    break;
                }
                weekItem.push(dayItem);

                // 当前日期加1，以此类推得到42条记录
                dayOfCalendar.setDate(dayOfCalendar.getDate() + 1);
            }

            if (weekItem.length > 0) {
                newWeekList.push(weekItem);
            }
            console.log("weekItem", weekItem);

            setWeekList(newWeekList);
        }
    };
    /**
     * 观察者模式相关方法
     */
    // 切换月份更新body数据
    const update = (content: Date) => {
        setFirstDayOfMonth(content);
        setWeekListValue(content);
    };
    useEffect(() => {
        // 注册观察者对象
        observer.addObserver({
            update: update,
        });

        // 设置当前月的第一天，用来数据初始话以及进行日期是否为当前月判断
        setFirstDayOfMonth(getFirstDayOfMonth(new Date()));

        // 设置每周label标识数据
        setWeekLabelArray(getWeekLabelList(weekLabelIndex));

        // 初始设置当前月日历数据
        setWeekListValue(getFirstDayOfMonth(new Date()));
    }, []);

    /**
     * 日历方法
     */
    // 点击日历
    const onClickDay = (dayItem: DayItem) => {
        // this.$emit('dayClick', dayItem);
        console.log(dayItem);
    };

    /**
     * 工具方法
     */
    // 周六/周日标识红色字体
    const isShowRedColorForWeekLable = (index: number) => {
        return (
            index + weekLabelIndex === 6 ||
            index + weekLabelIndex === 7 ||
            (index === 0 && weekLabelIndex === 0)
        );
    };

    return (
        <View className="calendar-body">
            {/* <!-- 日历周label标识 --> */}
            <View className="calendar-body-week-label">
                {weekLabelArray.map((item, index) => (
                    <View
                        className={`calendar-body-week-label-day ${isShowRedColorForWeekLable(index) ? "red-font" : ""
                            }`}
                        key={index}
                    >
                        <Text>{item}</Text>
                    </View>
                ))}
            </View>
            {/* <!-- 日历数据，遍历日历二位数组，得到每一周数据 --> */}
            <View className="calendar-body-month">
                {weekList.map((weekItem: DayItem[], index: number) => (
                    <View className="calendar-body-month-week" key={index}>
                        {/* <!-- 遍历每一周数据 --> */}
                        {weekItem.map((dayItem: DayItem, index_: number) => (
                            <View
                                key={index_}
                                className={`calendar-body-month-week-day ${dayItem.isCurrentMonth ? "calendar-body-current-month" : ""
                                    } ${dayItem.isCurrentDay ? "calendar-body-current-day" : ""}`}
                                onClick={() => onClickDay(dayItem)}
                            >
                                <Text>{dayItem.monthDay}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};
