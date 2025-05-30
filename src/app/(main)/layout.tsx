import { MainSidebar } from '@/components/layout/main-sidebar';
import { MobileHeader } from '@/components/layout/mobile-header';
import React from 'react';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:block md:w-64 fixed h-full">
         <MainSidebar />
      </div>
      <div className="flex flex-1 flex-col md:ml-64">
        <MobileHeader />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
