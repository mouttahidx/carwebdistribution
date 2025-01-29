import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import Script from "next/script";
import React from "react";

export default function LiveChat() {
  return (
    <div className=" bg-gray-50 border p-4 rounded-full fixed bottom-16 right-5 z-50 border-green-500 cursor-pointer shadow-md shadow-gray-500">
      
      {/* <Tooltip
        content="Contactez le support"
        style="light"
        placement="left"
        animation="duration-500"
        arrow={false}
      >
        <div className="flex items-center gap-x-1">
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-green-500" />
          <span className="hidden md:block ">Support</span>
          <span className="ml-2 relative flex h-3 w-3">
            <span className="animate-ping absolute  inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </Tooltip> */}
    </div>
  );
}
