let chart;

export async function initCharts() {
  const canvas = document.getElementById("statsChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Fetch sample external data
  const [todosRes, usersRes, commentsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/todos"),
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/comments")
  ]);

  const [todos, users, comments] = await Promise.all([
    todosRes.json(), usersRes.json(), commentsRes.json()
  ]);

  const completed = todos.filter(t => t.completed).length;
  const pending = todos.length - completed;

  const data = {
    labels: ["Users", "Comments", "Todos Done", "Todos Pending"],
    datasets: [{
      label: "Sample API metrics",
      data: [users.length, comments.length, completed, pending],
      backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#ef4444"]
    }]
  };

  if (chart) chart.destroy();
  chart = new Chart(ctx, { type: "bar", data, options: { responsive: true } });
}
