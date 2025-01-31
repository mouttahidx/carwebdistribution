"use client";

import { Drawer, List } from "flowbite-react";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CategoriesNavMobile from "./CategoriesNavMobile";
import { FaComment, FaEnvelope, FaPhone } from "react-icons/fa";

export function DrawerComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <FaAlignJustify
          onClick={() => setIsOpen(true)}
          className="w-8 h-8 cursor-pointer fill-gray-500"
        />
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="left"
        className="bg-gray-50 pl-0 overflow-y-scroll"
      >
        <Drawer.Header titleIcon={() => <></>} />
        <List className="pl-8">
          <List.Item icon={FaPhone} className=" flex" >
            <a href="tel:1-800-123-4567">1-800-123-4567</a>
          </List.Item>
          <List.Item icon={FaEnvelope} className="!mt-4 flex">
            <a href="mailto:info@carwebdistribution.ca">info@carwebdistribution.ca</a>
          </List.Item>
          <List.Item icon={FaComment} className="!mt-4 flex">
            <span>Live chat</span>
          </List.Item>
        </List>
        <hr className="my-3" />
        <Drawer.Items>
          <h2 className="pl-8 font-semibold">Catégories</h2>
          <CategoriesNavMobile />
        </Drawer.Items>
      </Drawer>
    </>
  );
}
