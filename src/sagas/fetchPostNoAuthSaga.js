import {call, takeEvery} from "redux-saga/effects";
import {fetchPost} from "../common";

function* fetchPostNoAuthSaga(action) {
    try {
        let response = yield call(fetchPost, action.payload.endpoint, action.payload.body, null);
        action.payload.res(response); // resolves promise by returning fetch response
    } catch (error) {
        console.error("FetchPostNoAuthSaga error: " + error);
    }
}

export default function* watchFetchPostNoAuthSaga() {
    yield takeEvery("FETCH_POST_NO_AUTH_REQUESTED", fetchPostNoAuthSaga);
}