import {call, put, select, take, takeEvery} from "redux-saga/effects";
import {logOut, requestRefresh} from "../actions";
import {fetchDelete} from "../common";

function* fetchDeleteSaga(action) {
    try {
        let state = yield select();
        if (state.refreshBlock) yield take('REFRESH_UNBLOCK');
        state = yield select();
        let response = yield call(fetchDelete, action.payload.endpoint, state.token);
        if (response.status === 401) {
            yield put(requestRefresh());
            yield take('REFRESH_UNBLOCK');
            state = yield select();
            response = yield call(fetchDelete, action.payload.endpoint, state.token);
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
        console.error("FetchDeleteSaga error: " + error);
        //yield put(logOut());
    }
}

export default function* watchFetchDeleteSaga() {
    yield takeEvery("FETCH_DELETE_REQUESTED", fetchDeleteSaga);
}