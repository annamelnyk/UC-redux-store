import * as fromStore from './store';

import { renderTodos } from './utils';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer
};
const state = {
  todos: {
    loaded: false,
    loading: false,
    data: []
  }
}
const store = new fromStore.Store(reducers);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    // before
    // store.dispatch({
    //   type: fromStore.ADD_TODO, // type: 'ADD_TODO'
    //   payload
    // })

    // after
    store.dispatch(new fromStore.AddTodo(payload));

    console.log(store.value);

    input.value = '';
  },
  false
);

const unsubscribe = store.subscribe(state => {
  renderTodos(state.todos.data)
});

destroy.addEventListener('click', unsubscribe, false);

todoList.addEventListener('click', function (event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    console.log(target);

    const payload = JSON.parse(target.getAttribute('data-todo') as string);

    store.dispatch(new fromStore.RemoveTodo(payload));
  }
});

store.subscribe(state => console.log('STATE::: ', state));
