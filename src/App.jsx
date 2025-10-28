import { useReducer, useState } from "react";
import "./App.css";

// 1️⃣ Boshlang‘ich state
const initialState = {
  todos: [],
};

// 2️⃣ Reducer funksiyasi (state va action ni boshqaradi)
function reducer(state, action) {
  switch (action.type) {
    // ➕ Yangi todo qo‘shish
    case "ADD_TODO":
      return {
        ...state, // eski state ma'lumotlarini saqlab qoladi
        todos: [
          ...state.todos, // eski todos ro‘yxatini saqlab qoladi
          {
            id: Date.now(), // har bir todo uchun unikal ID
            text: action.payload, // inputdan kelgan matn
            completed: false, // yangi todo hali bajarilmagan
          },
        ],
      };

    // ❌ Todo’ni o‘chirish
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    // ✅ Bajarilgan todo’ni belgilash
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    // Agar hech qanday action mos kelmasa, eski state qaytadi
    default:
      return state;
  }
}

// 3️⃣ Asosiy App komponenti
function App() {
  // useReducer orqali state va dispatch olamiz
  const [state, dispatch] = useReducer(reducer, initialState);

  // input qiymatini saqlaydigan oddiy state
  const [inputValue, setInputValue] = useState("");

  // todo qo‘shish funksiyasi
  const handleAddTodo = () => {
    if (inputValue.trim() === "") return; // agar bo‘sh bo‘lsa hech narsa qilinmaydi
    dispatch({ type: "ADD_TODO", payload: inputValue }); // reducerga signal yuboradi
    setInputValue(""); // inputni tozalaydi
  };

  // todo o‘chirish funksiyasi
  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  // todo bajarilganini belgilash funksiyasi
  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  return (
    <div className="border my-[100px] mx-auto w-[700px] h-[600px] rounded-2xl shadow-lg p-6 bg-white">
      <h1 className="flex justify-center pt-[20px] font-extrabold text-3xl text-gray-700">
        📝 Todo List
      </h1>

      {/* Input va Add button */}
      <div className="ml-[50px] mt-[50px] flex gap-5">
        <input
          className="w-[400px] h-[50px] border p-2 rounded-xl outline-none text-lg"
          type="text"
          placeholder="Add Item..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="border w-[200px] h-[50px] bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
        >
          Add
        </button>
      </div>

      {/* Todo ro‘yxati */}
      <ul className="mt-8 ml-[50px] w-[600px] space-y-3">
        {state.todos.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No todos yet...</p>
        ) : (
          state.todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow"
            >
              <span
                onClick={() => handleToggleTodo(todo.id)}
                className={`cursor-pointer text-lg ${todo.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-600 font-semibold hover:text-red-800"
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
