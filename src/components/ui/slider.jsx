import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  ...props
}) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center cursor-pointer",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-blue-500 dark:bg-blue-600 rounded-full cursor-pointer"
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="block h-5 w-5 rounded-full border-2 border-blue-500 dark:border-blue-600 bg-white dark:bg-gray-800 shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      />
    </SliderPrimitive.Root>
  )
}

export { Slider }
