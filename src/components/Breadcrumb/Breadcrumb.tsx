import { Item, Link, List, Nav } from './Breadcrumb.styles'
import type { BreadcrumbProps } from './Breadcrumb.types'

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <Item key={item.href}>
              <Link to={item.href} aria-current={isCurrent ? 'page' : undefined}>
                {item.label}
              </Link>
            </Item>
          )
        })}
      </List>
    </Nav>
  )
}
