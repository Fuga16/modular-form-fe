/** Props for the CreateResourceModal component. */
export interface CreateResourceModalProps {
  /** Controls visibility. The parent must set it to false in response to `onClose`. */
  isOpen: boolean;
  /**
   * Called when the modal should close: cancel, the close button, the backdrop, Escape,
   * or after a resource has been created successfully.
   */
  onClose: () => void;
}

/** Values of the create resource form. */
export interface CreateResourceFormValues {
  /** Name entered by the user. Trimmed before it is submitted. */
  resourceName: string;
}

/**
 * Status of the name field. Selects the feedback emoji, the text, and the submit label.  
 * - `empty`: no visible characters entered.
 * - `ready`: the name can be submitted.
 */
export type ResourceNameStatus = 'empty' | 'ready';
