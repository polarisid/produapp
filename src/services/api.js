import axios from 'axios';

// const BASE_URL = 'https://hidden-mesa-58705.herokuapp.com/http://produapp.herokuapp.com';
const BASE_URL = 'https://produapp.herokuapp.com';
// const BASE_URL = 'http://localhost:5000';

function createConfig(token) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }
}
async function adminLogin(data) {
  const token = await axios.post(`${BASE_URL}/admin/login`, data);
  return token;
}

async function getUserAdmin(token) {
  const config = createConfig(token);

  const user = await axios.get(`${BASE_URL}/admin`, config);
  return user;
}
async function getAdminResume(token){
  const config = createConfig(token);
  const resume = await axios.get(`${BASE_URL}/admin/resume`, config);
  return resume.data;
}

async function getAdminResumeByDate(token, dateStart,dateEnd){
  const config = createConfig(token);
  const resume = await axios.get(`http://produapp.herokuapp.com/admin/bydate?startDate=${dateStart}&endDate=${dateEnd}`, config);
  console.log(resume.data)
  return resume.data;
}

async function createUser(user) {
  await axios.post(`${BASE_URL}/users`, user);
  
}

async function login(data) {
  const token = await axios.post(`${BASE_URL}/login`, data);
  return token;
}

async function getUser(token) {
  const config = createConfig(token);

  const user = await axios.get(`${BASE_URL}/users`, config);
  return user;
}

async function sendForm(token, form) {
  const config = createConfig(token);

  await axios.post(`${BASE_URL}/forms`, form, config);
}

async function getItems(token, form) {
  const config = createConfig(token);

  const items = await axios.get(`${BASE_URL}/forms`, config);
  return items.data;
}
async function getItemsFiltered(token, form) {
  const config = createConfig(token);
console.log(form)
  const items = await axios.get(`${BASE_URL}/forms?datestart=${form.datestart}&dateend=${form.dateend}&type=${form.type}`, config);
  return items.data;
}

async function deleteItem(token, id) {
  const config = createConfig(token);

  await axios.delete(`${BASE_URL}/forms/${id}`, config);
}

async function getUsers(token){
  const config = createConfig(token);
  const users = await axios.get(`${BASE_URL}/admin/users`);
  return users.data;
}

async function getRank(){

  const rank = await axios.get(`https://produapp.herokuapp.com/rank`);


  return rank.data;
}
async function getResume(token){
  const config = createConfig(token);
  const resume = await axios.get(`${BASE_URL}/resume`, config);
  return resume.data;
}
const api = {
  getAdminResumeByDate,
  getAdminResume,
  getUsers,
  adminLogin,
  getUserAdmin,
  getItemsFiltered,
  getResume,
  createUser,
  login,
  getUser,
  sendForm,
  deleteItem,
  getItems,
  getRank
}

export default api;
