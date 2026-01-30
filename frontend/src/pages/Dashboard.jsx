import { useEffect, useState } from "react";
import api from "../api/axios";
import bg from "../assets/bg.jpg"; // imported background

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await api.post(
        "/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }} // use imported bg here
    >

      {/* Main content */}
      <div className="relative z-10">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-black to-transparent text-white shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
              Task Manager
            </h1>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-semibold hover:text-gray-200 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Add Task */}
          <div className="bg-transparent p-6 rounded-xl shadow-lg mb-8 flex gap-4 backdrop-blur-sm bg-opacity-90">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 text-white px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <button
              onClick={addTask}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-semibold"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          {tasks.length === 0 ? (
            <p className="text-center text-white text-2xl mt-16">
              You don’t have any tasks yet. Add one above!
            </p>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-transparent bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md flex justify-between items-center hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-4 h-4 rounded-full ${
                        task.completed ? "bg-green-500" : "bg-yellow-400"
                      }`}
                    ></span>
                    <p
                      className={`text-white font-medium text-lg ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleComplete(task)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                        task.completed
                          ? "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
                          : "bg-gray-500 text-white hover:bg-gray-600 border-gray-500"
                      }`}
                    >
                      {task.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-400 text-white hover:bg-red-50 hover:text-black transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
