import Line from "@/icons/Line";
import React from "react";

const Breadcrumb = () => {
  return (
    <div className="mt-2">
      <ol className="flex items-center whitespace-nowrap">
        <li className="inline-flex items-center">
          <a
            className="flex items-center text-sm text-slate-500 focus:outline-none"
            href="/home"
          >
            Home
          </a>
          <Line />
        </li>
        <li className="inline-flex items-center">
          <a
            className="flex items-center text-sm text-slate-500 focus:outline-none"
            href="/projects"
          >
            Projects
            <Line />
          </a>
        </li>
        <li className="inline-flex items-center">
          <a
            className="flex items-center text-sm text-slate-500 focus:outline-none"
            href="/"
          >
            Project champion 💪
          </a>
        </li>
      </ol>
    </div>
  );
};

export default Breadcrumb;
