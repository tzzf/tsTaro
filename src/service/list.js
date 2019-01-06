import Request from '../utils/request';

const getList = (data) => Request({
    url: 'v2/movie/top250',
    method: 'GET',
    data,
});

export {
    // eslint-disable-next-line import/prefer-default-export
    getList
}
