/** One row of information shown on the card. */
export interface ResourceCardInfoItem {
  /** Name of the field, shown on the left. */
  label: string;
  /** Value of the field, shown on the right. An empty value renders as `-`. */
  value: string;
}

/** Props for the ResourceCard component. */
export interface ResourceCardProps {
  /** Resource name, shown as the card heading. */
  title: string;
  /** Rows of details below the heading. Falsy entries are skipped. */
  information?: ResourceCardInfoItem[];
  /** Whether the resource is completed. Shown as a badge. */
  status: boolean;
  /** Blocks opening the resource: no click, no keyboard action, reduced opacity. */
  disabled?: boolean;
  /** Called when the user opens the resource. Not called while `disabled`. */
  onOpen: () => void;
  /**
   * Text of the action link in the footer.
   * @default 'Open'
   */
  actionLabel?: string;
  /**
   * Emoji or short text shown in the icon box.
   * @default '📦'
   */
  icon?: string;
}
