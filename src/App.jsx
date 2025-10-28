import { useReducer, useState } from "react";
import "./App.css";

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: inputValue });
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="w-full max-w-[700px] bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        <h1 className="text-center font-extrabold text-2xl sm:text-3xl text-gray-700">
          📝 Todo List
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <input
            className="flex-1 h-[50px] border p-3 rounded-xl outline-none text-base sm:text-lg focus:ring-2 focus:ring-red-400"
            type="text"
            placeholder="Add Item..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleAddTodo}
            className="h-[50px] sm:w-[180px] bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-base sm:text-lg font-semibold"
          >
            Add
          </button>
        </div>

        <ul className="mt-8 space-y-3 max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2">
          {state.todos.length === 0 ? (
            <p className="text-gray-500 text-center mt-10 text-lg">
              No todos yet...
            </p>
          ) : (
            state.todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow hover:shadow-md transition"
              >
                <span
                  onClick={() => handleToggleTodo(todo.id)}
                  className={`cursor-pointer text-base sm:text-lg font-medium ${todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                    }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-600 font-semibold hover:text-red-800 text-lg"
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
