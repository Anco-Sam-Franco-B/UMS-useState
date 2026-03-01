import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Edit2, Trash2, Moon, Sun, User2, UserRoundX, Users } from "lucide-react";
import "./glass.css"; // add 3D glass styles

const USERS_PER_PAGE = 5;

function PersonAccount() {
  // ===== STATES =====
  const [formData, setFormData] = useState({ fname: "", lname: "", email: "", age: "", isActive: false });
  const [userAccount, setUserAccount] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState("light");

  // ===== LOCAL STORAGE =====
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedTheme = localStorage.getItem("theme");
    if (savedUsers) setUserAccount(JSON.parse(savedUsers));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => localStorage.setItem("users", JSON.stringify(userAccount)), [userAccount]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // ===== DASHBOARD COUNTERS =====
  const totalUsers = userAccount.length;
  const activeUsers = userAccount.filter(u => u.isActive).length;
  const inactiveUsers = totalUsers - activeUsers;

  // ===== CHART DATA =====
  const barData = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
  ];

  const pieData = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
  ];

  // ===== SEARCH & PAGINATION =====
  const filteredUsers = useMemo(() => {
    return userAccount.filter(
      u =>
        u.fname.toLowerCase().includes(search.toLowerCase()) ||
        u.lname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [userAccount, search]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  // ===== CRUD =====
  const handleSubmit = e => {
    e.preventDefault();
    if (isUpdate) {
      setUserAccount(prev => prev.map(u => (u.id === editingId ? { ...u, ...formData } : u)));
      setIsUpdate(false);
    } else {
      setUserAccount(prev => [...prev, { ...formData, id: Date.now(), created_at: new Date().toLocaleTimeString() }]);
    }
    setFormData({ fname: "", lname: "", email: "", age: "", isActive: false });
    setEditingId(null);
  };

  const handleEdit = user => {
    setFormData(user);
    setEditingId(user.id);
    setIsUpdate(true);
  };

  const handleDelete = id => setUserAccount(prev => prev.filter(u => u.id !== id));
  const handleToggleActive = id => setUserAccount(prev => prev.map(u => (u.id === id ? { ...u, isActive: !u.isActive } : u)));

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>


      {/* DASHBOARD COUNTERS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {[
          { title: "Total Users", value: totalUsers, icon: <Users className="text-gray-200 absolute -top-2 -right-2 size-36" /> },
          { title: "Active Users", value: activeUsers, icon: <User2 className="text-green-200 absolute -top-2 -right-2 size-36" /> },
          { title: "Inactive Users", value: inactiveUsers, icon: <UserRoundX className="text-red-200 absolute -top-2 -right-2 size-36" /> },
        ].map((c, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }} className="glass-card p-6 rounded-2xl overflow-hidden shadow-2xl relative">
            {c.icon}
            <h3 className="text-gray-500 dark:text-gray-300">{c.title}</h3>
            <p className="text-3xl font-bold mt-2">{c.value}</p>
          </motion.div>
        ))}
      </div>

{/* CHARTS */}
<div className="grid md:grid-cols-2 gap-6 mb-6">
  <motion.div whileHover={{ rotateX: 5, rotateY: 5 }} className="glass-card p-6 rounded-2xl shadow-2xl">
    <h3 className="mb-4 font-semibold">Bar Chart</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>

  <motion.div whileHover={{ rotateX: 5, rotateY: 5 }} className="glass-card p-6 rounded-2xl shadow-2xl">
    <h3 className="mb-4 font-semibold">Pie Chart</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={pieData} dataKey="value" outerRadius={80} label>
          <Cell fill="#10b981" />
          <Cell fill="#ef4444" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </motion.div>
</div>

      {/* FORM */}
      <motion.div whileHover={{ rotateX: 5, rotateY: 5 }} className="glass-card p-6 rounded-2xl shadow-2xl mb-6">
        <h2 className="mb-4 font-semibold">{isUpdate ? "Update User" : "Add User"}</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input className="input" placeholder="First Name" value={formData.fname} onChange={e => setFormData({ ...formData, fname: e.target.value })} required />
          <input className="input" placeholder="Last Name" value={formData.lname} onChange={e => setFormData({ ...formData, lname: e.target.value })} required />
          <input className="input" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          <input className="input" type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} required />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} />
            <span>Active</span>
          </label>
          <button type="submit" className="btn-primary">{isUpdate ? "Save Update" : "Add User"}</button>
        </form>
      </motion.div>

      {/* USER TABLE */}
      <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 rounded-2xl shadow-2xl">
        <h2 className="font-semibold mb-4">Users List</h2>
        <input className="input mb-4" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Age</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user.id} className="border-t transition-transform">
                  <td>{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td><span className={`badge ${user.isActive ? "badge-green" : "badge-gray"}`}>{user.isActive ? "Active" : "Inactive"}</span></td>
                  <td className="space-x-2">
                    <button onClick={() => handleEdit(user)} className="btn-edit"><Edit2 size={14} /></button>
                    <button onClick={() => handleToggleActive(user.id)} className="btn-edit">Toggle</button>
                    <button onClick={() => handleDelete(user.id)} className="btn-delete"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>{i + 1}</button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default PersonAccount;