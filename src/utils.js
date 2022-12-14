export function calcPercent(total, current) {
  return total ? ((current * 100) / total).toFixed(1) : 0.0;
}
export function getCountCompleted(tasks) {
  return tasks.reduce((acc, task) => {
    acc += task.completed ? 1 : 0;
    return acc;
  }, 0);
}
export function addClassName(total, tasks, cbCurrent, cbResult) {
  let current = cbCurrent(tasks);
  let result = cbResult(total, current);
  if (result <= 55) {
    return "red";
  } else if (result > 55 && result <= 95) {
    return "orange";
  } else {
    return "green";
  }
}
