
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePersona } from '@/contexts/PersonaContext';
import type { PersonaName } from '@/types';
import { Button } from '@/components/ui/button';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
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
  Plane, // Added for Aviation
  Dumbbell, // Added for Exercise
  Image as ImageIcon,
  BookOpenText,
  PanelLeft,
  PanelRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


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
  { href: '/aviation', label: 'Aviation', icon: Plane },
  { href: '/exercise', label: 'Exercise', icon: Dumbbell },
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
  const { open: isSidebarExpanded, toggleSidebar, state: sidebarState } = useSidebar();

  return (
    <>
      <SidebarHeader className="p-4 border-b">
        <div className={cn("flex items-center", isSidebarExpanded ? "justify-between" : "justify-center")}>
          <Link href="/" className={cn("flex items-center gap-2 overflow-hidden", !isSidebarExpanded && "w-full justify-center")}>
            <personaDetails.Icon className={`shrink-0 ${!isSidebarExpanded ? 'w-7 h-7' : 'w-8 h-8'} ${personaDetails.navIconColor || 'text-primary'}`} />
            {isSidebarExpanded && (
              <div className="flex flex-col min-w-0">
                <h1 className="text-xl font-bold text-foreground truncate">{personaDetails.name}</h1>
                <p className="text-xs text-muted-foreground italic truncate">{personaDetails.tagline}</p>
              </div>
            )}
          </Link>
          {/* Toggle button for desktop, part of the header flow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full h-8 w-8 shrink-0 hidden md:flex" // Only show on desktop
            aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarExpanded ? <PanelLeft className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-4 space-y-2"> {/* SidebarContent handles scrolling */}
        <TooltipProvider delayDuration={0}>
        {currentNavItems.map((item) => {
          const navButton = (
            <Button
              key={item.label}
              asChild
              variant={pathname === item.href ? 'default' : 'ghost'}
              className={cn("w-full justify-start", !isSidebarExpanded && "justify-center")}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarExpanded && item.label}
              </Link>
            </Button>
          );

          if (!isSidebarExpanded) {
            return (
              <Tooltip key={`${item.label}-tooltip`}>
                <TooltipTrigger asChild>{navButton}</TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          return navButton;
        })}
        </TooltipProvider>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t mt-auto">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" className={cn("w-full justify-start", !isSidebarExpanded && "justify-center")}>
                <Link href="/" className="flex items-center gap-3">
                  <Users className="h-5 w-5 shrink-0" />
                  {isSidebarExpanded && "Change Persona"}
                </Link>
              </Button>
            </TooltipTrigger>
            {!isSidebarExpanded && (
              <TooltipContent side="right" align="center">
                <p>Change Persona</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    </>
  );
}
