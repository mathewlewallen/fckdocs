import type { getPosts } from "@fck/lib/once-ui/utils/utils";
import { Column } from "@fck/lib/once-ui/ui/components";
import { ProjectCard } from "@fck/lib/once-ui/ui/components";

type ProjectData = ReturnType<typeof getPosts>[0];

interface ProjectsProps {
  range?: [number, number?];
  allProjects: ProjectData[];
}

export function Projects({ range, allProjects }: ProjectsProps) {
  const projectsToDisplay = range ? allProjects.slice(range[0] - 1, range[1]) : allProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {projectsToDisplay.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
