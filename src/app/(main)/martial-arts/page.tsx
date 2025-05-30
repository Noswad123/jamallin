
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import Image from 'next/image';

export default function MartialArtsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">The Way of The Warrior</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            Discipline, focus, and respect – these are the pillars of martial arts that I strive to embody.
            Training not only hones the body but also sharpens the mind and builds character.
          </p>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Martial arts training"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="karate kick"
            />
          </div>
          <p className="text-muted-foreground">
            Style: (e.g., Karate, Taekwondo, Judo). Current Belt: (e.g., Black Belt, Brown Belt).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
