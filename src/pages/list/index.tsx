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
  dispatch: any,
  loading: any,
  list: Array<ListInterface>
  start: number,
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

interface List {
  props: IProps;
}
@connect(({list, loading}) => ({
  ...list,
  loading: loading.models.list
}))
class List extends Component {
  config: Config = {
    navigationBarTitleText: '榜单',
  };


  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/getList',
      payload: {},
    })
  };
  onReachBottom = () => {
    const { dispatch, start } = this.props;
    dispatch({
      type: 'list/getList',
      payload: {
        start,
      },
    })
  }

  render() {
    const { list, loading } = this.props;
    return (
      <View className='about-page'>
        {
          list.length > 0 ? (
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

export default List as ComponentClass<IndexProps, IndexState>;
