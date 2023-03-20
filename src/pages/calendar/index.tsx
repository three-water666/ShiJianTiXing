import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import CalendarHeader from '../../components/calendarHeader';
import CalendarBody from '../../components/calendarBody';
import { initObserver } from '../../utils/Utils';
import { Subject } from '../../utils/Subject';

export default class Index extends Component<PropsWithChildren> {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  calendarObserver: Subject = initObserver();

  render() {
    return (
      <View className='index'>
        <CalendarHeader observer={this.calendarObserver} />
        <CalendarBody
          observer={this.calendarObserver}
          weekLabelIndex={1}
        />
      </View>
    )
  }
}
