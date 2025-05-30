'use client';

import { useEffect, useState } from 'react';
import { usePersona } from '@/contexts/PersonaContext';
import { generateWelcomeMessage, GenerateWelcomeMessageInput } from '@/ai/flows/generate-welcome-message';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function WelcomeMessageDisplay() {
  const { persona, getPersonaConfig } = usePersona();
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const personaConfig = getPersonaConfig(persona);

  useEffect(() => {
    async function fetchMessage() {
      if (!personaConfig) return;

      setIsLoading(true);
      setError(null);
      try {
        const input: GenerateWelcomeMessageInput = { persona: personaConfig.welcomeMessagePersona };
        const result = await generateWelcomeMessage(input);
        setWelcomeMessage(result.message);
      } catch (err) {
        console.error('Failed to generate welcome message:', err);
        setError('Oops! I had a little trouble crafting a welcome message. Please try again later.');
        setWelcomeMessage(`Welcome to the ${personaConfig.name} experience! While my AI assistant is taking a break, I'm thrilled to have you here.`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessage();
  }, [persona, personaConfig]);

  return (
    <Card className="shadow-xl animated-element">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className={`w-8 h-8 ${personaConfig.navIconColor || 'text-primary'}`} />
          <CardTitle className="text-3xl font-bold">A Special Welcome!</CardTitle>
        </div>
        <CardDescription>A personalized greeting, just for you, from {personaConfig.name}.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ) : error ? (
           <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{welcomeMessage}</p>
        )}
      </CardContent>
    </Card>
  );
}
