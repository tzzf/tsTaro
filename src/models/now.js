import { getNow } from '../service/now';

export default {
  namespace: 'now',
  state: {
    list: [],
  },

  effects: {
    * getNow( { payload }, { call, put }) {
        const res = yield call(getNow, { ...payload });
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
