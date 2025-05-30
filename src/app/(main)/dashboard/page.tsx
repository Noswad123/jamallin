'use client';
import { WelcomeMessageDisplay } from '@/components/welcome-message-display';
import { usePersona } from '@/contexts/PersonaContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function DashboardPage() {
  const { getPersonaConfig } = usePersona();
  const personaConfig = getPersonaConfig();

  return (
    <div className="space-y-8">
      <WelcomeMessageDisplay />
      
      <Card className="animated-element">
        <CardHeader>
          <CardTitle className="text-2xl">About {personaConfig.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-muted-foreground text-lg mb-4">
              {personaConfig.description}
            </p>
            <p className="text-foreground">
              This is the central hub for the {personaConfig.name} persona. From here, you can navigate to different sections
              to learn more about my work, skills, and how to get in touch. Each persona offers a unique perspective,
              so feel free to switch between them to see all sides of what I do!
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Image 
              src={`https://placehold.co/400x300.png?text=${personaConfig.name}`}
              alt={`${personaConfig.name} illustration`}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
              data-ai-hint={personaConfig.name === 'Jamal' ? 'professional office' : personaConfig.name === 'Jamallin' ? 'abstract art' : 'friendly robot'}
            />
          </div>
        </CardContent>
      </Card>
      
      {personaConfig.name === 'Uncle J' && (
         <Card className="bg-primary/10 border-primary/30 animated-element bouncy">
            <CardHeader>
                <CardTitle className="text-xl text-primary-foreground">Uncle J's Fun Fact!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-primary-foreground">Did you know? The first computer programmer was Ada Lovelace, an English mathematician, way back in the 1840s! Isn't that cool? Keep learning and exploring!</p>
            </CardContent>
        </Card>
      )}
       {personaConfig.name === 'Jamallin' && (
         <Card className="bg-accent/20 border-accent/40 animated-element">
            <CardHeader>
                <CardTitle className="text-xl text-accent-foreground">Jamallin's Creative Prompt!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-accent-foreground">Quick! Think of a new feature for your favorite app. How would it work? What problem would it solve? Let your imagination run wild!</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
