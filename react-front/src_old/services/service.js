import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/aktywnosc");
  }

  get(id) {
    return http.get(`/aktywnosc/${id}`);
  }

  create(data) {
    return http.post("/aktywnosc", data);
  }

  update(id, data) {
    return http.put(`/aktywnosc/${id}`, data);
  }

  delete(id) {
    return http.delete(`/aktywnosc/${id}`);
  }

  deleteAll() {
    return http.delete(`/aktywnosc`);
  }
}

export default new TutorialDataService();