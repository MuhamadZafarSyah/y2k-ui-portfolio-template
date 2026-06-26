"use client"

import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com",
    hoverBg: "hover:bg-[#8ed1fc]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    hoverBg: "hover:bg-[#ff8fcf]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    hoverBg: "hover:bg-[#8ff0d0]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      </svg>
    ),
  },
]

interface ContactWindowProps {
  copiedEmail: boolean
  onCopyEmail: () => void
}

export function ContactWindow({ copiedEmail, onCopyEmail }: ContactWindowProps) {
  return (
    <div className="space-y-5 text-center">
      <p className="text-xs text-[#1b1b3a] leading-relaxed">
        Wanna build something retro-future together? Or just ask questions? Reach out!
      </p>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center w-full max-w-xs rounded border-2 border-[#1b1b3a] bg-white shadow-[2px_2px_0px_#1b1b3a] overflow-hidden">
          <span className="bg-[#d7dde8] px-2.5 py-1.5 text-[11px] font-bold border-r border-[#1b1b3a] select-all font-mono truncate flex-1 text-left">
            hello@muhamadzafar.com
          </span>
          <button
            onClick={onCopyEmail}
            className="bg-[#ffe45e] hover:bg-[#ffe45e]/80 text-[#1b1b3a] font-bold p-1.5 h-full transition-colors active:scale-95 shrink-0"
            aria-label="Copy email address"
          >
            {copiedEmail ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
          </button>
        </div>

        <a href="mailto:hello@muhamadzafar.com" className="w-full max-w-xs">
          <Button variant="lemon" className="w-full h-8 text-xs font-bold">
            Open Mailbox (Mailto)
          </Button>
        </a>
      </div>

      <div className="border-t-2 border-dashed border-[#1b1b3a]/15 pt-4">
        <p className="text-[10px] text-[#1b1b3a]/60 font-bold mb-2 uppercase">Or connect via</p>
        <div className="flex items-center justify-center gap-3">
          {SOCIAL_LINKS.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex size-8 items-center justify-center rounded-full border-2 border-[#1b1b3a] bg-white text-[#1b1b3a] ${link.hoverBg} hover:-translate-y-0.5 transition-all shadow-[1.5px_1.5px_0px_#1b1b3a]`}
                >
                  {link.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent>{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}
