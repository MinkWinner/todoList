export default class TaskService {
  getListTask() {
    return axios({
      url: "https://6183cae691d76c00172d1b57.mockapi.io/api/taskList",
      method: "GET",
    });
  }

  addTask(task) {
    return axios({
      url: "https://6183cae691d76c00172d1b57.mockapi.io/api/taskList",
      method: "POST",
      data: task,
    });
  }

  deleteTask(id) {
    return axios({
      url: `https://6183cae691d76c00172d1b57.mockapi.io/api/taskList/${id}`,
      method: "DELETE",
    });
  }

  getTaskById(id) {
    return axios({
      url: `https://6183cae691d76c00172d1b57.mockapi.io/api/taskList/${id}`,
      method: "GET",
    });
  }

  updateTask(task) {
    return axios({
      url: `https://6183cae691d76c00172d1b57.mockapi.io/api/taskList/${task.id}`,
      method: "PUT",
      data: task,
    });
  }
}
