import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;

}

function Modal({show, onClose, children}: ModalProps) {
    if (!show) return null; //same as conditional rendering! i.e like { show && <Modal /> /.... got it right}

    return( 
        <>
        <div className="fixed inset-0 backdrop-blur bg-black/50  flex justify-center items-center h-screen w-screen" onClick={onClose}>
        <div className="flex bg-black p-10  bg-white rounded-xl shadow-sm shadow-white justify-center items-center flex-col" onClick={(e)=>e.stopPropagation()}>
        {children}

        <button onClick={onClose} className=" bg-black text-white h-8 w-15 rounded-md font-instrument  hover:bg-gray-600">
            Close
        </button>
        </div>
        </div>
        </>
    )

}

export default Modal