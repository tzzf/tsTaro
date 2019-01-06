import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro';
import { Image } from '@tarojs/components';
import { AtCard } from "taro-ui";
import './index.scss';

type DefaultProps = {
    item: item
}
/**
 * index.state 参数类型
 */
interface MovieProps {
    item: item
}
interface item {
    id: string
    genres: string,
    rating: rating,
    title: string,
    images: images,
}
interface rating {
    average: string
}
interface images {
    small: string
}
interface Movie {
    props: MovieProps & DefaultProps
}
class Movie extends Component {
    // static defaultProps: DefaultProps = defaultProps;
    static defaultProps: DefaultProps = {
        item: {
            id: '',
            genres: '',
            title: '',
            rating: {
                average: '',
            },
            images: {
                small: ''
            }
        },
    };
    goPath = () => {
        const { item } = this.props;
        Taro.navigateTo({
            url: `/moduleMovie/detail/index?id=${item.id}`
        })
    }
    render() {
        const { item } = this.props;
        return (
            <AtCard
              className='AtCard'
              key={item.id}
              note={item.genres}
              extra={`评分：${item.rating.average || '暂无评分'}`}
              title={item.title}
              onClick={this.goPath}
            >
                <Image src={item.images.small} className='movie-pic' />
            </AtCard>
        );
    }
}

export default Movie as ComponentClass<MovieProps>