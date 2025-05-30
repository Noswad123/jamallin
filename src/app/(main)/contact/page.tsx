'use client';
import { usePersona } from '@/contexts/PersonaContext';
import { personasConfig } from '@/config/personas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Twitter, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';

const iconMap = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

export default function ContactPage() {
  const { persona, getPersonaConfig } = usePersona();
  const personaConfig = getPersonaConfig(persona);
  const contactLinks = personaConfig.contact;

  const getLinkName = (key: string) => {
    if (key === 'email') return `Email ${personaConfig.name}`;
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  const getLinkHref = (key: string, value: string) => {
    if (key === 'email') return `mailto:${value}`;
    return value;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card className="shadow-xl animated-element">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <personaConfig.Icon className={`w-16 h-16 ${personaConfig.navIconColor || 'text-primary'}`} />
          </div>
          <CardTitle className="text-4xl font-bold">Get in Touch with {personaConfig.name}</CardTitle>
          <CardDescription className="text-lg mt-2">
            {personaConfig.name === 'Jamal' && "I'm available for professional inquiries and collaborations. Let's discuss how we can work together."}
            {personaConfig.name === 'Jamallin' && "Got a fun idea or just want to chat? Reach out! I'm always up for something exciting."}
            {personaConfig.name === 'Uncle J' && "Hello there, friend! If you have a question or want to share a cool story, this is the place."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(contactLinks).map(([key, value]) => {
            if (!value) return null;
            const IconComponent = iconMap[key as keyof typeof iconMap];
            return (
              <Button
                key={key}
                asChild
                variant="outline"
                className="w-full text-lg py-6 justify-start group hover:bg-accent hover:text-accent-foreground"
                size="lg"
              >
                <a href={getLinkHref(key, value)} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  {IconComponent && <IconComponent className="mr-4 h-6 w-6 text-primary group-hover:text-accent-foreground" />}
                  <span>{getLinkName(key)}</span>
                  <Mail className="ml-auto h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>
            );
          })}
          {Object.keys(contactLinks).length === 0 && (
            <p className="text-center text-muted-foreground">
              {personaConfig.name} hasn't set up direct contact links yet.
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card className="mt-8 animated-element">
        <CardHeader>
          <CardTitle>A Visual Note from {personaConfig.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
           <Image 
              src={`https://placehold.co/500x250.png?text=Connect+with+${personaConfig.name}`}
              alt={`Visual for ${personaConfig.name} contact`}
              width={500}
              height={250}
              className="rounded-lg shadow-md"
              data-ai-hint={personaConfig.name === 'Jamal' ? 'business handshake' : personaConfig.name === 'Jamallin' ? 'social media icons' : 'friendly wave'}
            />
        </CardContent>
      </Card>
    </div>
  );
}
