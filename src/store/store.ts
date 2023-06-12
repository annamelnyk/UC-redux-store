export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialsState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialsState, {});
  }

  get value() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();

    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    }

  }

  public dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify();
    console.log(this.state);
  }

  private notify() {
    // notify all subscribers with updated state value
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce(state, action): {} {
    const newState = {};

    for (const prop in this.reducers) {
      //the line below is equal to ---> newState.todos = this.reducers.todos(state.todos, action)
      newState[prop] = this.reducers[prop](state[prop], action);
    }

    return newState;
  }
}