
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Basketball as BasketballIcon } from 'lucide-react';
import Image from 'next/image';

export default function BasketballPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <BasketballIcon className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Hoops & Highlights</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            Nothing but net! From pick-up games at the local park to following the pros, basketball is a passion.
            The fast pace, teamwork, and thrill of a game-winning shot are what I love about it.
          </p>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Basketball game action"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="basketball court"
            />
          </div>
          <p className="text-muted-foreground">
            Favorite Team: (e.g., Los Angeles Lakers). Favorite Player: (e.g., LeBron James).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
