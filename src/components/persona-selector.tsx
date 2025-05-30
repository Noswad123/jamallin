'use client';

import { useRouter } from 'next/navigation';
import { usePersona } from '@/contexts/PersonaContext';
import { personasConfig } from '@/config/personas';
import type { PersonaName } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function PersonaSelector() {
  const { persona: currentPersona, setPersona } = usePersona();
  const router = useRouter();

  const handleSelectPersona = (selectedPersonaName: PersonaName) => {
    setPersona(selectedPersonaName);
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-secondary">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-foreground">Welcome to My World!</h1>
        <p className="text-xl text-muted-foreground">Choose a persona to explore my work and personality.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {(Object.keys(personasConfig) as PersonaName[]).map((personaName) => {
          const config = personasConfig[personaName];
          const isSelected = currentPersona === personaName;
          return (
            <Card 
              key={personaName} 
              className={`transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${isSelected ? 'ring-2 ring-primary shadow-2xl' : 'shadow-lg'}`}
              data-persona-card={personaName} /* For potential specific styling */
            >
              <CardHeader className="items-center text-center">
                <config.Icon className={`w-16 h-16 mb-4 ${config.navIconColor || 'text-primary'}`} />
                <CardTitle className="text-3xl font-semibold">{config.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground italic mt-1">{config.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground mb-6 min-h-[60px]">{config.description}</p>
                <Button 
                  onClick={() => handleSelectPersona(personaName)} 
                  className="w-full text-lg py-6"
                  variant={isSelected ? "default" : "outline"}
                  aria-label={`Select ${config.name} persona`}
                >
                  {isSelected && <CheckCircle className="mr-2 h-5 w-5" />}
                  Explore as {config.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} PersonaPage. All rights reserved.</p>
        <p>Powered by Next.js and good vibes.</p>
      </footer>
    </div>
  );
}
