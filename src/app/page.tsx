'use client';
import { PersonaSelector } from '@/components/persona-selector';

export default function PersonaSelectorPage() {
  // This outer component ensures PersonaProvider is available for PersonaSelector
  // if PersonaSelector itself calls usePersona, which it does.
  return <PersonaSelector />;
}
