
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenText } from 'lucide-react';

const lessons = [
  { 
    id: '1', 
    title: 'The Value of Kindness', 
    content: "Always remember, a little bit of kindness goes a long way. It doesn't cost anything, but it can make someone's entire day brighter. Be the reason someone smiles today!" 
  },
  { 
    id: '2', 
    title: 'Listen More Than You Speak', 
    content: "You have two ears and one mouth for a reason. Listening carefully to others shows respect and helps you understand the world much better. You might learn something amazing!" 
  },
  { 
    id: '3', 
    title: 'Mistakes are Stepping Stones', 
    content: "Don't be afraid to make mistakes! They are not failures, but opportunities to learn and grow. Every expert was once a beginner who wasn't afraid to try." 
  },
  { 
    id: '4', 
    title: 'The Power of Curiosity', 
    content: "Stay curious, little explorer! Ask questions, seek answers, and never stop wondering about the world around you. Curiosity is the engine of discovery." 
  },
  {
    id: '5',
    title: 'Sharing Makes Things Sweeter',
    content: "Whether it's your favorite toy or a yummy cookie, sharing with others makes the experience even better. It's a wonderful way to make friends and spread happiness."
  }
];

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg animated-element">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <BookOpenText className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Uncle J's Words of Wisdom</CardTitle>
          </div>
          <CardDescription>A few thoughts and lessons I've picked up along the way, just for you!</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {lessons.map((lesson, index) => (
              <AccordionItem value={`item-${lesson.id}`} key={lesson.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                  <span className="text-left">Lesson {index + 1}: {lesson.title}</span>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 text-base text-foreground">
                  {lesson.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
