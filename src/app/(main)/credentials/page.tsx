'use client';
import { credentialsData } from '@/config/content';
import type { Credential } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Briefcase, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CredentialsPage() {
  const workExperience = credentialsData.filter(c => c.type === 'Work Experience');
  const education = credentialsData.filter(c => c.type === 'Education');

  const renderCredential = (credential: Credential) => (
    <Card key={credential.id} className="mb-6 shadow-lg animated-element hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-1">{credential.title}</CardTitle>
            <CardDescription className="text-lg text-primary">{credential.institution}</CardDescription>
            <p className="text-sm text-muted-foreground">{credential.period}</p>
          </div>
          {credential.logoUrl && (
            <Image
              src={credential.logoUrl}
              alt={`${credential.institution} logo`}
              width={60}
              height={60}
              className="rounded-md object-contain ml-4"
              data-ai-hint={credential.dataAiHint || 'company logo'}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-1 text-foreground">
          {credential.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-10 h-10 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">Work Experience</h2>
        </div>
        {workExperience.length > 0 ? (
          workExperience.map(renderCredential)
        ) : (
          <p className="text-muted-foreground">No work experience to display yet.</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-10 h-10 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">Education</h2>
        </div>
        {education.length > 0 ? (
          education.map(renderCredential)
        ) : (
          <p className="text-muted-foreground">No education details to display yet.</p>
        )}
      </div>
    </div>
  );
}
