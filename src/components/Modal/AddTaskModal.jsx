import CloseIcon from "@/icons/CloseIcon";
import { GET } from "@/services/method";
import { createTask } from "@/app/actions/route";
import React, { useState, useEffect, useMemo } from "react";
import { z } from "zod";

const taskSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

const AddTaskModal = ({ onClose, handleTask }) => {
  const [errors, setErrors] = useState({});
  const [columnData, setColumnData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = taskSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        description: fieldErrors.description?._errors[0] || "",
      });
    }
    try {
      await createTask(formData);
      if (result.success) {
        onClose();
        handleTask();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submitError: "Failed to submit form. Please try again." });
    }
  };

  const fetchUser = async () => {
    try {
      const data = await GET("/users");
      setUserData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const data = await GET("/categories");
      setCategory(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchColumn = async () => {
    try {
      const data = await GET("/columns/1");
      setColumnData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = useMemo(
    () =>
      columnData.map((column) => ({
        value: column.id,
        label: column.title,
      })),
    [columnData]
  );

  const users = useMemo(
    () =>
      userData.map((name) => ({
        value: name,
        label: name,
      })),
    [userData]
  );
  const categoryOptions = useMemo(
    () =>
      category.map((name) => ({
        value: name,
        label: name,
      })),
    [category]
  );

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchColumn();
  }, []);

  useEffect(() => {
    setFormData({
      column: columnData[0]?.id,
      description: "",
      user: userData[0],
      category: category[0],
    });
  }, [columnData, userData, category]);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
          <span className="sr-only">Close modal</span>
        </button>
        <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-1">
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Task Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Write description here"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Column Name
              </label>
              <select
                value={formData.column}
                onChange={handleChange}
                name="column"
                className="appearance-none block w-full px-3 py-2 rounded-lg bg-white text-slate-500 border border-gray-200 focus:border-gray-300 font-medium focus:outline-none focus:ring-0"
              >
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="font-medium"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                User Name
              </label>
              <select
                value={formData.user}
                onChange={handleChange}
                name="user"
                className="appearance-none block w-full px-3 py-2 rounded-lg bg-white text-slate-500 border border-gray-200 focus:border-gray-300 font-medium focus:outline-none focus:ring-0"
              >
                {users.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="font-medium"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                value={formData.category}
                onChange={handleChange}
                name="category"
                className="appearance-none block w-full px-3 py-2 rounded-lg bg-white text-slate-500 border border-gray-200 focus:border-gray-300 font-medium focus:outline-none focus:ring-0"
              >
                {categoryOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="font-medium"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Add new Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
