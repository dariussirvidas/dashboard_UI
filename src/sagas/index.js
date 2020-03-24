import {all} from "redux-saga/effects";
import watchRefreshTokenSaga from "./refreshTokenSaga";
import watchFetchGetSaga from "./fetchGetSaga";
import watchFetchDeleteSaga from "./fetchDeleteSaga";
import watchFetchPostSaga from "./fetchPostSaga";
import watchFetchPutSaga from "./fetchPutSaga";
import watchFetchPostNoAuthSaga from "./fetchPostNoAuthSaga";

export default function* rootSaga() {
    yield all([
        watchRefreshTokenSaga(), watchFetchGetSaga(), watchFetchDeleteSaga(),
        watchFetchPostSaga(), watchFetchPutSaga(), watchFetchPostNoAuthSaga()
    ])
}
