"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function FacultyPage() {
  const [faculties, setFaculties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    designation: "",
    department: "",
    social: "",
    about: "",
    publication: "",
    education: "",
  });

  const departments = ["All", "CSE", "EEE", "BBA", "English", "Math"];

  // 🟢 Fetch faculty list from server
  useEffect(() => {
    fetch("https://dynamic-edu-website-server.vercel.app/faculty")
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((err) => console.error("Error fetching faculties:", err));
  }, []);

  // 🟡 Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setImagePreview(value);
  };

  // 🟢 Add or Update Faculty
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.designation.trim()) {
      Swal.fire("Error", "Name and Designation are required!", "error");
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://dynamic-edu-website-server.vercel.app/faculty/${editingId}`
      : "https://dynamic-edu-website-server.vercel.app/faculty";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (editingId) {
        // ✅ Update existing record in UI
        setFaculties((prev) =>
          prev.map((f) => (f._id === editingId ? data : f))
        );
        Swal.fire("Updated!", "Faculty updated successfully.", "success");
      } else {
        // ✅ Add new record in UI
        setFaculties((prev) => [...prev, data]);
        Swal.fire("Added!", "New faculty added successfully.", "success");
      }

      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Save error:", error);
      Swal.fire("Error", "Failed to save faculty data", "error");
    }
  };

  // 🔴 Delete Faculty with SweetAlert2 Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://dynamic-edu-website-server.vercel.app/faculty/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setFaculties((prev) => prev.filter((f) => f._id !== id));
            Swal.fire("Deleted!", "Faculty has been deleted.", "success");
          })
          .catch(() => Swal.fire("Error", "Failed to delete faculty", "error"));
      }
    });
  };

  // 🧹 Reset form
  const resetForm = () => {
    setFormData({
      image: "",
      name: "",
      designation: "",
      department: "",
      social: "",
      about: "",
      publication: "",
      education: "",
    });
    setEditingId(null);
    setImagePreview("");
  };

  // ✏️ Edit Faculty
  const handleEdit = (faculty) => {
    setFormData(faculty);
    setEditingId(faculty._id);
    setImagePreview(faculty.image);
    setShowModal(true);
  };

  // 🔍 Filtered faculty list
  const filteredFaculties = faculties.filter(
    (f) =>
      f.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter === "All" || f.department === departmentFilter)
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-3 bg-white p-5 rounded-md shadow">
        {/* Search */}
        <div className="relative w-full md:w-60">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-md" />
          <input
            type="text"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter + Add Button */}
        <div className="flex items-center gap-8">
          <div className="relative inline-block">
            {/* Dropdown wrapper */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-56 appearance-none px-10 py-3 bg-white border border-gray-200 rounded-md
                  text-gray-700 font-medium cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 
                 transition duration-200"
              >
                {departments.map((dept) => (
                  <option
                    key={dept}
                    value={dept}
                    className="py-2 text-gray-700 hover:bg-blue-50 transition"
                  >
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>

              {/* Dropdown arrow */}
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-md hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
          >
            <FaPlus /> Add Faculty
          </button>
        </div>
      </div>

      {/* Table View */}
      <div className="mx-auto bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Photo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Education
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <tr key={faculty._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <Image
                        src={faculty.image || "https://via.placeholder.com/60"}
                        width={60}
                        height={60}
                        alt={faculty.name}
                        className="w-12 h-12 object-cover rounded-full ring-2 ring-gray-100"
                        unoptimized
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {faculty.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {faculty.designation}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {faculty.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {faculty.education || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(faculty)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(faculty._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No faculty found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-700/70 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Faculty" : "Add Faculty"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex justify-center">
                <Image
                  src={imagePreview || "https://via.placeholder.com/150"}
                  width={120}
                  height={120}
                  alt="Preview"
                  className="rounded-full ring-4 ring-gray-200"
                  unoptimized
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                />
                <input
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                  required
                />
                <input
                  name="designation"
                  placeholder="Designation *"
                  value={formData.designation}
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                  required
                />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                >
                  <option value="">Select Department</option>
                  {departments.slice(1).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <input
                  name="education"
                  placeholder="Education"
                  value={formData.education}
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                />
                <input
                  name="social"
                  placeholder="Social Media Link"
                  value={formData.social}
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                />
                <textarea
                  name="about"
                  placeholder="About"
                  value={formData.about}
                  onChange={handleChange}
                  rows={3}
                  className="md:col-span-2 border p-3 rounded-xl"
                />
                <input
                  name="publication"
                  placeholder="Publications (comma-separated)"
                  value={formData.publication}
                  onChange={handleChange}
                  className="md:col-span-2 border p-3 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
