
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image as ImageIcon } from 'lucide-react'; // Aliased to avoid conflict
import Image from 'next/image'; // Next.js Image component

export default function PhotoGalleryPage() {
  const galleryImages = [
    { id: 1, src: 'https://placehold.co/600x400.png', alt: 'Scenic landscape', hint: 'landscape mountain' },
    { id: 2, src: 'https://placehold.co/600x400.png', alt: 'Family gathering', hint: 'family picnic' },
    { id: 3, src: 'https://placehold.co/600x400.png', alt: 'Funny pet moment', hint: 'cute cat' },
    { id: 4, src: 'https://placehold.co/600x400.png', alt: 'Travel adventure', hint: 'city skyline' },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Uncle J's Photo Album</CardTitle>
          </div>
          <CardDescription>A collection of cherished memories and fun snapshots!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img) => (
              <div key={img.id} className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto aspect-[3/2]"
                  data-ai-hint={img.hint}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
