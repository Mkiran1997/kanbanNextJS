import Image from "next/image";
import React from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col h-screen w-[290px] px-[25px] py-[40px] items-start gap-[40px]">
      <Image src="Logo.svg" width={136} height={35} alt="logo" />
      <div className="w-[240px]">
        <div className="text-slate-500 font-black text-sm mb-4">
          WORKSPACE MENU
        </div>
        <div className="flex gap-3 px-[12px] py-[14px]">
          <Image src="folder.svg" width={24} height={24} alt="folder" />
          Project
        </div>
        <div className="flex gap-3 px-[12px] py-[14px]">
          <Image src="member.svg" width={24} height={24} alt="member" />
          Member
        </div>
      </div>
    </div>
  );
};

export default SideBar;
