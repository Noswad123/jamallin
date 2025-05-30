import type { Project, Credential } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'AI Powered Portfolio Generator',
    description: 'A Next.js application that dynamically generates portfolio content using AI models, adapting to user-defined personas.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'abstract code',
    liveLink: '#',
    repoLink: '#',
    tags: ['Next.js', 'TypeScript', 'AI', 'Tailwind CSS'],
  },
  {
    id: 'project-2',
    title: 'E-commerce Platform Analytics Dashboard',
    description: 'Developed a real-time analytics dashboard for an e-commerce platform, providing insights into sales, user behavior, and inventory management.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dashboard chart',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'MongoDB', 'Data Visualization'],
  },
  {
    id: 'project-3',
    title: 'Mobile Game: Astro Adventures',
    description: 'A fun and engaging mobile game for kids, built with Unity, featuring educational puzzles and captivating storytelling.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'space game',
    tags: ['Unity', 'C#', 'Game Development', 'Mobile'],
  },
];

export const credentialsData: Credential[] = [
  {
    id: 'work-1',
    type: 'Work Experience',
    title: 'Senior Software Engineer',
    institution: 'Tech Solutions Inc.',
    period: '2020 - Present',
    description: [
      'Led development of key features for flagship product, resulting in a 15% increase in user engagement.',
      'Mentored junior engineers and conducted code reviews to maintain high code quality standards.',
      'Collaborated with cross-functional teams to define project requirements and deliverables.',
    ],
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'office building',
  },
  {
    id: 'work-2',
    type: 'Work Experience',
    title: 'Software Developer',
    institution: 'Innovatech Ltd.',
    period: '2017 - 2020',
    description: [
      'Developed and maintained web applications using modern JavaScript frameworks.',
      'Participated in the full software development lifecycle, from design to deployment.',
      'Contributed to improving application performance and scalability.',
    ],
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'technology logo',
  },
  {
    id: 'edu-1',
    type: 'Education',
    title: 'M.S. in Computer Science',
    institution: 'University of Advanced Technology',
    period: '2015 - 2017',
    description: [
      'Specialized in Artificial Intelligence and Machine Learning.',
      'Thesis: "Novel Approaches to Natural Language Understanding".',
      'GPA: 3.9/4.0',
    ],
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'university campus',
  },
  {
    id: 'edu-2',
    type: 'Education',
    title: 'B.S. in Software Engineering',
    institution: 'State Engineering College',
    period: '2011 - 2015',
    description: [
      'Graduated with Honors.',
      'Capstone Project: "IoT-based Smart Home Automation System".',
      'Active member of the Coding Club and Tech Innovation Forum.',
    ],
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'graduation cap',
  },
];
