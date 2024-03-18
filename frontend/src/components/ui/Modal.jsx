import React, { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import GroupForm from "@components/chat/GroupForm";
import TabContent from "@components/TabContent";

export default function MyModal({
  withTabs = false,
  className,
  isOpen,
  closeModal,
  // firstTab,
  // secondTab,
  tabContentComponents,
  children,
}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <>
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
            <div className="fixed inset-0 bg-black/40" />
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
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative ${className}`}
                >
                  {withTabs && (
                    <div className="tab-button flex absolute left-0 right-0 top-0 border border-b">
                      <button
                        onClick={() => handleTabClick(0)}
                        className={`flex-grow   text-sm font-medium p-4 outline-none border-r focus:outline-none${
                          activeTab === 0
                            ? "text-gray-900 border-b-2 border-b-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        Create Group
                      </button>
                      <button
                        onClick={() => handleTabClick(1)}
                        className={`flex-grow   text-sm font-medium p-4  outline-none focus:outline-none${
                          activeTab === 1
                            ? "text-gray-900 border-b-2 border-green-800"
                            : "text-gray-500"
                        }`}
                      >
                        New Chat
                      </button>
                    </div>
                  )}
                  {withTabs ? (
                    //  <TabContent tab={activeTab} firstTab={firstTab} secondTab={secondTab} />
                    <div className="pt-6">
                      {tabContentComponents[activeTab]}
                    </div>
                  ) : (
                    children
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
