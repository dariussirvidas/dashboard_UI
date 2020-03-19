import {select, call, put, take, takeEvery} from 'redux-saga/effects'
import {refreshTokensCall} from "../common";
import {logInToken, logInTokenRefresh, blockRefresh, unblockRefresh, logOut} from "../actions";

function* refreshTokenSaga(action) {
    try {
        const state = yield select();
        if (!state.refreshBlock) {
            yield put(blockRefresh());
            const newTokens = yield call(refreshTokensCall, state.token, state.tokenRefresh);
            if (newTokens != null) {
                yield put(logInToken(newTokens.token));
                yield put(logInTokenRefresh(newTokens.refreshToken));
            } else {
                console.error("token refresh failed, logging out!");
                yield put(logOut());   // logs out if tokens were not updated
            }
            yield put(unblockRefresh());
        }
    } catch (e) {
        console.log("refresh error: " + e.message);
        yield put(unblockRefresh());
    } finally {
        const state = yield select();
        if (state.refreshBlock) {
            yield take('REFRESH_UNBLOCK');    // waits for REFRESH_UNBLOCK action to be dispatched
            action.payload.res("refresh finished!");  // resolves promise for blocked sagas
        } else {
            action.payload.res("refresh finished!");  // resolves promise for finished saga
        }
    }
}

export function* watchSaga() {
    yield takeEvery("TOKEN_REFRESH_REQUESTED", refreshTokenSaga);
}

