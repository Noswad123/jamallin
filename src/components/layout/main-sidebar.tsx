
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePersona } from '@/contexts/PersonaContext';
import type { PersonaName } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Award,
  Lightbulb,
  Mail,
  Users,
  Disc3,
  Dice5,
  Utensils,
  Martini,
  Shield,
  Dribbble as BasketballIcon, // Renamed to avoid conflict with component name & using Dribbble as placeholder
  Image as ImageIcon, // Renamed to avoid conflict
  BookOpenText,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const baseNavItems: NavItem[] = [
  { href: '/dashboard', label: 'About', icon: LayoutDashboard },
];

const jamalNavItems: NavItem[] = [
  ...baseNavItems,
  { href: '/credentials', label: 'Credentials', icon: Award },
  { href: '/projects', label: 'Projects', icon: Lightbulb },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const jamallinNavItems: NavItem[] = [
  ...baseNavItems,
  { href: '/disc-golf', label: 'Disc Golf', icon: Disc3 },
  { href: '/board-games', label: 'Board Games', icon: Dice5 },
  { href: '/food', label: 'Food', icon: Utensils },
  { href: '/mixology', label: 'Mixology', icon: Martini },
  { href: '/martial-arts', label: 'Martial Arts', icon: Shield },
  { href: '/basketball', label: 'Basketball', icon: BasketballIcon },
];

const uncleJNavItems: NavItem[] = [
  ...baseNavItems,
  { href: '/photo-gallery', label: 'Photo Gallery', icon: ImageIcon },
  { href: '/lessons', label: 'Lessons', icon: BookOpenText },
];

const getNavItemsForPersona = (persona: PersonaName): NavItem[] => {
  switch (persona) {
    case 'Jamal':
      return jamalNavItems;
    case 'Jamallin':
      return jamallinNavItems;
    case 'Uncle J':
      return uncleJNavItems;
    default:
      return baseNavItems;
  }
};

export function MainSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { persona, getPersonaConfig } = usePersona();
  const personaDetails = getPersonaConfig(persona);
  const currentNavItems = getNavItemsForPersona(persona);

  return (
    <aside className={cn("h-full border-r flex flex-col bg-card", className)}>
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <personaDetails.Icon className={`w-8 h-8 ${personaDetails.navIconColor || 'text-primary'}`} />
          <h1 className="text-2xl font-bold text-foreground">{personaDetails.name}</h1>
        </Link>
        <p className="text-xs text-muted-foreground italic mt-1">{personaDetails.tagline}</p>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {currentNavItems.map((item) => (
            <Button
              key={item.label}
              asChild
              variant={pathname === item.href ? 'default' : 'ghost'}
              className="w-full justify-start"
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/" className="flex items-center gap-3">
            <Users className="h-5 w-5" />
            Change Persona
          </Link>
        </Button>
      </div>
    </aside>
  );
}
