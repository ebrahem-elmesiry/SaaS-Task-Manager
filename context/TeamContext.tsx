"use client";

import { useMemberActions } from "@/features/team/hooks/useMemberActions";
import { useMemberForm } from "@/features/team/hooks/useMemberForm";
import { returnFn, Role } from "@/types/main";
import { Member, MemberForm } from "@/types/team";
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

  members: Member[];
  setMembers: Dispatch<SetStateAction<Member[]>>;

  formData: MemberForm;
  handleChange: (key: keyof MemberForm, value: string) => void;
  setRole: (role: Role) => void;

  deleteMember: (id: string) => returnFn;
  openDeleteDialog: (memberId: string) => void;
  openEditModal: (member: MemberForm) => void;
  reset: () => void;

  handleSubmit: (members: MemberForm) => returnFn;
  loading: boolean;
};

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({
  children,
  initialMembers,
}: {
  children: ReactNode;
  initialMembers: Member[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const emptyForm: MemberForm = {
    id: "",
    name: "",
    email: "",
    role: undefined,
  };

  const { formData, setFormData, handleChange, setRole, validate } =
    useMemberForm(emptyForm);

  const {
    members,
    setMembers,
    addMember,
    updateMember,
    deleteMember,
    loading,
  } = useMemberActions(initialMembers);

  const reset = () => {
    setFormData(emptyForm);
    setIsEdit(false);
    setIsOpen(false);
  };

  const openDeleteDialog = (memberId: string) => {
    setIsDeleteDialogOpen(true);
    setSelectedMemberId(memberId);
  };

  const openEditModal = (member: MemberForm) => {
    setFormData(member);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSubmit = async (formData: MemberForm) => {
    const valid = validate(formData);

    if (!valid.success) {
      return {
        success: false,
        message: valid.message,
      };
    }
    const result = isEdit
      ? await updateMember(formData)
      : await addMember(formData);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }
    reset();
    return {
      success: true,
      message: result.message,
    };
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

        members,
        setMembers,

        formData,
        handleChange,

        deleteMember,
        handleSubmit,

        loading,

        reset,
        setRole,
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
