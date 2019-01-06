import { getHot } from '../service/hot';

export default {
  namespace: 'hot',
  state: {
    list: [],
  },

  effects: {
    * getHot( { payload }, { call, put }) {
        const res = yield call(getHot, { ...payload });
        let { subjects } = res;
        yield put({
            type: 'save',
            payload: subjects,
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
