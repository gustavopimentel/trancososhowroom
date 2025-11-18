import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const sidebarVariants = cva(
  'group peer fixed inset-y-0 z-50 hidden w-sidebar border-r border-sidebar-border bg-sidebar-background text-sidebar-foreground transition-all duration-300 ease-linear data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full lg:flex lg:translate-x-0',
  {
    variants: {
      variant: {
        default: '',
        floating: 'lg:mx-2 lg:mt-2 lg:mb-2 lg:rounded-lg',
        inset: 'lg:border-r-0',
      },
      side: {
        left: 'left-0',
        right: 'right-0 data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      side: 'left',
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsible?: 'offcanvas' | 'icon' | 'none'
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: 'left' | 'right'
  variant?: 'default' | 'floating' | 'inset'
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, side, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sidebarVariants({ variant, side }), className)}
        data-sidebar="sidebar"
        {...props}
      />
    )
  }
)
Sidebar.displayName = 'Sidebar'

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      data-sidebar="trigger"
      {...props}
    />
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex h-full w-full flex-col', className)}
      data-sidebar="content"
      {...props}
    />
  )
})
SidebarContent.displayName = 'SidebarContent'

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar="header"
      {...props}
    />
  )
})
SidebarHeader.displayName = 'SidebarHeader'

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar="footer"
      {...props}
    />
  )
})
SidebarFooter.displayName = 'SidebarFooter'

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative flex w-full flex-col p-2', className)}
      data-sidebar="group"
      {...props}
    />
  )
})
SidebarGroup.displayName = 'SidebarGroup'

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-semibold text-sidebar-foreground/70',
        className
      )}
      data-sidebar="group-label"
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative flex w-full flex-col gap-1', className)}
      data-sidebar="group-content"
      {...props}
    />
  )
})
SidebarGroupContent.displayName = 'SidebarGroupContent'

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn('flex w-full flex-col gap-1', className)}
      data-sidebar="menu"
      {...props}
    />
  )
})
SidebarMenu.displayName = 'SidebarMenu'

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn('group/item relative flex', className)}
      data-sidebar="menu-item"
      {...props}
    />
  )
})
SidebarMenuItem.displayName = 'SidebarMenuItem'

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ReactNode
  }
>(({ className, isActive, tooltip, asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'div' : 'button'
  return (
    <Comp
      ref={ref as any}
      className={cn(
        'flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm font-medium text-sidebar-foreground outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold data-[active=true]:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        isActive && 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground',
        className
      )}
      data-sidebar="menu-button"
      data-active={isActive}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
}




