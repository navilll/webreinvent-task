import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props) {
    const [taskName, setTaskName] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await Inertia.post("/tasks", { name: taskName });
        setTaskName("");
    };

    const handleDelete = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            Inertia.delete(`/tasks/${taskId}`);
        }
    };
    const completed = async (taskId) => {
        Inertia.post(`/tasks/completed/${taskId}`);
    };
    const show = async () => {
        Inertia.get(`/tasks/show/`);
    };

    return (
        <div className="form-container">
            <h1 className="task-heading">Tasks</h1>{" "}
            <form onSubmit={handleSubmit} className="task-form-container">
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Add a task"
                    className="task-input"
                />
                <button type="submit" className="task-submit-btn">
                    + Add
                </button>
            </form>
            <button type="submit" className="task-submit-btn" onClick={() => show()}>
                Show
            </button>
            <ul className="task-wrapper">
                {props.tasks ? (
                    props.tasks.map((task) => (
                        <li key={task.id} className="task-items">
                            <span className="task-item-name">
                                {task.completed ? (
                                    <del>{task.name}</del>
                                ) : (
                                    task.name
                                )}
                            </span>
                            <button
                                onClick={() => completed(task.id)}
                                className=""
                            >
                                Completed
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="task-delete-btn"
                            >
                                X
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No tasks available.</li>
                )}
            </ul>
        </div>
    );
}
