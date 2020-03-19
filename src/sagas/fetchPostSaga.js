import {call, put, select, take, takeEvery} from "redux-saga/effects";
import {logOut, requestRefresh} from "../actions";
import {fetchPost} from "../common";

function* fetchPostSaga(action) {
    try {
        let state = yield select();
        if (state.refreshBlock) yield take('REFRESH_UNBLOCK');
        state = yield select();
        let response = yield call(fetchPost, action.payload.endpoint, action.payload.body, state.token);
        if (response.status === 401) {
            yield put(requestRefresh());
            yield take('REFRESH_UNBLOCK');
            state = yield select();
            response = yield call(fetchPost, action.payload.endpoint, action.payload.body, state.token);
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
        console.error("FetchPostSaga error: " + error);
        yield put(logOut());
    }
}

export default function* watchFetchPostSaga() {
    yield takeEvery("FETCH_POST_REQUESTED", fetchPostSaga);
}