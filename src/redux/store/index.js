import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/index.js'
import { todoApi } from '@src/containers/app/feature/Customer/pages/Todo/todo.services.js'
import { authApi } from '@src/containers/authentication/feature/Auth/authService.js'
import { rtkQueryToastify } from '@src/middlewares/toastify.js'
import { createLogger } from 'redux-logger'
import { rootReducer } from '../reducer/index.js'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { adminApi } from '@src/containers/app/feature/Admin/adminService.js'
import customerApi from '@src/containers/app/feature/Customer/customer.service.js'
import appApi from '../service/index.js'
import chatApi from '@src/containers/app/feature/Chat/chat.service.js'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [`customer`, 'authApi', 'adminApi', 'customerApi', 'chatApi', 'chat', 'customer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const blacklist = [
  '__rtkq/focused',
  '__rtkq/unfocused'
  // If you wish to remove actions from the
  // logger, they should be added here
]

const initialState = {}

const loggerMiddleware = createLogger({
  predicate: (getState, action) => !blacklist.includes(action.type)
})
export function configureAppStore(preloadedState) {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
        immutableCheck: { warnAfter: 128 }
      }).concat(
        loggerMiddleware,
        todoApi.middleware,
        authApi.middleware,
        adminApi.middleware,
        customerApi.middleware,
        appApi.middleware,
        chatApi.middleware,
        rtkQueryToastify
      ),
    preloadedState,
    enhancers: []
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducer', () => store.replaceReducer(rootReducer))
  }

  return store
}

const store = configureAppStore(initialState)
setupListeners(store.dispatch)

export const persistor = persistStore(store)
export default store
