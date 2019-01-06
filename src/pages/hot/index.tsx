import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtToast } from "taro-ui";
import MovieItem from '../../components/movie';
import './index.scss';

/**
 * index.state 参数类型
 */
type IndexState = {
}

/**
 * index.props 参数类型
 */
type IndexProps = {
  dispatch?: any,
  loading?: any,
  list?: Array<ListInterface>
}

interface ListInterface {
  id: string
  genres: string,
  rating: {
      average: string
  },
  title: string,
  images: {
      small: string
  },
}
type IProps = IndexProps & IndexState

interface HotMovie {
  props: IProps;
}

@connect(({hot, loading}) => ({
  ...hot,
  loading: loading.models.hot
}))
class HotMovie extends Component {
  config: Config  = {
    navigationBarTitleText: '热映中',
  };
  state = {
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hot/getHot',
      payload: {},
    })
  };

  render() {
    const { list, loading } = this.props;
    console.log(list);
    return (
      <View className='about-page'>
        {
          list && list.length > 0 ? (
            list.map((item) => (
              <MovieItem item={item} key={item.id} />
            ))
          ) : null
        }
        <AtToast
          isOpened={!!loading}
          status='loading'
          text='正在加载'
          hasMask
        >
        </AtToast>
      </View>
    )
  }
}

export default HotMovie as ComponentClass<IndexProps, IndexState>