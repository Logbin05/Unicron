type authModalType = "login" | "register" | null;

export interface authModalState {
  modal: authModalType;
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
}
