import Request from '../utils/request';

const getDetail = (data) => Request({
    url: `v2/movie/subject/${data.id}`,
    method: 'GET',
});

export {
    // eslint-disable-next-line import/prefer-default-export
    getDetail
}
