export interface Book {
  name: string;
  price: number;
  _id: string;
  description?: string;
  category?: string;
  auther?: string;
  image?: string;
}

export interface SidebarProps {
  isFixed?: boolean;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

