'use client';

import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function LoadingModal({loading,text="le formulaire est en cours d'enregistrement"}) {
  const [openModal, setOpenModal] = useState(loading);
  const props = { openModal, setOpenModal };

  return (
    <>
      <Modal closable="false" show={props.openModal === 'pop-up'} size="md" popup  onClose={() => props.setOpenModal(undefined)}>
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


