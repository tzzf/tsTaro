import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtToast } from "taro-ui";
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({detail, loading}) => ({
  detail,
  loading: loading.models.detail
}))
class Detail extends Component {
  config = {
    navigationBarTitleText: '详情',
  };

  componentDidMount = () => {
    const { id } = this.$router.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'detail/getDetail',
      payload: {
        id,
      },
      hideLoading: () => {
        const { detail: { detail } } = this.props;
        wx.setNavigationBarTitle({
          title: detail.title
        });
      }
    })
  };
  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'detail/clear',
    })
  }

  render() {
    const { detail: { detail }, loading } = this.props;
    return (
      <View className='about-page'>
        {
          !loading ? (
            <View>
              <Image src={detail.images.medium} className='movie-pic' />
              <View>
                {detail.summary}
              </View>
            </View>
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
export default Detail