/** One row of information shown on a details card. */
export interface DetailCardItem {
  /** Name of the field. */
  label: string;
  /** Value of the field. An empty value renders as `-`. */
  value: string;
}

/** Configuration of one card on the details page. */
export interface DetailCardConfig {
  /** Card heading. */
  title: string;
  /** Whether the module is complete. Drives the status badge. */
  status: boolean;
  /** Rows of information shown in the card body. */
  information?: DetailCardItem[];
  /** Called when the user opens the card's action. */
  onOpen: () => void;
  /** Blocks the card's action, for example while a previous step is incomplete. */
  disabled?: boolean;
  /** Text of the action button in the card footer. */
  actionLabel?: string;
  /** Emoji shown in the card icon box. */
  icon?: string;
}
