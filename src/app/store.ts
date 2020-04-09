
import * as App from './app.state'
import { appReducer } from './on.reducer';

export interface State {
  app: App.State
}

export const reducers = { app: appReducer }
