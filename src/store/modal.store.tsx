import { ReactNode } from "react";
import { create } from "zustand";
import { Modal, type ModalProps } from "asure-ui-libs";

interface ModalState {
  modals: ReactNode[];
  addModal: (params: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => {
  return {
    modals: [],
    addModal: (modalProps: ModalProps) => {
      set((state) => ({
        modals: [
          state.modals,
          <Modal
            key={state.modals.length + 1}
            {...modalProps}
            onCancel={() => state.closeModal()}
          >
            {modalProps?.children}
          </Modal>,
        ],
      }));
    },
    closeModal: () => {
      set((state) => ({ modals: [...state.modals].slice(0, -1) }));
    },
  };
});
