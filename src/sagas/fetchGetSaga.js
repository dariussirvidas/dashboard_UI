import {call, put, select, take, takeEvery} from "redux-saga/effects";
import {logOut, requestRefresh} from "../actions";
import {fetchGet} from "../common";

function* fetchGetSaga(action) {
    try {
        let state = yield select();
        if (state.refreshBlock) yield take('REFRESH_UNBLOCK');
        state = yield select();
        let response = yield call(fetchGet, action.payload.endpoint, state.token);
        if (response.status === 401 && state.isLogged) {
            yield put(requestRefresh());
            yield take('REFRESH_UNBLOCK');
            state = yield select();
            response = yield call(fetchGet, action.payload.endpoint, state.token);
            if (response.status === 401) {
                yield put(logOut());   // logs out if repeated request also 401
            } else {
                action.payload.res(response); // resolves promise by returning fetch response
            }
        }
        else {
            action.payload.res(response); // resolves promise by returning fetch response
        }
    } catch (error) {
        console.error("FetchGetSaga error: " + error);
        //yield put(logOut());
    }
}

export default function* watchFetchGetSaga() {
    yield takeEvery("FETCH_GET_REQUESTED", fetchGetSaga);
}