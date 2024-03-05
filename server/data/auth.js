let users = [
  {
    id: '1',
    username: 'jihye',
    password: '$2b$12$D8eY99/dzNTiUuhquGwuT.yIbKhCEvXdvQ.TI/ArxAMCBuX0O/eCO', //abcd1234
    name: '지혜',
    email: 'jihye@email.com',
    url: 'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg'
  }
]

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}