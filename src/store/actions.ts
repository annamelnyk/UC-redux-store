// Action constants

// [Todo] here is kind of namespace for our actions
export const ADD_TODO = '[Todo] Add Todo';
export const REMOVE_TODO = '[Todo] Remove Todo';

// Action creators
export class AddTodo {
  // readonly === this property can not be added or modified after this class initiated 
  readonly type = ADD_TODO;

  constructor(private payload: any) { }
}

console.log(new AddTodo({}));

export class RemoveTodo {
  readonly type = REMOVE_TODO;

  constructor(private payload: any) { }
}