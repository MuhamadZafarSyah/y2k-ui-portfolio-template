"use client"

export function ResizeHandle({ onResizeStart }: { onResizeStart: (e: React.PointerEvent) => void }) {
  return (
    <div
      className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize group/resize z-10"
      onPointerDown={onResizeStart}
    >
      <svg
        width="14" height="14" viewBox="0 0 14 14"
        className="absolute bottom-0.5 right-0.5 opacity-25 group-hover/resize:opacity-50 transition-opacity"
      >
        <path
          d="M12 2L2 12M12 6L6 12M12 10L10 12"
          stroke="#1b1b3a" strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
      </svg>
    </div>
  )
}
