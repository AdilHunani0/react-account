// --- auth.js ---
// Simple localStorage-based user auth system

export function getUsers() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ✅ Register new user
export async function registerUser({ name, email, password }) {
  const users = getUsers();
  const exists = users.find((u) => u.email === email);

  if (exists) throw new Error("Email already registered");

  const newUser = { id: crypto.randomUUID(), name, email, password };
  users.push(newUser);
  saveUsers(users);

  await login(email, password); // auto-login after register
  return newUser;
}

// ✅ Login (async-compatible)
export async function login(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) throw new Error("Invalid email or password");
  localStorage.setItem("currentUserId", user.id);

  return Promise.resolve(user);
}

// ✅ Logout
export function logout() {
  localStorage.removeItem("currentUserId");
}

// ✅ Get current logged-in user
export function getCurrentUser() {
  const id = localStorage.getItem("currentUserId");
  if (!id) return null;
  return getUsers().find((u) => u.id === id) || null;
}

// ✅ Update user info
export function updateCurrentUser(data) {
  const id = localStorage.getItem("currentUserId");
  if (!id) throw new Error("Not authenticated");

  const users = getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");

  users[idx] = { ...users[idx], ...data };
  saveUsers(users);
  return users[idx];
}
