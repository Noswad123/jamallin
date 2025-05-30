import type { PersonaName, PersonaUIConfig } from '@/types';
import { Briefcase, Zap, Smile } from 'lucide-react';

export const personasConfig: Record<PersonaName, PersonaUIConfig> = {
  Jamal: {
    name: 'Jamal',
    tagline: 'The Professional',
    description: 'Formal, experienced, and results-oriented. Explore my professional journey and technical expertise.',
    Icon: Briefcase,
    fontVariable: 'var(--font-jamal)',
    welcomeMessagePersona: 'Jamal',
    contact: {
      email: 'jamal.professional@example.com',
      linkedin: 'https://linkedin.com/in/jamal',
      github: 'https://github.com/jamal',
    },
    navIconColor: 'text-blue-500',
  },
  Jamallin: {
    name: 'Jamallin',
    tagline: 'The Creative Spark',
    description: 'Fun, energetic, and always exploring new ideas. Dive into my vibrant projects and creative endeavors.',
    Icon: Zap,
    fontVariable: 'var(--font-jamallin)',
    welcomeMessagePersona: 'Jamallin',
    contact: {
      email: 'jamallin.creative@example.com',
      instagram: 'https://instagram.com/jamallin',
      twitter: 'https://twitter.com/jamallin',
      github: 'https://github.com/jamallin-creative',
    },
    navIconColor: 'text-orange-500',
  },
  'Uncle J': {
    name: 'Uncle J',
    tagline: 'The Friendly Guide',
    description: 'Kid-friendly, avuncular, and full of fun stories. Discover my playful projects and engaging content.',
    Icon: Smile,
    fontVariable: 'var(--font-unclej)',
    welcomeMessagePersona: 'Uncle J',
    contact: {
      email: 'uncle.j.friendly@example.com',
      youtube: 'https://youtube.com/c/unclej',
    },
    navIconColor: 'text-green-500',
  },
};
