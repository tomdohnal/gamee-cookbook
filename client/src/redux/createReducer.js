// @flow
type Action = {
  type: string,
  payload?: any,
};

export type Reducer<S, A: Action> = (S, A) => S;

export type ReduxHandlers<S, A: Action> = {
  [key: string]: Reducer<S, A>,
};

// because you need different action payloads with different types in one reducer function
// we have to create reducers using a createReducer helper function and pass a handler function
// to it for each action used
export default <S, A: Action>(
  initialState: S,
  handlers: ReduxHandlers<S, A>,
) => (state: S = initialState, action: A) =>
  Object.prototype.hasOwnProperty.call(handlers, action.type)
    ? handlers[action.type](state, action)
    : state;
