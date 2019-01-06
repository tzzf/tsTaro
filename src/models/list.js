import { getList } from '../service/list';

export default {
  namespace: 'list',
  state: {
    list: [],
    start: 0,
  },

  effects: {
    * getList( { payload }, { call, put }) {
        const res = yield call(getList, { ...payload });
        let { subjects, start, count } = res;
        start += count;
        yield put({
            type: 'save',
            payload: subjects,
            start,
        });
    },
  },

  reducers: {
    save(state, { payload, start }) {
        let { list } = state;
        if (payload) {
            payload = payload.map(res => {
                res.genres = res.genres.join(',');
                return res;
            })
        }
        list = list.concat(payload);
        return {
            ...state,
            list,
            start,
        };
    },
  },

};
