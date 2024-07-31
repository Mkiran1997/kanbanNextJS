import React from "react";

export function Select({ data, icon: Icon, name, setSelected, selected }) {
  const handleChange = ({ target: { name, value } }) => {
    setSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative inline-block md:w-[180px] sm:w-[full]">
      <select
        name={name}
        value={selected[name]}
        onChange={handleChange}
        className="appearance-none block w-full px-3 py-2 rounded-lg bg-white  text-slate-500 border border-gray-200  focus:border-gray-300 font-medium	focus:outline-none focus:ring-0"
      >
        <option value="">{`Select ${name}`}</option>
        {data.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="font-medium"
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Icon />
      </div>
    </div>
  );
}
