'use client';
import { PersonaSelector } from '@/components/persona-selector';

export default function PersonaSelectorPage() {
  // This outer component ensures PersonaProvider is available for PersonaSelector
  return <PersonaSelector />;
}
