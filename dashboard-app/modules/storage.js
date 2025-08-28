const KEY = "tasks_v2";

/** shape: { id: string, text: string, done: boolean }[] */
export function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
export function saveTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

/** Lightweight snapshot for Home stats */
export function getTasksSnapshot() {
  const tasks = loadTasks();
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  return { total, done };
}
