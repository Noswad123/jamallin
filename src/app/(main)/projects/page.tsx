'use client';
import { projectsData } from '@/config/content';
import type { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-3">My Projects</h2>
        <p className="text-lg text-muted-foreground">A showcase of my coding adventures and creations.</p>
      </div>
      {projectsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project: Project) => (
            <Card key={project.id} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 animated-element">
              <div>
                <CardHeader className="p-0">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover aspect-[3/2]"
                    data-ai-hint={project.dataAiHint || 'technology project'}
                  />
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-foreground min-h-[60px]">{project.description}</CardDescription>
                  <div className="mt-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="mr-2 mb-2">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
              <CardFooter className="flex gap-2 pt-4">
                {project.liveLink && (
                  <Button asChild variant="default" className="flex-1">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.repoLink && (
                  <Button asChild variant="outline" className="flex-1">
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-xl">No projects to display yet. Check back soon!</p>
      )}
    </div>
  );
}
