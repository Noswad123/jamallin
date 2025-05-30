import type { LucideIcon } from 'lucide-react';

export type PersonaName = 'Jamal' | 'Jamallin' | 'Uncle J';

export interface PersonaUIConfig {
  name: PersonaName;
  tagline: string;
  description: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>; // Allow Lucide or custom SVGs
  fontVariable: string; // CSS variable for the font
  welcomeMessagePersona: 'Jamal' | 'Jamallin' | 'Uncle J'; // For AI flow
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  navIconColor?: string; // Optional: specific color for nav icons if needed
}

export interface Project {
  id: string;
  title:string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
  liveLink?: string;
  repoLink?: string;
  tags: string[];
}

export interface Credential {
  id: string;
  type: 'Work Experience' | 'Education';
  title: string;
  institution: string;
  period: string;
  description: string[];
  logoUrl?: string;
  dataAiHint?: string;
}
