
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Martini } from 'lucide-react';
import Image from 'next/image';

export default function MixologyPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Martini className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">The Art of Mixology</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            Shaken, stirred, or muddled – welcome to my home bar! I enjoy crafting classic cocktails and experimenting with new concoctions.
            It's all about balancing flavors and creating the perfect sip.
          </p>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Colorful cocktails"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="cocktail bar"
            />
          </div>
          <p className="text-muted-foreground">
            Go-to Cocktail: Old Fashioned. Currently Experimenting With: Homemade bitters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
