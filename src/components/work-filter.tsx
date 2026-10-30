"use client";
import { useState } from "react";
import { projects } from "@/content/projects";
import { ProjectGrid } from "./ui";
export function WorkFilter() {
  const [filter, setFilter] = useState("All");
  const selected =
    filter === "All" ? projects : projects.filter((p) => p.filter === filter);
  return (
    <>
      <div className="filter-bar" aria-label="Filter projects">
        {["All", "SaaS", "AI platforms", "Automation"].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
            {f === "All" && <span>03</span>}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {selected.length} {selected.length === 1 ? "project" : "projects"} shown
      </p>
      <ProjectGrid selected={selected} />
    </>
  );
}
