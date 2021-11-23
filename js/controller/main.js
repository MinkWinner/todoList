import TaskService from "../services/taskServices.js";
import Task from "../Models/task.js";
import Validation from "../services/validation.js";

const taskApi = new TaskService();
const checkVal = new Validation();

const getEle = (id) => document.getElementById(id);

let isLoading = false;

const checkLoading = () => {
  if (isLoading) {
    getEle("loader").innerHTML = `<div class="loader"></div>
    <div class="loaderbg"></div>
    `;
  } else getEle("loader").innerHTML = "";
};

const fetchTask = () => {
  isLoading = true;
  checkLoading();
  taskApi
    .getListTask()
    .then((result) => {
      isLoading = false;
      checkLoading();
      renderTask(result.data);
    })
    .catch(() => {
      alert("Không tìm thấy dữ liệu");
    });
};

fetchTask();

const renderTask = (list) => {
  let contentTodo = "";
  list?.forEach((task) => {
    if (task.status == "todo") {
      contentTodo += `
                      <li>
                          <span>${task.textTask}</span>
                          <div class="buttons">
                              <button class="remove">
                              <i onclick="delTask('${task.id}')" class="fa fa-trash-alt"></i>
                              </button>
                              <button class="complete">
                              <i onclick="toComplete('${task.id}')"  class="far fa-check-circle"></i>
                              <i class="fas fa-check-circle"></i>
                              </button>
                          </div>
                      </li>
                  `;
    }
  });

  getEle("todo").innerHTML = contentTodo;

  let contentCompleted = "";
  list?.forEach((task) => {
    if (task.status === "completed") {
      contentCompleted += `
                  <li>
                      <span>${task.textTask}</span>
                      <div class="buttons">
                    <button class="remove">
                        <i onclick="delTask('${task.id}')" class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete">
                        <i class="far fa-check-circle"></i>
                        <i onclick="toUncomplete('${task.id}')" class="fas fa-check-circle"></i>
                    </button>
                    </div>
                  </li>
              `;
    }
  });

  getEle("completed").innerHTML = contentCompleted;
};

const addItem = () => {
  let text = getEle("newTask").value;

  let isVal = true;

  isVal &= checkVal.isEmpty(text);

  if (isVal) {
    let taskObj = new Task("", text, "todo");

    isLoading = true;
    checkLoading();
    taskApi
      .addTask(taskObj)
      .then(() => {
        isLoading = false;
        checkLoading();
        fetchTask();
      })
      .catch(() => {
        alert("Lỗi thêm Task");
      });
  }
};

getEle("addItem").addEventListener("click", addItem);

const delTask = (id) => {
  isLoading = true;
  checkLoading();
  taskApi
    .deleteTask(id)
    .then(() => {
      isLoading = false;
      checkLoading();
      fetchTask();
    })
    .catch(() => {
      alert("Lỗi delete");
    });
};

window.delTask = delTask;

const toComplete = (id) => {
  isLoading = true;
  checkLoading();
  taskApi
    .getTaskById(id)
    .then((result) => {
      let taskObj = new Task(id, result.data.textTask, "completed");
      taskApi
        .updateTask(taskObj)
        .then(() => {
          isLoading = false;
          checkLoading();
          fetchTask();
        })
        .catch(() => {
          alert("Lỗi cập nhật");
        });
    })
    .catch(() => {
      alert("Lỗi toComplete");
    });
};
const toUncomplete = (id) => {
  isLoading = true;
  checkLoading();
  taskApi
    .getTaskById(id)
    .then((result) => {
      let taskObj = new Task(id, result.data.textTask, "todo");
      taskApi
        .updateTask(taskObj)
        .then(() => {
          isLoading = false;
          checkLoading();
          fetchTask();
        })
        .catch(() => {
          alert("Lỗi cập nhật");
        });
    })
    .catch(() => {
      alert("Lỗi toComplete");
    });
};

window.toComplete = toComplete;
window.toUncomplete = toUncomplete;
