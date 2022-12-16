import axios from "axios";

const BASE_URL = "https://adaptable-hilarious-ash.glitch.me/";

class TodoAPI {
  #instance;
  constructor() {
    this.instance = { baseURL: BASE_URL, withCredentials: true };
  }
  set instance(serverSettings) {
    this.#instance = axios.create(serverSettings);
  }
  get instance() {
    return this.#instance;
  }
  getListsWithTasks() {
    return this.instance.get("lists?_expand=iconFileName&_embed=tasks");
  }
  getIcons() {
    return this.instance.get("iconFileNames");
  }
  deleteList(id) {
    return this.instance.delete("lists/" + id);
  }
  postList(newList) {
    return this.instance.post("lists", { ...newList });
  }
  patchTitle(id, newTitle) {
    return this.instance.patch("lists/" + id, { name: newTitle });
  }
  postTask(newTask) {
    return this.instance.post("tasks", newTask);
  }
  deleteTask(id) {
    return this.instance.delete("tasks/" + id);
  }
  patchTask(id, field) {
    return this.instance.patch("tasks/" + id, { ...field });
  }
}

export default new TodoAPI();
