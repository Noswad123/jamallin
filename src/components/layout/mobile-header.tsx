'use client';

import Link from 'next/link';
import { usePersona } from '@/contexts/PersonaContext';
import { personasConfig } from '@/config/personas';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Users, LayoutDashboard, Award, Lightbulb, Mail } from 'lucide-react';
import { MainSidebar } from './main-sidebar'; // Re-use sidebar content in sheet

export function MobileHeader() {
  const { persona, getPersonaConfig } = usePersona();
  const personaDetails = getPersonaConfig(persona);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-background md:hidden">
      <Link href="/dashboard" className="flex items-center gap-2">
        <personaDetails.Icon className={`w-7 h-7 ${personaDetails.navIconColor || 'text-primary'}`} />
        <span className="text-xl font-bold text-foreground">{personaDetails.name}</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px]">
          {/* Use a simplified version or the full sidebar content */}
          <MainSidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
}
