import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import HotMovie from './pages/hot'

import dva from './utils/dva'
import models from './models'
// import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// const store = configStore()
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/hot/index',
      'pages/list/index',
      'pages/now/index'
    ],
    subPackages: [
      {
        root: 'moduleMovie',
        pages: [
          'detail/index',
        ]
      }
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/hot/index',
        text: '热映中',
        iconPath: './images/tab/movie.png',
        selectedIconPath: './images/tab/movie-active.png'
      },{
        pagePath: 'pages/list/index',
        text: '榜单',
        iconPath: './images/tab/list.png',
        selectedIconPath: './images/tab/list-active.png'
      }, {
        pagePath: 'pages/now/index',
        text: '最新',
        iconPath: './images/tab/weather.png',
        selectedIconPath: './images/tab/weather-active.png'
      }],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <HotMovie />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
