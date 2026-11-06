/** One step in the breadcrumb trail. */
export interface BreadcrumbItem {
  /** Visible text of the step. */
  label: string;
  /** Route the step links to. The last item is treated as the current page. */
  href: string;
}

/** Props for the Breadcrumb component. */
export interface BreadcrumbProps {
  /** Steps from the root to the current page, in order. */
  items: readonly BreadcrumbItem[];
  /** Optional extra class for the root `<nav>` element. */
  className?: string;
}
