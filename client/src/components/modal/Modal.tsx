import React from 'react';
// import { useState } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;

}

function Modal({show, onClose, children}: ModalProps) {
    if (!show) return null; //same as conditional rendering! i.e like { show && <Modal /> /.... got it right}

    return(
        <>
        <div className="fixed inset-0 flex justify-center items-center h-screen w-screen">
        <div className="flex bg-black p-20  bg-black/30 rounded-lg shadow-lg justify-center items-center flex-col">
        {children}

        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Close
        </button>
        </div>
        </div>
        </>
    )

}

export default Modal