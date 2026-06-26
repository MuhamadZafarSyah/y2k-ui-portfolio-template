"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { PROJECTS, FILTER_TABS } from "@/data/projects"
import type { Project } from "@/data/projects"

interface ProjectsWindowProps {
  onSelectProject: (project: Project) => void
}

export function ProjectsWindow({ onSelectProject }: ProjectsWindowProps) {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = activeTab === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.some((t) => t.toLowerCase().includes(activeTab)))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-[#1b1b3a] pb-2">
        <div className="flex gap-1.5 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
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
        <Badge variant="mint" className="font-bold text-[9px]">{filtered.length} File(s)</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
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
  )
}
