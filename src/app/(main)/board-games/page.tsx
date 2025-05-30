
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dice5 } from 'lucide-react';
import Image from 'next/image';

export default function BoardGamesPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Dice5 className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Board Game Nights & Strategy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            Gather 'round the table! I'm a huge fan of board games, from complex strategy euros to lighthearted party games.
            There's nothing like the thrill of a well-played move or a shared laugh over a quirky game mechanic.
          </p>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Board game setup"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="board game pieces"
            />
          </div>
          <p className="text-muted-foreground">
            Currently Playing: Wingspan, Terraforming Mars. All-time Favorite: Scythe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
