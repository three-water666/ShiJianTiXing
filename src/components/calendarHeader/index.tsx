import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";
import { Subject } from '../../utils/Subject';
import {
    getHeaderContent,
    getFirstDayOfNextMonth,
    getFirstDayOfPrevMonth,
} from '../../utils/Utils';

export default ({ observer }: { observer: Subject }) => {
    // 页面绑定数据
    const [headerContent, setHeaderContent] = useState<string>('');
    const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(new Date());

    let leftArrow = '<';
    let rightArrow = '>';

    useEffect(() => {
        setHeaderContent(getHeaderContent(new Date()));
        setFirstDayOfMonth(new Date());
    }, []);

    /**
     * 主题发布信息，通知观察者
     */
    const observerNotify = (currentFirstDayOfMonth: Date) => {
        setHeaderContent(getHeaderContent(currentFirstDayOfMonth));
        observer.notify(currentFirstDayOfMonth);
    };

    /**
     * 页面操作
     */
    const goPrev = () => {
        const preFirstDayOfMonth = getFirstDayOfPrevMonth(firstDayOfMonth);
        setFirstDayOfMonth(preFirstDayOfMonth);
        observerNotify(preFirstDayOfMonth);
    };

    const goNext = () => {
        const nextFirstDayOfMonth = getFirstDayOfNextMonth(firstDayOfMonth);

        setFirstDayOfMonth(nextFirstDayOfMonth);
        observerNotify(nextFirstDayOfMonth);
    };

    return (
        <View className="calendar-header">
            <View className="header-center">
                <Text className="prev-month" onClick={goPrev}>
                    {leftArrow}
                </Text>
                <Text className="title">{headerContent}</Text>
                <Text className="next-month" onClick={goNext}>
                    {rightArrow}
                </Text>
            </View>
        </View>
    );
};
