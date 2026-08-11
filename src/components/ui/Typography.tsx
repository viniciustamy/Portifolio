import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const typographyVariants = cva("text-primary", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-serif",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-serif",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight font-serif",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight font-sans",
      p: "leading-7 [&:not(:first-child)]:mt-6 font-sans",
      blockquote: "mt-6 border-l-2 pl-6 italic text-muted-foreground",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}

export function Typography({
  className,
  variant,
  as,
  ...props
}: TypographyProps) {
  // Define mapping from variant to html tag
  const variantToTag: Record<NonNullable<VariantProps<typeof typographyVariants>["variant"]>, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    p: "p",
    blockquote: "blockquote",
    list: "ul",
    inlineCode: "code",
    lead: "p",
    large: "div",
    small: "small",
    muted: "p",
  }

  const Component = as || (variant ? variantToTag[variant] : "p") || "p"

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  )
}
