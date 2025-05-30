'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePersona } from '@/contexts/PersonaContext';
import { personasConfig } from '@/config/personas';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Award,
  Lightbulb,
  Mail,
  Users,
  HomeIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/credentials', label: 'Credentials', icon: Award },
  { href: '/projects', label: 'Projects', icon: Lightbulb },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function MainSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { persona, getPersonaConfig } = usePersona();
  const personaDetails = getPersonaConfig(persona);

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
          {navItems.map((item) => (
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
