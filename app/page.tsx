"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useWindows } from "@/hooks/useWindows"
import { useBootSequence } from "@/hooks/useBootSequence"
import { useClock } from "@/hooks/useClock"
import { useSparkles } from "@/hooks/useSparkles"
import type { Project } from "@/data/projects"
import { BootScreen } from "@/components/desktop/BootScreen"
import { DesktopIcons } from "@/components/desktop/DesktopIcons"
import { FloatingWindow } from "@/components/desktop/FloatingWindow"
import { Taskbar } from "@/components/desktop/Taskbar"
import { ProjectDetailDialog } from "@/components/desktop/ProjectDetailDialog"
import { HeroWindow } from "@/components/desktop/window-content/HeroWindow"
import { AboutWindow } from "@/components/desktop/window-content/AboutWindow"
import { ProjectsWindow } from "@/components/desktop/window-content/ProjectsWindow"
import { SkillsWindow } from "@/components/desktop/window-content/SkillsWindow"
import { ExperienceWindow } from "@/components/desktop/window-content/ExperienceWindow"
import { ContactWindow } from "@/components/desktop/window-content/ContactWindow"

export default function Home() {
  // ── Hooks ──────────────────────────────────────────────
  const win = useWindows()
  const boot = useBootSequence()
  const currentTime = useClock()
  const sparkle = useSparkles()

  // ── Local UI state ────────────────────────────────────
  const [iconsVisible, setIconsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    if (!boot.booting) setTimeout(() => setIconsVisible(true), 150)
  }, [boot.booting])

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@muhamadzafar.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  // ── Boot screen ───────────────────────────────────────
  if (boot.booting) {
    return (
      <BootScreen
        bootProgress={boot.bootProgress}
        bootStatus={boot.bootStatus}
        onSkip={() => boot.setBooting(false)}
      />
    )
  }

  // ── Desktop ───────────────────────────────────────────
  return (
    <TooltipProvider>
      <div
        className="relative min-h-screen w-full bg-[#d7dde8] select-none overflow-hidden flex flex-col font-sans text-[#1b1b3a] p-4 pb-16"
        onMouseMove={sparkle.handleMouseMove}
        style={{
          backgroundImage: "radial-gradient(#1b1b3a 1.2px, transparent 1.2px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Sparkles */}
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {sparkle.sparkles.map((sp) => (
            <Sparkles
              key={sp.id}
              className="absolute size-3.5 text-[#ffe45e] animate-ping duration-500"
              style={{ left: sp.x - 7, top: sp.y - 7 }}
            />
          ))}
        </div>

        {/* Desktop icons */}
        <DesktopIcons
          visible={iconsVisible}
          onOpenWindow={(id) => win.toggleWindow(id, true)}
        />

        {/* Floating windows */}
        {win.windows.map((w) => {
          if (!w.isOpen) return null

          const content = (() => {
            switch (w.id) {
              case "hero":
                return (
                  <HeroWindow
                    onOpenProjects={() => { win.toggleWindow("projects", true); win.bringToFront("projects") }}
                    onOpenContact={() => { win.toggleWindow("contact", true); win.bringToFront("contact") }}
                  />
                )
              case "about":
                return <AboutWindow />
              case "projects":
                return <ProjectsWindow onSelectProject={setSelectedProject} />
              case "skills":
                return <SkillsWindow />
              case "experience":
                return <ExperienceWindow />
              case "contact":
                return <ContactWindow copiedEmail={copiedEmail} onCopyEmail={copyEmail} />
              default:
                return null
            }
          })()

          return (
            <FloatingWindow
              key={w.id}
              win={w}
              isMobile={win.isMobile}
              isAnimating={win.animatingIn.has(w.id)}
              dragState={win.dragState}
              resizeState={win.resizeState}
              windows={win.windows}
              onBringToFront={win.bringToFront}
              onToggleMaximize={win.toggleMaximize}
              onMinimize={(id) => win.toggleWindow(id, false)}
              onClose={(id) => win.toggleWindow(id, false)}
            >
              {content}
            </FloatingWindow>
          )
        })}

        {/* Project detail modal */}
        <ProjectDetailDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Taskbar */}
        <Taskbar
          windows={win.windows}
          currentTime={currentTime}
          onStart={win.resetWindows}
          onToggleWindow={(id) => win.toggleWindow(id)}
          onBringToFront={win.bringToFront}
        />
      </div>
    </TooltipProvider>
  )
}
