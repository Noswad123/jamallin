
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import Image from 'next/image';

export default function FoodPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Utensils className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Culinary Explorations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground">
            A journey for the taste buds! I love exploring new cuisines, trying out recipes, and discovering hidden gem restaurants.
            Whether it's gourmet dining or street food, every meal is an adventure.
          </p>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Delicious food platter"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="gourmet food"
            />
          </div>
          <p className="text-muted-foreground">
            Favorite Cuisine: Italian. Signature Dish: Homemade Pasta.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
