import { delay, select, call, put, putResolve, /*takeEvery, */takeLatest } from 'redux-saga/effects'
import {refreshTokensCall} from "../common";
import {logInToken, logInTokenRefresh} from "../actions";


function* refreshToken(action) {
    try {
        console.log("payload: " + action.payload);
        yield delay(50);
        const state = yield select();
        const newTokens = yield call(refreshTokensCall, state.token, state.tokenRefresh);
        if (newTokens != null) {
            yield put(logInToken(newTokens.token));
            yield put(logInTokenRefresh(newTokens.refreshToken));
        }
        else console.log("refresh failed");
        action.payload.resolve(true);
    } catch (e) {
        console.error("refresh error: " + e.message);
    }
}

export function* watchSaga() {
    yield takeLatest("TOKEN_REFRESH_REQUESTED", refreshToken);
}

