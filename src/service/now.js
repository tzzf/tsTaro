import Request from '../utils/request';

const getNow = (data) => Request({
    url: 'v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a',
    method: 'GET',
    data,
});

export {
    // eslint-disable-next-line import/prefer-default-export
    getNow
}
