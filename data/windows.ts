// ============================================================
// 📁 Window definitions & shared types
// Edit this file to change window titles, icons, and positions.
// ============================================================

export type WindowId = "hero" | "about" | "projects" | "skills" | "experience" | "contact"

export interface WindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMaximized: boolean
  zIndex: number
  icon: string
  left: number
  top: number
  width: number
  height: number
}

export interface DragState {
  windowId: WindowId
  startMouseX: number
  startMouseY: number
  startLeft: number
  startTop: number
}

export interface ResizeState {
  windowId: WindowId
  startMouseX: number
  startMouseY: number
  startWidth: number
  startHeight: number
}

export function getDefaultWindows(vw: number, vh: number): WindowState[] {
  const isMobile = vw < 768

  return [
    {
      id: "hero", title: "welcome.exe", isOpen: true, isMaximized: false,
      zIndex: 10, icon: "🖥️",
      left: isMobile ? 8 : Math.max(20, vw * 0.06),
      top: isMobile ? 48 : Math.max(32, vh * 0.08),
      width: isMobile ? vw - 16 : Math.min(560, vw * 0.38),
      height: 0,
    },
    {
      id: "about", title: "about_me.txt", isOpen: true, isMaximized: false,
      zIndex: 8, icon: "📄",
      left: isMobile ? 8 : Math.max(20, vw * 0.52),
      top: isMobile ? 48 : Math.max(32, vh * 0.05),
      width: isMobile ? vw - 16 : Math.min(420, vw * 0.30),
      height: 0,
    },
    {
      id: "projects", title: "projects_explorer.exe", isOpen: false, isMaximized: false,
      zIndex: 1, icon: "📂",
      left: isMobile ? 8 : Math.max(20, vw * 0.10),
      top: isMobile ? 48 : Math.max(32, vh * 0.15),
      width: isMobile ? vw - 16 : Math.min(640, vw * 0.44),
      height: 0,
    },
    {
      id: "skills", title: "system_specs.sys", isOpen: false, isMaximized: false,
      zIndex: 1, icon: "⚙️",
      left: isMobile ? 8 : Math.max(20, vw * 0.48),
      top: isMobile ? 48 : Math.max(32, vh * 0.48),
      width: isMobile ? vw - 16 : Math.min(420, vw * 0.28),
      height: 0,
    },
    {
      id: "experience", title: "career_log.dat", isOpen: false, isMaximized: false,
      zIndex: 1, icon: "📈",
      left: isMobile ? 8 : Math.max(20, vw * 0.16),
      top: isMobile ? 48 : Math.max(32, vh * 0.28),
      width: isMobile ? vw - 16 : Math.min(500, vw * 0.36),
      height: 0,
    },
    {
      id: "contact", title: "contact_shortcut.lnk", isOpen: false, isMaximized: false,
      zIndex: 1, icon: "🔗",
      left: isMobile ? 8 : Math.max(20, vw * 0.46),
      top: isMobile ? 48 : Math.max(32, vh * 0.22),
      width: isMobile ? vw - 16 : Math.min(360, vw * 0.26),
      height: 0,
    },
  ]
}
