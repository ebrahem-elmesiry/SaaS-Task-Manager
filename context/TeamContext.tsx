"use client";

import { MemberForm } from "@/types/team";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type MemberContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;

  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;

  selectedMemberId: string;
  setSelectedMemberId: Dispatch<SetStateAction<string>>;

  formData: MemberForm;
  setFormData: Dispatch<SetStateAction<MemberForm>>;

  openDeleteDialog: (memberId: string) => void;
  openEditModal: (member: MemberForm) => void;
};

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const emptyForm: MemberForm = {
    id: "",
    email: "",
    role: undefined,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [formData, setFormData] = useState<MemberForm>(emptyForm);

  const openDeleteDialog = (memberId: string) => {
    setIsDeleteDialogOpen(true);
    setSelectedMemberId(memberId);
  };

  const openEditModal = (member: MemberForm) => {
    setFormData(member);
    setIsEdit(true);
    setIsOpen(true);
  };

  return (
    <MemberContext.Provider
      value={{
        isOpen,
        setIsOpen,

        isEdit,
        setIsEdit,

        isDeleteDialogOpen,
        setIsDeleteDialogOpen,

        selectedMemberId,
        setSelectedMemberId,

        formData,
        setFormData,

        openEditModal,
        openDeleteDialog,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMemberContext = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("useMemberContext must be used within MemberProvider");
  }

  return context;
};
