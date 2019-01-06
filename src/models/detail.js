import { getDetail } from '../service/detail';

export default {
  namespace: 'detail',
  state: {
    detail: {
        images: {}
    },
  },

  effects: {
    * getDetail( { hideLoading, payload }, { call, put }) {
        const res = yield call(getDetail, { ...payload });
        yield put({
            type: 'save',
            payload: res,
        });
        hideLoading();
    },
  },

  reducers: {
    save(state, { payload }) {
        return {
            ...state,
            detail: payload,
        };
    },
    clear(state) {
        return {
            ...state,
            detail: {
                images: {}
            },
        };
    }
  },

};
