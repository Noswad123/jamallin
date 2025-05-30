'use client';

import type { PersonaName } from '@/types';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { personasConfig } from '@/config/personas';

interface PersonaContextType {
  persona: PersonaName;
  setPersona: (persona: PersonaName) => void;
  getPersonaConfig: (personaName?: PersonaName) => typeof personasConfig[PersonaName];
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [persona, setPersonaState] = useState<PersonaName>('Jamal'); // Default persona
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedPersona = localStorage.getItem('selectedPersona') as PersonaName | null;
    if (storedPersona && personasConfig[storedPersona]) {
      setPersonaState(storedPersona);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute('data-persona', persona);
      localStorage.setItem('selectedPersona', persona);
      // Apply font class to body
      document.body.className = ''; // Clear previous font classes
      document.body.classList.add(personasConfig[persona].fontVariable.replace('var(--font-', '').replace(')', ''));
    }
  }, [persona, isMounted]);
  
  const setPersona = useCallback((newPersona: PersonaName) => {
    if (personasConfig[newPersona]) {
      setPersonaState(newPersona);
    }
  }, []);

  const getPersonaConfig = useCallback((personaName: PersonaName = persona) => {
    return personasConfig[personaName];
  }, [persona]);
  
  if (!isMounted) {
    // Avoid rendering children until client-side hydration is complete
    // and persona is potentially loaded from localStorage
    return null; 
  }

  return (
    <PersonaContext.Provider value={{ persona, setPersona, getPersonaConfig }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = (): PersonaContextType => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};
