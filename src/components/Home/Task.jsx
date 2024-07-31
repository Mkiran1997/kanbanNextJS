import TaskIcon from "@/icons/TaskIcon";
import Image from "next/image";
import React, { useState } from "react";

const Task = ({ colIndex, taskIndex, task, hit }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ task: task.id, prevColIndex: colIndex })
    );
  };

  return (
    <div className="mt-5">
      <div
        className="w-[300px] rounded-xl bg-white p-5 cursor-pointer"
        onClick={() => setIsTaskModalOpen(true)}
        draggable
        onDragStart={handleOnDrag}
      >
        <div className="flex gap-2">
          <div className="py-1 px-4 bg-gray-50 rounded-lg">
            <TaskIcon />
          </div>
          <div className="px-3 border border-gray-300 text-slate-500 rounded-lg text-xs">
            Réseau
          </div>
        </div>
        <p className="text-slate-500 mt-2 font-black">{task.description}</p>
        <p className="flex my-3 gap-2 text-customBlue font-medium">
          <Image src="avatar.svg" width={24} height={24} alt="avatar" />
          {task.user}
        </p>
        <div className="border-b-2" />
        <div className="flex justify-between my-2 font-semibold">
          <div className="bg-gray-50 rounded-xl flex py-1 px-3 text-xs gap-2 items-center text-customBlue">
            <Image src="clock.svg" width={12} height={12} alt="date" />
            Due date: {new Date(task.createdAt).toLocaleString()}
          </div>
          <div className="flex text-xs items-center gap-1 text-gray-500">
            <Image src="chat.svg" width={14} height={14} alt="chat" />1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
