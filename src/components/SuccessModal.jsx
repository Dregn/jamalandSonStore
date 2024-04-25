import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";
export default function SuccessModal({ showModal, resetModal }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    resetModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
      
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`fixed inset-0 ${
                prefersDarkMode ? "dark:bg-black/75" : "bg-white/75"
              }`}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl dark:bg-gray-800 dark:text-white bg-white text-gray-800 p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="dark:text-neutral-200 text-lg font-medium leading-6 text-gray-900 "
                  >
                    Thank you!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm dark:text-neutral-400 text-gray-500 ">
                      Your form has been successfully submitted. We will get
                      back to you shortly.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className={`inline-flex justify-center mx-auto  rounded-md border border-transparent ${
                        prefersDarkMode ? "dark:bg-blue-600" : "bg-indigo-500"
                      } px-4 py-2 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={closeModal}
                    >
                      Thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
