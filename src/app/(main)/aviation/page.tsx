
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane } from 'lucide-react';
import Image from 'next/image';

export default function AviationPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Plane className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Up in the Clouds</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            From small Cessnas to jumbo jets, I'm fascinated by everything that flies.
            The freedom of the skies and the marvel of engineering make aviation a true passion.
          </p>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Airplane in flight"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="airplane sky"
            />
          </div>
          <p className="text-muted-foreground">
            Dream Aircraft: Cirrus SR22. Favorite Aviation Movie: Top Gun.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
