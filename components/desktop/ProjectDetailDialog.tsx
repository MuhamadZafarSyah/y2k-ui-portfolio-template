"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Project } from "@/data/projects"

interface ProjectDetailDialogProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailDialog({ project, onClose }: ProjectDetailDialogProps) {
  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        title={project ? `file_viewer.exe - ${project.title}` : "viewer.exe"}
        className="sm:max-w-md border-2 border-[#1b1b3a] rounded-lg overflow-hidden bg-[#d7dde8]"
      >
        {project && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#1b1b3a]">{project.title}</h3>
              <div className="flex gap-1.5">
                {project.tags.map((t) => (
                  <span key={t} className="rounded border border-[#1b1b3a] bg-[#ffe45e] px-1.5 py-px text-[9px] font-bold text-[#1b1b3a]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#1b1b3a]/90 leading-relaxed font-medium">
              {project.longDescription}
            </p>

            <div className="flex gap-3 pt-3 border-t border-[#1b1b3a]/15">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="lemon" className="w-full text-xs h-8">
                    <ExternalLink className="size-3.5 mr-1" />
                    Live Demo
                  </Button>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
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
  )
}
