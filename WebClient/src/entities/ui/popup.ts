export interface PopUp {
  id?: number;
  title?: string;
  image?: string;
  description?: string;
  price?: number;
  onClose: () => void;
  onPayment?: () => void;
}