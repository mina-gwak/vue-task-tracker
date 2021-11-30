const BASE_URL = 'api/tasks';

const HTTP_METHOD = {
  POST(task) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  },
  PUT(task) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }
  }
}

const request = async (url, option) => {
  const res = await fetch(url, option);
  return res.json();
}

const requestWithoutJson = async (url, option) => {
  return await fetch(url, option);
}

const TaskApi = {
  async getAllTask() {
    return request(BASE_URL);
  },
  async getSelectedTask(id) {
    return request(`${BASE_URL}/${id}`);
  },
  async addTask(task) {
    return request(BASE_URL, HTTP_METHOD.POST(task));
  },
  async deleteTask(id) {
    return requestWithoutJson(`${BASE_URL}/${id}`, HTTP_METHOD.DELETE());
  },
  async updateTask(task) {
    return request(`${BASE_URL}/${task.id}`, HTTP_METHOD.PUT(task));
  }
}

export default TaskApi;