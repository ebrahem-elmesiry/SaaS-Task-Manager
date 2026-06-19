import ProjectCard from "@/features/projects/components/ProjectCard";
import { ProjectGridSkeleton } from "@/features/shared/components/loading/ProjectGridSkeleton";

export default async function ProjectComponent({
  isPending,
}: {
  isPending: boolean;
}) {
  if (isPending) return <ProjectGridSkeleton />;
  return <ProjectCard />;
}
