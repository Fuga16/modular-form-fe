export interface ResourceCardInfoItem {
  label: string;
  value: string;
}

export interface ResourceCardProps {
  title: string;
  information?: ResourceCardInfoItem[];
  status: boolean;
  disabled?: boolean;
  onOpen: () => void;
  actionLabel?: string;
  icon?: string;
}
