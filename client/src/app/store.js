import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import chatSlice from "../features/chatSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer,persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import createFilter from "redux-persist-transform-filter";


//persist config

const saveUserOnlyFilter = createFilter('user',["user"])

const persistConfig = {
    key:"user",
    storage,
    whitelist:['user'],
    transforms:[saveUserOnlyFilter]
    
}

const rootReducer = combineReducers({
    user:userSlice,
    chat:chatSlice,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools:true
})

export const persistor = persistStore(store)