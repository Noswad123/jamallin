
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Disc3 } from 'lucide-react';
import Image from 'next/image';

export default function DiscGolfPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Disc3 className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Disc Golf Adventures</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            Follow my journey on the disc golf course! From casual rounds with friends to competitive tournaments,
            I love the challenge and camaraderie of this sport. Hyzer flips, anhyzer bombs, and hopefully, lots of birdies!
          </p>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Disc golf action shot"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="disc golf basket"
            />
          </div>
          <p className="text-muted-foreground">
            Favorite Disc: Innova Teebird. Favorite Course: (Insert local favorite or dream course here!).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
