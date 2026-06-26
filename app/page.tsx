"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { WindowControls } from "@/components/ui/window-controls"
import {
  FileText,
  Monitor,
  Terminal,
  User,
  Briefcase,
  Cpu,
  Mail,
  ExternalLink,
  Clock,
  Sparkles,
  Volume2,
  FolderClosed,
  Copy,
  Check,
  Power,
  RotateCcw
} from "lucide-react"

// --- TYPES ---
type WindowId = "hero" | "about" | "projects" | "skills" | "experience" | "contact"

interface WindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMaximized: boolean
  zIndex: number
  icon: string
  x: string // CSS positioning default
  y: string // CSS positioning default
}

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tags: string[]
  image?: string
  github?: string
  demo?: string
}

export default function Home() {
  // --- STATE ---
  const [booting, setBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [bootStatus, setBootStatus] = useState("Initializing kernel...")
  const [currentTime, setCurrentTime] = useState("")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])
  const [activeTab, setActiveTab] = useState("all")
  
  // Windows configurations
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "hero", title: "welcome.exe", isOpen: true, isMaximized: false, zIndex: 10, icon: "🖥️", x: "md:left-[10%] md:top-[12%]", y: "w-full md:max-w-xl" },
    { id: "about", title: "about_me.txt", isOpen: true, isMaximized: false, zIndex: 8, icon: "📄", x: "md:left-[50%] md:top-[8%]", y: "w-full md:max-w-md" },
    { id: "projects", title: "projects_explorer.exe", isOpen: false, isMaximized: false, zIndex: 1, icon: "📂", x: "md:left-[15%] md:top-[18%]", y: "w-full md:max-w-2xl" },
    { id: "skills", title: "system_specs.sys", isOpen: false, isMaximized: false, zIndex: 1, icon: "⚙️", x: "md:left-[45%] md:top-[40%]", y: "w-full md:max-w-md" },
    { id: "experience", title: "career_log.dat", isOpen: false, isMaximized: false, zIndex: 1, icon: "📈", x: "md:left-[20%] md:top-[25%]", y: "w-full md:max-w-lg" },
    { id: "contact", title: "contact_shortcut.lnk", isOpen: false, isMaximized: false, zIndex: 1, icon: "🔗", x: "md:left-[48%] md:top-[22%]", y: "w-full md:max-w-sm" },
  ])

  // --- REFS ---
  const highestZ = useRef(10)
  const sparklesId = useRef(0)

  // --- BOOT PROCESS SIMULATION ---
  useEffect(() => {
    if (!booting) return

    const statusUpdates = [
      { pct: 15, msg: "Checking system memory (64MB)... OK" },
      { pct: 35, msg: "Loading display drivers (SVGA)..." },
      { pct: 50, msg: "Initializing y2k-ui-lib tokens..." },
      { pct: 70, msg: "Setting up hallmark AI constraints..." },
      { pct: 90, msg: "Starting retro desktop manager..." },
      { pct: 100, msg: "Ready." }
    ]

    const interval = setInterval(() => {
      setBootProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 2
        const currentCap = Math.min(next, 100)

        // Update status text based on percentage
        const update = statusUpdates.find(s => currentCap <= s.pct)
        if (update) setBootStatus(update.msg)

        if (currentCap >= 100) {
          clearInterval(interval)
          setTimeout(() => setBooting(false), 300)
          return 100
        }
        return currentCap
      })
    }, 100)

    return () => clearInterval(interval)
  }, [booting])

  // --- CLOCK TRIGGER ---
  useEffect(() => {
    const updateTime = () => {
      const date = new Date()
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      const strMinutes = minutes < 10 ? "0" + minutes : minutes
      setCurrentTime(`${hours}:${strMinutes} ${ampm}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  // --- GSAP REVEALS (FALLBACK TO PURE CSS) ---
  // Stagger icons entry on desktop load
  const [iconsVisible, setIconsVisible] = useState(false)
  useEffect(() => {
    if (!booting) {
      setTimeout(() => setIconsVisible(true), 150)
    }
  }, [booting])

  // --- SPARKLES TRAIL EFFECT ---
  const handleMouseMove = (e: React.MouseEvent) => {
    // Limit sparkles density
    if (Math.random() > 0.08) return

    const newSparkle = {
      id: sparklesId.current++,
      x: e.clientX,
      y: e.clientY
    }
    setSparkles((prev) => [...prev.slice(-15), newSparkle]) // Keep last 15 sparkles
  }

  useEffect(() => {
    if (sparkles.length === 0) return
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1))
    }, 800)
    return () => clearTimeout(timer)
  }, [sparkles])

  // --- WINDOW CONTROLS HANDLERS ---
  const bringToFront = (id: WindowId) => {
    highestZ.current += 1
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, zIndex: highestZ.current } : win))
    )
  }

  const toggleWindow = (id: WindowId, state?: boolean) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          const nextState = state !== undefined ? state : !win.isOpen
          if (nextState) {
            // Bring to front when opening
            highestZ.current += 1
            return { ...win, isOpen: nextState, zIndex: highestZ.current }
          }
          return { ...win, isOpen: nextState }
        }
        return win
      })
    )
  }

  const toggleMaximize = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMaximized: !win.isMaximized } : win))
    )
  }

  // --- EMAIL COPY HANDLER ---
  const copyEmail = () => {
    navigator.clipboard.writeText("hello@muhamadzafar.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  // --- DATA ---
  const projects: Project[] = [
    {
      id: 1,
      title: "Y2K Component Library",
      description: "A retro-themed design system and component library built on React, Radix UI, and TailwindCSS.",
      longDescription: "A fully feature-rich, high-performance UI library designed for developers who love retro aesthetics. Includes themes, widgets, forms, dialogs, and sliders, fully typed and optimized for bundle size. Used as the core for this very template.",
      tags: ["React", "Radix UI", "TailwindCSS", "NPM Package"],
      github: "https://github.com/MuhamadZafarSyah/y2k-ui",
      demo: "https://y2k-ui.web.id"
    },
    {
      id: 2,
      title: "Motion Playground",
      description: "Visual builder tool to design CSS animations and easings and export them straight to code.",
      longDescription: "An interactive application allowing users to preview animations (staggers, springs, lifts, sparkles) and tweak ease curves using a visual graph, generating production-ready CSS variables or GSAP animation timelines.",
      tags: ["Next.js", "GSAP", "SVG", "CSS Curves"],
      github: "https://github.com/MuhamadZafarSyah/y2k-ui",
      demo: "https://y2k-ui.web.id/playground/motion"
    },
    {
      id: 3,
      title: "Neon Retro CLI",
      description: "Interactive command-line tool that scaffolding project directories with customized color templates.",
      longDescription: "A custom CLI that scaffolds Next.js projects configured with shadcn and custom Y2K pastel tokens. It automates package installs, folder structuring, and baseline layout setups via simple commands.",
      tags: ["Node.js", "Commander", "Inquirer", "Chalk"],
      github: "https://github.com/MuhamadZafarSyah/y2k-ui",
      demo: "https://www.npmjs.com/package/y2k-ui-lib"
    }
  ]

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(activeTab)))

  // --- RENDER BOOTING SCREEN ---
  if (booting) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono text-xs text-white p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Retro BIOS Header */}
          <div className="space-y-1 text-zinc-400">
            <p>RETRO BIOS Version 1.0.8</p>
            <p>Copyright (C) 2026, RetroFuture Industries Ltd.</p>
            <p>CPU: Y2K-Core Processor @ 999MHz</p>
            <p>Memory Test: 65,536 KB OK</p>
          </div>

          {/* Prompt */}
          <div className="border-t border-zinc-800 pt-4 space-y-2">
            <p className="flex items-center gap-1">
              <span className="text-zinc-500">C:\&gt;</span>
              <span className="animate-pulse">load_portfolio.exe --y2k-mode</span>
            </p>
            <p className="text-emerald-400 font-bold">{bootStatus}</p>
          </div>

          {/* Loader bar */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-[10px] text-zinc-400">
              <span>SYSTEM LOADING</span>
              <span>{bootProgress}%</span>
            </div>
            <Progress value={bootProgress} className="h-5 border border-zinc-700 bg-zinc-950 text-emerald-400 [&>[data-slot=progress-indicator]]:bg-emerald-500 rounded-none" />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBooting(false)}
              className="text-xs border-zinc-700 hover:bg-zinc-900 text-zinc-400 font-mono hover:text-white rounded-none h-8"
            >
              <Power className="size-3.5 mr-1" />
              Skip Intro
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // --- RENDER RETRO DESKTOP SCREEN ---
  return (
    <TooltipProvider>
      <div 
        className="relative min-h-screen w-full bg-[#d7dde8] select-none overflow-hidden flex flex-col font-sans text-[#1b1b3a] p-4 pb-16"
        onMouseMove={handleMouseMove}
        style={{
          backgroundImage: "radial-gradient(#1b1b3a 1.2px, transparent 1.2px)",
          backgroundSize: "20px 20px"
        }}
      >
        {/* Mouse sparkles container */}
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {sparkles.map((sp) => (
            <Sparkles
              key={sp.id}
              className="absolute size-3.5 text-[#ffe45e] animate-ping duration-500"
              style={{
                left: sp.x - 7,
                top: sp.y - 7,
              }}
            />
          ))}
        </div>

        {/* --- DESKTOP ICONS GRID --- */}
        <div 
          className={`grid grid-flow-row auto-rows-max gap-6 w-fit md:w-32 transition-all duration-700 ease-out z-0 ${
            iconsVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          {/* Welcome/Hero */}
          <button
            onClick={() => toggleWindow("hero", true)}
            className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-transparent hover:border-[#1b1b3a] hover:bg-[#8ed1fc]/20 text-center w-24 group transition-all"
          >
            <span className="text-3xl filter drop-shadow-[1px_1px_0px_rgba(27,27,58,0.2)] group-hover:scale-110 transition-transform">🖥️</span>
            <span className="mt-1 font-mono text-[10px] font-bold truncate max-w-full">welcome.exe</span>
          </button>

          {/* About */}
          <button
            onClick={() => toggleWindow("about", true)}
            className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-transparent hover:border-[#1b1b3a] hover:bg-[#8ed1fc]/20 text-center w-24 group transition-all"
          >
            <span className="text-3xl filter drop-shadow-[1px_1px_0px_rgba(27,27,58,0.2)] group-hover:scale-110 transition-transform">📄</span>
            <span className="mt-1 font-mono text-[10px] font-bold truncate max-w-full">about.txt</span>
          </button>

          {/* Projects */}
          <button
            onClick={() => toggleWindow("projects", true)}
            className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-transparent hover:border-[#1b1b3a] hover:bg-[#8ed1fc]/20 text-center w-24 group transition-all"
          >
            <span className="text-3xl filter drop-shadow-[1px_1px_0px_rgba(27,27,58,0.2)] group-hover:scale-110 transition-transform">📂</span>
            <span className="mt-1 font-mono text-[10px] font-bold truncate max-w-full">projects.exe</span>
          </button>

          {/* Skills */}
          <button
            onClick={() => toggleWindow("skills", true)}
            className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-transparent hover:border-[#1b1b3a] hover:bg-[#8ed1fc]/20 text-center w-24 group transition-all"
          >
            <span className="text-3xl filter drop-shadow-[1px_1px_0px_rgba(27,27,58,0.2)] group-hover:scale-110 transition-transform">⚙️</span>
            <span className="mt-1 font-mono text-[10px] font-bold truncate max-w-full">skills.sys</span>
          </button>

          {/* Experience */}
          <button
            onClick={() => toggleWindow("experience", true)}
            className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-transparent hover:border-[#1b1b3a] hover:bg-[#8ed1fc]/20 text-center w-24 group transition-all"
          >
            <span className="text-3xl filter drop-shadow-[1px_1px_0px_rgba(27,27,58,0.2)] group-hover:scale-110 transition-transform">📈</span>
            <span className="mt-1 font-mono text-[10px] font-bold truncate max-w-full">career.dat</span>
          </button>

          {/* Contact */}
          <button
            onClick={() => toggleWindow("contact", true)}
            className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-transparent hover:border-[#1b1b3a] hover:bg-[#8ed1fc]/20 text-center w-24 group transition-all"
          >
            <span className="text-3xl filter drop-shadow-[1px_1px_0px_rgba(27,27,58,0.2)] group-hover:scale-110 transition-transform">🔗</span>
            <span className="mt-1 font-mono text-[10px] font-bold truncate max-w-full">contact.lnk</span>
          </button>
        </div>


        {/* --- FLOATING WINDOWS LAYER --- */}
        {windows.map((win) => {
          if (!win.isOpen) return null

          return (
            <div
              key={win.id}
              onClick={() => bringToFront(win.id)}
              className={`fixed transition-all rounded-md border-2 border-[#1b1b3a] bg-[#d7dde8] shadow-[4px_4px_0px_#1b1b3a] flex flex-col overflow-hidden max-h-[80vh] ${
                win.isMaximized 
                  ? "inset-4 md:inset-8 z-[99]" 
                  : `${win.x} ${win.y} z-[${win.zIndex}]`
              }`}
              style={{ 
                zIndex: win.zIndex,
                visibility: "visible"
              }}
            >
              {/* Window Title Bar */}
              <div 
                className="flex items-center justify-between border-b-2 border-[#1b1b3a] bg-[#8ed1fc] px-3 py-1.5 cursor-move active:bg-[#ff8fcf]"
                onDoubleClick={() => toggleMaximize(win.id)}
              >
                <div className="flex items-center gap-1.5">
                  <span className="mr-1">{win.icon}</span>
                  <span className="font-mono text-[11px] font-black tracking-tight text-[#1b1b3a]">
                    {win.title}
                  </span>
                </div>
                <WindowControls
                  onMinimize={() => toggleWindow(win.id, false)}
                  onMaximize={() => toggleMaximize(win.id)}
                  onClose={() => toggleWindow(win.id, false)}
                />
              </div>

              {/* Window Body Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#d7dde8]">
                
                {/* --- HERO WINDOW CONTENT --- */}
                {win.id === "hero" && (
                  <div className="space-y-4">
                    {/* WordArt Header */}
                    <div className="relative py-2 text-center bg-[#ffe45e] border-2 border-[#1b1b3a] rounded shadow-[2px_2px_0px_#1b1b3a] overflow-hidden">
                      <h1 className="font-black text-4xl sm:text-5xl tracking-widest text-[#1b1b3a] uppercase italic drop-shadow-[2px_2px_0px_#ff8fcf]">
                        K A W A I I _
                      </h1>
                      <div className="absolute top-1 right-2 animate-bounce">
                        <Sparkles className="size-4 text-[#ff8fcf] fill-current" />
                      </div>
                    </div>

                    <p className="font-bold text-sm text-[#1b1b3a]/90 text-center leading-relaxed">
                      Hello! I am <span className="underline decoration-[#ff8fcf] decoration-2">Muhamad Zafar Syah</span>, a Full-Stack Web Developer building Retro-Future aesthetic websites.
                    </p>

                    <p className="text-xs text-[#1b1b3a]/75 text-center">
                      Specialising in creating interactive React frontends, customized design systems, and AI-assisted tooling with clean constraints.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <Button 
                        variant="lemon" 
                        size="sm"
                        onClick={() => {
                          toggleWindow("projects", true)
                          bringToFront("projects")
                        }}
                      >
                        Launch Projects.exe
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toggleWindow("contact", true)
                          bringToFront("contact")
                        }}
                        className="bg-white border-2 border-[#1b1b3a] text-[#1b1b3a] hover:bg-[#ff8fcf]/20"
                      >
                        Say Hello!
                      </Button>
                    </div>
                  </div>
                )}

                {/* --- ABOUT WINDOW CONTENT --- */}
                {win.id === "about" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {/* Retro Avatar placeholder with border */}
                      <div className="relative size-16 shrink-0 rounded border-2 border-[#1b1b3a] bg-white overflow-hidden shadow-[2px_2px_0px_#1b1b3a]">
                        <div className="absolute inset-0 bg-[#ffe45e]/20 flex items-center justify-center text-3xl">
                          👾
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-sm text-[#1b1b3a]">Zafar Syah</span>
                          <span className="size-2 rounded-full bg-[#8ff0d0] border border-[#1b1b3a] animate-pulse" />
                          <span className="text-[9px] font-bold text-[#1b1b3a]/60 uppercase">Online</span>
                        </div>
                        <p className="text-xs text-[#1b1b3a]/75 font-mono">Status: Coding Y2K widgets...</p>
                      </div>
                    </div>

                    <div className="rounded border-2 border-[#1b1b3a] bg-white p-3 space-y-2 shadow-[2px_2px_0px_#1b1b3a]">
                      <p className="text-xs text-[#1b1b3a] leading-relaxed">
                        I am a software engineer based in Indonesia. I love working at the intersection of creative frontends and developer tooling. 
                      </p>
                      <p className="text-xs text-[#1b1b3a] leading-relaxed">
                        By blending modern tech (Next.js 16, React 19, TypeScript) with retro visual cues (flat windows, dotted grids, thick lines, pastel fills), I create software that stands out from typical SaaS layouts.
                      </p>
                    </div>

                    {/* Marquee status strip */}
                    <div className="relative border-2 border-[#1b1b3a] bg-[#8ff0d0] text-xs font-bold text-[#1b1b3a] py-1 px-2 rounded shadow-[1px_1px_0px_#1b1b3a] overflow-hidden whitespace-nowrap">
                      <div className="inline-block animate-marquee uppercase tracking-wide font-mono text-[10px]">
                        *** CURRENT MUSIC: Daft Punk - One More Time 🎧 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *** STATUS: Open for freelance inquiries ✉️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </div>
                    </div>
                  </div>
                )}

                {/* --- PROJECTS WINDOW CONTENT --- */}
                {win.id === "projects" && (
                  <div className="space-y-4">
                    {/* Filter Tabs */}
                    <div className="flex items-center justify-between border-b-2 border-[#1b1b3a] pb-2">
                      <div className="flex gap-1.5 overflow-x-auto">
                        {["all", "react", "next.js", "node.js"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-2 py-0.5 rounded text-xs font-bold border-2 border-[#1b1b3a] transition-all capitalize ${
                              activeTab === tab
                                ? "bg-[#ff8fcf] shadow-[1px_1px_0px_#1b1b3a] -translate-y-px"
                                : "bg-white hover:bg-zinc-100"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <Badge variant="mint" className="font-bold text-[9px]">{filteredProjects.length} File(s)</Badge>
                    </div>

                    {/* Project Cards Grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          onClick={() => setSelectedProject(project)}
                          className="group flex flex-col rounded border-2 border-[#1b1b3a] bg-white p-3 shadow-[2px_2px_0px_#1b1b3a] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1b1b3a] cursor-pointer transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-xl">📁</span>
                            <div className="flex gap-1">
                              {project.tags.slice(0, 2).map((t) => (
                                <Badge key={t} variant="outline" className="text-[8px] bg-zinc-50 border-[#1b1b3a] px-1 py-0">{t}</Badge>
                              ))}
                            </div>
                          </div>
                          <h3 className="mt-2 font-black text-xs text-[#1b1b3a] group-hover:underline">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-[10px] text-[#1b1b3a]/75 line-clamp-2 leading-normal">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- SKILLS WINDOW CONTENT --- */}
                {win.id === "skills" && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#1b1b3a]/75 font-mono">
                      System specs of dev capabilities:
                    </p>

                    <div className="space-y-3 bg-white p-4 border-2 border-[#1b1b3a] rounded shadow-[2px_2px_0px_#1b1b3a]">
                      <Progress 
                        label="React & Next.js" 
                        value={95} 
                        showValue 
                        trailingLabel="V19 ready" 
                        indicatorClassName="bg-[#8ed1fc]"
                        className="border-[#1b1b3a]"
                      />
                      <Progress 
                        label="TypeScript" 
                        value={90} 
                        showValue 
                        trailingLabel="Strict: true" 
                        indicatorClassName="bg-[#ff8fcf]"
                        className="border-[#1b1b3a]"
                      />
                      <Progress 
                        label="Tailwind CSS" 
                        value={95} 
                        showValue 
                        trailingLabel="v4.0 engine" 
                        indicatorClassName="bg-[#8ff0d0]"
                        className="border-[#1b1b3a]"
                      />
                      <Progress 
                        label="Node.js & APIs" 
                        value={85} 
                        showValue 
                        trailingLabel="Express/GraphQL" 
                        indicatorClassName="bg-[#ffe45e]"
                        className="border-[#1b1b3a]"
                      />
                      <Progress 
                        label="Animations (GSAP)" 
                        value={80} 
                        showValue 
                        trailingLabel="ScrollTrigger" 
                        indicatorClassName="bg-[#b69cff]"
                        className="border-[#1b1b3a]"
                      />
                    </div>
                  </div>
                )}

                {/* --- EXPERIENCE WINDOW CONTENT --- */}
                {win.id === "experience" && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#1b1b3a]/75 font-mono">
                      Career achievements and timeline log:
                    </p>

                    {/* Timeline */}
                    <div className="relative border-l-2 border-dashed border-[#1b1b3a] pl-4 ml-2 py-1 space-y-4">
                      
                      {/* Job 1 */}
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-[#1b1b3a] bg-[#ffe45e]" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-xs">Senior Frontend Engineer</span>
                            <Badge variant="mint" className="text-[8px] px-1 py-0">2024 - Present</Badge>
                          </div>
                          <p className="text-[10px] font-mono text-[#1b1b3a]/70">Y2K Labs Corp.</p>
                          <p className="text-xs text-[#1b1b3a]/80 leading-normal">
                            Developing internal design tokens, dashboard controls, and widgets. Rewrote legacy React core base to modern Next.js App Router resulting in +40% page speed optimization.
                          </p>
                        </div>
                      </div>

                      {/* Job 2 */}
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-[#1b1b3a] bg-[#ff8fcf]" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-xs">Full Stack Web Developer</span>
                            <Badge variant="outline" className="text-[8px] border-[#1b1b3a] bg-white px-1 py-0">2022 - 2024</Badge>
                          </div>
                          <p className="text-[10px] font-mono text-[#1b1b3a]/70">Nostalgia Tech</p>
                          <p className="text-xs text-[#1b1b3a]/80 leading-normal">
                            Built custom e-commerce templates and headless CMS integration pages. Wrote CLI scaffolding tools to bootstrap standard configurations instantly.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* --- CONTACT WINDOW CONTENT --- */}
                {win.id === "contact" && (
                  <div className="space-y-5 text-center">
                    <p className="text-xs text-[#1b1b3a] leading-relaxed">
                      Wanna build something retro-future together? Or just ask questions? Reach out!
                    </p>

                    <div className="flex flex-col items-center gap-3">
                      {/* Copy email action */}
                      <div className="flex items-center w-full max-w-xs rounded border-2 border-[#1b1b3a] bg-white shadow-[2px_2px_0px_#1b1b3a] overflow-hidden">
                        <span className="bg-[#d7dde8] px-2.5 py-1.5 text-[11px] font-bold border-r border-[#1b1b3a] select-all font-mono truncate flex-1 text-left">
                          hello@muhamadzafar.com
                        </span>
                        <button
                          onClick={copyEmail}
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
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a 
                              href="https://github.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex size-8 items-center justify-center rounded-full border-2 border-[#1b1b3a] bg-white text-[#1b1b3a] hover:bg-[#8ed1fc] hover:-translate-y-0.5 transition-all shadow-[1.5px_1.5px_0px_#1b1b3a]"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                              </svg>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>GitHub</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a 
                              href="https://twitter.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex size-8 items-center justify-center rounded-full border-2 border-[#1b1b3a] bg-white text-[#1b1b3a] hover:bg-[#ff8fcf] hover:-translate-y-0.5 transition-all shadow-[1.5px_1.5px_0px_#1b1b3a]"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>Twitter / X</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a 
                              href="https://linkedin.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex size-8 items-center justify-center rounded-full border-2 border-[#1b1b3a] bg-white text-[#1b1b3a] hover:bg-[#8ff0d0] hover:-translate-y-0.5 transition-all shadow-[1.5px_1.5px_0px_#1b1b3a]"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                              </svg>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>LinkedIn</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )
        })}


        {/* --- PROJECT DETAIL MODAL DIALOG --- */}
        <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent 
            title={selectedProject ? `file_viewer.exe - ${selectedProject.title}` : "viewer.exe"}
            className="sm:max-w-md border-2 border-[#1b1b3a] rounded-lg overflow-hidden bg-[#d7dde8]"
          >
            {selectedProject && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-[#1b1b3a]">{selectedProject.title}</h3>
                  <div className="flex gap-1.5">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="rounded border border-[#1b1b3a] bg-[#ffe45e] px-1.5 py-px text-[9px] font-bold text-[#1b1b3a]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#1b1b3a]/90 leading-relaxed font-medium">
                  {selectedProject.longDescription}
                </p>

                <div className="flex gap-3 pt-3 border-t border-[#1b1b3a]/15">
                  {selectedProject.demo && (
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="lemon" className="w-full text-xs h-8">
                        <ExternalLink className="size-3.5 mr-1" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" className="w-full text-xs h-8 bg-white border-[#1b1b3a] flex items-center justify-center gap-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5 inline">
                          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                        </svg>
                        <span>GitHub Code</span>
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>


        {/* --- TASKBAR / DOCK BOTTOM --- */}
        <div className="fixed bottom-0 left-0 right-0 h-10 border-t-2 border-[#1b1b3a] bg-[#d7dde8] flex items-center justify-between px-3 z-[999] shadow-[0_-2px_10px_rgba(27,27,58,0.1)]">
          {/* Start Menu Button (just toggles all windows back open) */}
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="lemon"
              className="h-7 text-xs font-black border-2 border-[#1b1b3a] uppercase px-2.5 shadow-[1.5px_1.5px_0px_#1b1b3a] active:translate-y-px active:shadow-[0.5px_0.5px_0px_#1b1b3a] flex items-center gap-1 shrink-0"
              onClick={() => {
                setWindows(prev => prev.map(w => w.id === "hero" || w.id === "about" ? { ...w, isOpen: true } : w))
              }}
            >
              <Monitor className="size-3.5 fill-[#1b1b3a]/10" />
              <span>Start</span>
            </Button>

            <span className="w-0.5 h-6 bg-[#1b1b3a]/20 mx-1" aria-hidden />

            {/* Active Apps Pills (Dock) */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50vw] sm:max-w-[70vw] pr-2 no-scrollbar">
              {windows.map((win) => {
                const isActive = win.isOpen
                return (
                  <button
                    key={win.id}
                    onClick={() => {
                      toggleWindow(win.id, !win.isOpen)
                      if (!win.isOpen) bringToFront(win.id)
                    }}
                    className={`h-7 px-2 sm:px-2.5 rounded border-2 border-[#1b1b3a] text-[10px] font-bold flex items-center gap-1.5 transition-all truncate max-w-28 shrink-0 ${
                      isActive
                        ? "bg-[#ff8fcf] shadow-[inset_1.5px_1.5px_0px_#1b1b3a] translate-y-px"
                        : "bg-white shadow-[1.5px_1.5px_0px_#1b1b3a] hover:bg-zinc-100"
                    }`}
                  >
                    <span>{win.icon}</span>
                    <span className="max-sm:hidden truncate">{win.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Clock on right side */}
          <div className="flex items-center gap-2 border-2 border-[#1b1b3a] bg-white rounded px-2.5 py-0.5 shadow-[inset_1px_1px_0px_rgba(27,27,58,0.1)] text-[10px] font-black text-[#1b1b3a]/90 font-mono">
            <Volume2 className="size-3 text-[#1b1b3a]/50" />
            <Clock className="size-3 text-[#1b1b3a]/50" />
            <span>{currentTime}</span>
          </div>
        </div>

      </div>
    </TooltipProvider>
  )
}
