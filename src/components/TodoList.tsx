import React from "react";
import { TodoItemDataParams } from "../store/modules/todos";
import TodoItem from "./TodoItem";

interface Props {
  input: string;
  todoItems: TodoItemDataParams[];
  onCreate(): void;
  onRemove(id: number): void;
  onToggle(id: number): void;
  onChange(e: any): void;
}

const TodoList: React.FunctionComponent<Props> = ({
  input,
  todoItems,
  onCreate,
  onRemove,
  onToggle,
  onChange,
}) => {
  const todoItemList = todoItems.map((todo) =>
    todo ? (
      <TodoItem
        key={todo.id}
        done={todo.done}
        onToggle={() => onToggle(todo.id)}
        onRemove={() => onRemove(todo.id)}
        text={todo.text}
      ></TodoItem>
    ) : null
  );
  return (
    <div>
      <h1>오늘 뭐하지?</h1>
      <form
        onSubmit={(e: React.FormEvent<HTMLElement>) => {
          e.preventDefault();
          onCreate();
        }}
      >
        <input onChange={onChange} value={input} />
        <button type="submit">추가하기</button>
      </form>
      <ul>{todoItemList}</ul>
    </div>
  );
};

export default TodoList;
