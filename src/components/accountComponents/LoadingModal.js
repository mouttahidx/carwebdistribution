'use client';

import { Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';

export default function LoadingModal({loading,text="le formulaire est en cours d'enregistrement"}) {
  const [openModal, setOpenModal] = useState(loading);

  
  const handleClose = () => {
    setOpenModal(false);
  };



  return (
    <>
      <Modal  closable="false" show={openModal} size="md" popup position='center' onClose={() => handleClose()}>
        {/* <Modal.Header /> */}
        <Modal.Body>
          <div className="text-center h-[250px] flex flex-col justify-center !top-[50%]">
            <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
            {text}
            </h3>
            <Spinner size={"xl"} color={"failure"}/>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


