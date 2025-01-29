import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Spinner } from "flowbite-react";
export default function Button({
  text,
  onClick,
  className = "",
  disabled,
  icon = true,
}) {
  return (
    <button
      className={
        className +
        " flex items-center text-sm bg-rachel-red-700 text-white px-2 xl:px-3 py-1.5 rounded-md disabled:cursor-not-allowed disabled:bg-opacity-60"
      }
      onClick={onClick}
      disabled={disabled}
    >
      {!disabled ? (
       <>{ text }{icon && <ChevronRightIcon className="w-4 h-4 ml-1" />}</> 
      ) : (
        <div className="flex items-center gap-3">
          <Spinner size="sm" className="text-gray-600 -mt-0.5 fill-white"/>
         { "Chargement..."}
        </div>
      )}
    </button>
  );
}
