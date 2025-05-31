
'use client';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/layout/main-sidebar';
import { MobileHeader } from '@/components/layout/mobile-header';
import React from 'react';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen"> {/* SidebarProvider wraps content in a flex container */}
        <Sidebar collapsible="icon" className="hidden md:flex md:flex-col h-full fixed bg-card"> {/* Desktop sidebar */}
          <MainSidebar />
        </Sidebar>
        <div className="flex flex-1 flex-col md:overflow-y-auto"> {/* Container for MobileHeader and main content area */}
          <MobileHeader /> {/* Handles mobile navigation via Sheet */}
          <SidebarInset> {/* Adjusts margin based on desktop Sidebar state */}
            <main className="flex-1 p-4 md:p-8 bg-background">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
