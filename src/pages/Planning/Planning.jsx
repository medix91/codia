import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../firebase/useAuth";
import "./Planning.css";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function Planning() {
  const { user } = useAuth();
  const [plannings, setPlannings] = useState([]);
  const [title, setTitle] = useState("");
  const [authorizedUsers, setAuthorizedUsers] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [selectedPlanningId, setSelectedPlanningId] = useState("");
  const [confirmDeletePlanning, setConfirmDeletePlanning] = useState(null);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);

  const fetchPlannings = async () => {
    if (!user) return;
    const planningsRef = collection(db, "plannings");
    const q = query(planningsRef, where("owner", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const userPlannings = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPlannings(userPlannings);
  };

  useEffect(() => {
    fetchPlannings();
  }, [user]);

  const handleAddPlanning = async () => {
    if (!title.trim()) return;

    const planning = {
      title,
      owner: user.uid,
      authorized: [user.email],
      tasks: [],
      createdAt: new Date(),
    };

    await addDoc(collection(db, "plannings"), planning);
    setTitle("");
    setAuthorizedUsers("");
    setShowPopup(false);
    fetchPlannings();
  };

  const handleDeletePlanning = async (id) => {
    await deleteDoc(doc(db, "plannings", id));
    setConfirmDeletePlanning(null);
    fetchPlannings();
  };

  const handleAddTask = async () => {
    if (!taskTitle.trim() || !selectedPlanningId) return;

    const task = {
      title: taskTitle,
      description: taskDesc,
      deadline: taskDeadline || null,
      done: false,
      createdAt: new Date(),
    };

    const planningRef = doc(db, "plannings", selectedPlanningId);
    await updateDoc(planningRef, {
      tasks: arrayUnion(task),
    });

    setTaskTitle("");
    setTaskDesc("");
    setTaskDeadline("");
    setSelectedPlanningId("");
    setShowTaskPopup(false);
    fetchPlannings();
  };

  const toggleTaskDone = async (planningId, taskIndex) => {
    const planning = plannings.find((p) => p.id === planningId);
    if (!planning) return;

    const updatedTasks = [...planning.tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      done: !updatedTasks[taskIndex].done,
    };

    const planningRef = doc(db, "plannings", planningId);
    await updateDoc(planningRef, {
      tasks: updatedTasks,
    });

    fetchPlannings();
  };

  const handleDeleteTask = async (planningId, taskIndex) => {
    const planning = plannings.find((p) => p.id === planningId);
    if (!planning) return;

    const updatedTasks = [...planning.tasks];
    updatedTasks.splice(taskIndex, 1);

    const planningRef = doc(db, "plannings", planningId);
    await updateDoc(planningRef, {
      tasks: updatedTasks,
    });

    setConfirmDeleteTask(null);
    fetchPlannings();
  };

  const openEditTask = (planningId, taskIndex) => {
    // À implémenter si tu veux gérer l'édition des tâches
  };

  return (
    <div className="planning-container">
      <h1>Mes Plannings</h1>
      <div className="planning-actions">
        <button className="pill-button" onClick={() => setShowPopup(true)}>
          + Planning
        </button>
        <button className="pill-button" onClick={() => setShowTaskPopup(true)}>
          + Tâche
        </button>
      </div>

      <div className="planning-grid">
        {plannings.map((planning) => (
          <div className="planning-card" key={planning.id}>
            <div className="card-header">
              <h3>{planning.title}</h3>
              <div className="card-actions">
                <FaEdit />
                <FaTrash
                  onClick={() => setConfirmDeletePlanning(planning.id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="task-list">
              {planning.tasks && planning.tasks.length > 0 ? (
                planning.tasks.map((task, index) => (
                  <div
                    key={index}
                    className={`task-item ${task.done ? "done" : ""}`}
                  >
                    <div
                      className="task-done-toggle"
                      onClick={() => toggleTaskDone(planning.id, index)}
                      title={
                        task.done ? "Tâche terminée" : "Marquer comme terminée"
                      }
                      role="checkbox"
                      aria-checked={task.done}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          toggleTaskDone(planning.id, index);
                        }
                      }}
                    >
                      {task.done ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="#00BF63"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" fill="#00BF63" />
                          <path
                            d="M9 12.5L11 14.5L15 10.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#888"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                    </div>
                    <div className="task-info">
                      <strong>{task.title}</strong>
                      {task.description && <p>{task.description}</p>}
                      {task.deadline && (
                        <span className="deadline">
                          à rendre pour{" "}
                          {format(new Date(task.deadline), "dd MMMM yyyy", {
                            locale: fr,
                          })}
                        </span>
                      )}
                    </div>
                    <div className="task-actions">
                      <button
                        className="icon-button"
                        onClick={() => openEditTask(planning.id, index)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="icon-button"
                        onClick={() =>
                          setConfirmDeleteTask({
                            planningId: planning.id,
                            taskIndex: index,
                          })
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-tasks">Aucune tâche pour ce projet.</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* POPUP PLANNING */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Créer un planning</h2>
            <input
              type="text"
              placeholder="Nom du projet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="popup-actions">
              <button
                className="pill-button cancel"
                onClick={() => setShowPopup(false)}
              >
                Annuler
              </button>
              <button className="pill-button" onClick={handleAddPlanning}>
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP TASK */}
      {showTaskPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Ajouter une tâche</h2>

            <label htmlFor="planning-select">Projet :</label>
            <select
              id="planning-select"
              value={selectedPlanningId}
              onChange={(e) => setSelectedPlanningId(e.target.value)}
            >
              <option value="">-- Sélectionner un projet --</option>
              {plannings.map((planning) => (
                <option key={planning.id} value={planning.id}>
                  {planning.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Titre de la tâche"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />
            <input
              type="date"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />

            <div className="popup-actions">
              <button
                className="pill-button cancel"
                onClick={() => setShowTaskPopup(false)}
              >
                Annuler
              </button>
              <button className="pill-button" onClick={handleAddTask}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRM DELETE PLANNING */}
      {confirmDeletePlanning && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Confirmer la suppression</h2>
            <p>Voulez-vous vraiment supprimer ce planning ?</p>
            <div className="popup-actions">
              <button
                className="pill-button cancel"
                onClick={() => setConfirmDeletePlanning(null)}
              >
                Annuler
              </button>
              <button
                className="pill-button"
                onClick={() => handleDeletePlanning(confirmDeletePlanning)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRM DELETE TASK */}
      {confirmDeleteTask && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Confirmer la suppression</h2>
            <p>Voulez-vous vraiment supprimer cette tâche ?</p>
            <div className="popup-actions">
              <button
                className="pill-button cancel"
                onClick={() => setConfirmDeleteTask(null)}
              >
                Annuler
              </button>
              <button
                className="pill-button"
                onClick={() =>
                  handleDeleteTask(
                    confirmDeleteTask.planningId,
                    confirmDeleteTask.taskIndex
                  )
                }
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
