"use client";
import React, { useState, useEffect, useMemo } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Breadcrumb from "../Common/breadcrumb";
import AddTaskModal from "../Modal/AddTaskModal";
import { Select } from "../Common/Select";
import { GET, POST } from "@/services/method";
import useDebounce from "@/hooks/useDebounce";
import SearchIcon from "@/icons/HomeIcon";
import AddIcon from "@/icons/AddIcon";
import UserIcon from "@/icons/UserIcon";
import CategoryIcon from "@/icons/CategoryIcon";
import Task from "./Task";

const colors = [
  "bg-green-500",
  "bg-yellow-400",
  "bg-indigo-500",
  "bg-slate-500",
];

const Dashboard = () => {
  const [selected, setSelected] = useState({});
  const [userData, setUserData] = useState([]);
  const [category, setCategory] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [searchParam, setSearchParam] = useState(null);
  const [newFilterData, setNewFilterData] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: "2024-07-01T00:00:00.000Z",
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });

  const handleChange = useDebounce((search, setState) => {
    setState(search);
  }, 500);

  const handleValueChange = (newValue) => {
    setDateRange({
      startDate: new Date(newValue.startDate).toISOString(),
      endDate: new Date(newValue.endDate).toISOString(),
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const fetchColumn = async () => {
    try {
      const data = await GET("/boards/1/columns");
      setColumnData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleFilterData = async (searchData) => {
    try {
      const taskDetails = await GET(`/tasks/search?query=${searchData}`);
      setNewFilterData(processData(taskDetails.results));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (searchParam) {
      handleFilterData(searchParam);
    } else {
      handleTask();
    }
  }, [searchParam]);

  const processData = (data) => {
    const colData = columnData.reduce((prev, curr) => {
      prev[curr.id] = curr[curr.id] || [];

      return prev;
    }, {});
    data.map((d) => {
      if (colData[d.columnId]) {
        colData[d.columnId].push(d);
      } else {
      }
    });
    return colData;
  };

  const handleTask = async () => {
    setSearchParam("");
    try {
      const taskDetails = await POST("/tasks", {
        categories: selected.category ? [selected.category] : [],
        users: selected.user ? [selected.user] : [],
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });

      setNewFilterData(processData(taskDetails));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchColumn();
    fetchUser();
    fetchCategory();
  }, []);

  useEffect(() => {
    columnData.length && handleTask();
  }, [selected.category, selected.user, columnData, dateRange]);

  const handleOnDrop = async (e, colIndex, length) => {
    e.preventDefault();
    const { task, prevColIndex } = JSON.parse(e.dataTransfer.getData("text"));
    if (colIndex !== prevColIndex) {
      try {
        await POST("/boards/1/move-task", {
          task,
          position: length,
          destination: colIndex + 1,
        });
        handleTask();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full xs:px-4 lg:px-10">
        <div className="pt-10 pb-5 flex justify-between items-center xs:flex-col md:flex-row">
          <div>
            <div className="text-2xl text-customBlue font-black">
              Projet champion 💪
            </div>
            <Breadcrumb />
          </div>
          <div className="xs:mt-2 md:mt-0">
            <button
              onClick={handleToggle}
              className="bg-indigo-500 text-white font-bold py-2 px-3 rounded-lg flex gap-2 items-center"
            >
              <AddIcon />
              Create a new Task
            </button>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center px-3 py-2 gap-3">
              <div className="relative py-1 max-w-full lg:max-w-[300px] w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon />
                </div>

                <input
                  type="text"
                  className="w-full p-3 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:border-gray-300 focus:outline-none focus:ring-0"
                  placeholder="Search description..."
                  name="searchParam"
                  onChange={(e) => handleChange(e.target.value, setSearchParam)}
                />
              </div>

              <div className="flex flex-col md:flex-row lg:gap-2 w-full lg:w-auto">
                <div className="flex flex-col md:flex-row gap-2 w-full lg:w-auto">
                  <Select
                    icon={UserIcon}
                    data={users}
                    name="user"
                    setSelected={setSelected}
                    selected={selected}
                  />
                  <Select
                    icon={CategoryIcon}
                    data={categoryOptions}
                    name="category"
                    setSelected={setSelected}
                    selected={selected}
                  />
                </div>
                <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg bg-white text-gray-900 w-full lg:w-[220px] xs:mt-2 xs:mb-2  md:mb-0 md:mt-0">
                  <Datepicker
                    value={dateRange}
                    onChange={handleValueChange}
                    primaryColor="indigo"
                    inputClassName="text-sm text-gray-900 focus:border-gray-300 focus:outline-none focus:ring-0 relative transition-all duration-300 py-2.5 pl-4 w-full border-gray-300 rounded-lg tracking-wide font-light placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed"
                    displayFormat="DD/MM/YY"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex xs:flex-col xl:flex-row">
          {Object.values(newFilterData)?.map((data, colIndex) => {
            let sortedData = data.sort((a, b) => a.position - b.position);

            return (
              <div
                className="flex flex-col scrollbar-hide mt-[30px] min-w-[300px] mr-7"
                onDrop={(e) => handleOnDrop(e, colIndex, data.length)}
                onDragOver={handleOnDragOver}
              >
                <div className="flex gap-2 items-center text-customBlue font-black">
                  <div className={`rounded-full w-4 h-4 ${colors[colIndex]}`} />
                  {columnData[colIndex].title} ({data.length})
                </div>
                {sortedData.map((innerData, index) => {
                  return (
                    <div>
                      <Task
                        key={index}
                        taskIndex={index}
                        colIndex={colIndex}
                        task={innerData}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          handleTask={handleTask}
        />
      )}
    </>
  );
};

export default Dashboard;
