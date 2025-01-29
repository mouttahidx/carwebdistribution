import React, { useEffect, useState } from "react";

export default function AttributeOptions({
  id,
  name,
  options = [],
  updateSelected,
  selected,
  index,
  attributes,
  position,
  newSelectOption,
}) {
  const [active, setActive] = useState(null);
  const handleActive = (option) => {
    setActive(option);
  };

  useEffect(() => {
    if (active) {
      updateSelected({ id, name, option: active, position });
    }
  }, [active]);

  useEffect(() => {
      if(newSelectOption.position < position && active)
      {
        setActive(null)
        updateSelected({ id, remove:true });
        
      }

      if(index > 0 & options.length === 1 && !active){
        setActive(options[0])
      }
  }, [newSelectOption,options]);


  const Options = () => {
    if (options.length <= 3) {
      return options.map((option) => (
        <button
          className={
            active === option
              ? "px-2 text-sm py-0 border border-rachel-red-700 rounded-md disabled:cursor-not-allowed"
              : "px-2 text-sm py-0 border border-rachel-black-300 rounded-md text-rachel-black-300 disabled:cursor-not-allowed"
          }
          onClick={() => {
            handleActive(option);
          }}
          key={option}
          disabled={
            index > 0 &&
            selected.findIndex(
              (item) => item.name === attributes[index - 1].name
            ) === -1
          }
        >
          {option}
        </button>
      ));
    } else {
      return (
        <>
          <select
            onChange={(e) => {
              handleActive(e.target.value);
            }}
            className="rounded-md py-1 text-sm w-full disabled:cursor-not-allowed cursor-pointer"
            defaultValue={active === null ? "DEFAULT" : active}
            disabled={
              position > 0 &&
              selected.findIndex(
                (item) => item.id === attributes[index - 1].id
              ) === -1
            }
          >
            <option value="DEFAULT" disabled>
              Selectionnez {name}
            </option>
            {options.map((option) => (
              <option
                className="px-5 text-sm py-0 border border-rachel-red-700 rounded-md"
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </>
      );
    }
  };

  return (
    <div className="flex justify-between w-2/3">
      <Options />
    </div>
  );
}