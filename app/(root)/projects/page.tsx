import { ProjectProvider } from "@/context/ProjectContext";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { ProjectGridSkeleton } from "@/features/shared/components/loading/ProjectGridSkeleton";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { projectCard } from "@/types/project";
// import { Suspense } from "react";
// import { ProjectGridSkeleton } from "@/app/components/shared/loading/ProjectGridSkeleton";
// import { useQuery } from "@tanstack/react-query";

const projects: projectCard[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    progress: 75,
    status: "At Risk",
    startDate: "2026-03-01",
    endDate: "2026-04-30",
    team: [
      { id: "1", name: "Sarah", avatar: "SC" },
      { id: "2", name: "Mike", avatar: "MJ" },
      { id: "3", name: "Emily", avatar: "ED" },
    ],
    tasks: { total: 24, completed: 18 },
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android native apps",
    progress: 45,
    status: "In Progress",
    startDate: "2026-04-01",
    endDate: "2026-05-15",
    team: [
      { id: "4", name: "James", avatar: "JW" },
      { id: "5", name: "Lisa", avatar: "LA" },
    ],
    tasks: { total: 32, completed: 14 },
  },
  {
    id: "3",
    name: "API Integration",
    description: "Third-party service integrations",
    progress: 90,
    status: "In Progress",
    startDate: "2026-03-15",
    endDate: "2026-04-20",
    team: [
      { id: "6", name: "David", avatar: "DB" },
      { id: "7", name: "Anna", avatar: "AT" },
      { id: "8", name: "Chris", avatar: "CM" },
      { id: "9", name: "Nina", avatar: "NP" },
    ],
    tasks: { total: 15, completed: 14 },
  },
  {
    id: "4",
    name: "Database Migration",
    description: "PostgreSQL to MongoDB migration",
    progress: 30,
    status: "At Risk",
    startDate: "2026-03-10",
    endDate: "2026-04-25",
    team: [
      { id: "10", name: "Robert", avatar: "RK" },
      { id: "11", name: "Sophie", avatar: "SM" },
    ],
    tasks: { total: 18, completed: 5 },
  },
  {
    id: "5",
    name: "Marketing Campaign",
    description: "Q2 product launch campaign",
    progress: 60,
    status: "In Progress",
    startDate: "2026-03-20",
    endDate: "2026-05-01",
    team: [
      { id: "12", name: "Tom", avatar: "TH" },
      { id: "13", name: "Julia", avatar: "JR" },
      { id: "14", name: "Mark", avatar: "MS" },
    ],
    tasks: { total: 20, completed: 12 },
  },
  {
    id: "6",
    name: "Security Audit",
    description: "Comprehensive security review",
    progress: 100,
    status: "Completed",
    startDate: "2026-05-01",
    endDate: "2026-06-10",
    team: [{ id: "15", name: "Kevin", avatar: "KL" }],
    tasks: { total: 25, completed: 25 },
  },
];

export default async function Page() {
  // const projects = await fetchProjects();
  // const {
  //   data: projects,
  //   isPending,
  //   error,
  // } = useQuery({
  //   queryKey: ["projects"],
  //   queryFn: fetchProjects,
  // });
  const isPending = false;

  return (
    <ProjectProvider initialProjects={projects}>
      <div className="space-y-6">
        <PageHeader
          title="Projects"
          description="Manage and track all your projects"
          action="project"
        />
        {isPending ? <ProjectGridSkeleton /> : <ProjectCard />}
      </div>
    </ProjectProvider>
  );
}
