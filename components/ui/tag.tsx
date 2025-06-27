import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-semibold px-3 py-1",
  {
    variants: {
      variant: {
        primary: "bg-hiko-blue/10 text-hiko-blue",
        secondary: "bg-hiko-mint/10 text-hiko-mint",
        error: "bg-warning-red/10 text-warning-red",
        default: "bg-gray-100 text-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface TagProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
  return <div className={cn(tagVariants({ variant }), className)} {...props} />
}

export { Tag, tagVariants }
