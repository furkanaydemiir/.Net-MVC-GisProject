import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5150/api"
});

export const userRequests = {
  getUsers: () => api.get("/users"),
  getUserById: (id) => api.get(`/users/${id}`),
  addUser: (dto) => api.post("/users", dto),
  updateUser: (id, dto) => api.put(`/users/${id}`, dto),
  deleteUser: (id) => api.delete(`/users/${id}`),
  login:(dto) => api.post('/auth/login', dto)
};

export const polygonRequests = {
  getPolygons: () => api.get("/polygons"),
  getPolygonById: (id) => api.get(`/polygons/${id}`),
  addPolygon: (dto) => api.post("/polygons", dto),
  updatePolygon: (id, dto) => api.put(`/polygons/${id}`, dto),
  deletePolygon: (id) => api.delete(`/polygons/${id}`)
};

export const periodRequests = {
  getPeriods: () => api.get("/periods"),
  getPeriodById: (id) => api.get(`/periods/${id}`),
  addPeriod: (dto) => api.post("/periods", dto),
  updatePeriod: (id, dto) => api.put(`/periods/${id}`, dto),
  deletePeriod: (id) => api.delete(`/periods/${id}`)
};