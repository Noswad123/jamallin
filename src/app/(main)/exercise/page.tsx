
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell } from 'lucide-react';
import Image from 'next/image';

export default function ExercisePage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Dumbbell className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Fitness & Wellness</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            Staying active is key! I enjoy a variety of physical activities to keep both body and mind sharp.
            This includes hitting the court for some basketball, practicing martial arts for discipline, and finding balance with yoga.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <Image
                src="https://placehold.co/300x200.png"
                alt="Basketball action"
                width={300}
                height={200}
                className="rounded-lg shadow-md mb-2"
                data-ai-hint="basketball hoop"
              />
              <p className="font-semibold text-center">Basketball</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="https://placehold.co/300x200.png"
                alt="Martial arts pose"
                width={300}
                height={200}
                className="rounded-lg shadow-md mb-2"
                data-ai-hint="karate silhouette"
              />
              <p className="font-semibold text-center">Martial Arts</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="https://placehold.co/300x200.png"
                alt="Yoga pose"
                width={300}
                height={200}
                className="rounded-lg shadow-md mb-2"
                data-ai-hint="yoga nature"
              />
              <p className="font-semibold text-center">Yoga</p>
            </div>
          </div>
          <p className="text-muted-foreground pt-4">
            Favorite Workout: A good mix of cardio and strength training.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
