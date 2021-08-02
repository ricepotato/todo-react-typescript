import React from "react";
import TodoList from "../components/TodoList";
import { connect } from "react-redux";
import { StoreState } from "../store/modules";
import {
  TodoItemDataParams,
  actionCreators as todosActions,
} from "../store/modules/todos";
import { bindActionCreators } from "redux";

interface Props {
  todoItems: TodoItemDataParams[];
  input: string;
  todosActions: typeof todosActions;
}

class TodoListContainer extends React.Component<Props> {
  onCreate = (): void => {
    const { todosActions, input } = this.props;
    todosActions.create(input);
  };
  onRemove = (id: number): void => {
    const { todosActions } = this.props;
    todosActions.remove(id);
  };
  onToggle = (id: number): void => {
    const { todosActions } = this.props;
    todosActions.toggle(id);
  };
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    const { todosActions } = this.props;
    todosActions.changeInput(value);
  };

  render() {
    const { input, todoItems } = this.props;
    const { onCreate, onChange, onRemove, onToggle } = this;
    return (
      <TodoList
        input={input}
        todoItems={todoItems}
        onCreate={onCreate}
        onChange={onChange}
        onToggle={onToggle}
        onRemove={onRemove}
      ></TodoList>
    );
  }
}

export default connect(
  ({ todos }: StoreState) => ({
    input: todos.input,
    todoItems: todos.todoItems,
  }),
  (dispatch) => ({ todosActions: bindActionCreators(todosActions, dispatch) })
)(TodoListContainer);
