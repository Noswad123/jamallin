export type LayoutType = 'plain' | 'az' | 'top5' | 'top10';

export type SimpleList = {
  slug: string;
  title: string;
  description?: string;
  items: string[];
  layout?: LayoutType;
  note?: string;
  justification?: string; // long-form text
};

export const lists: SimpleList[] = [
  {
    slug: 'best-artists-a-z',
    title: 'Best Artists/Band from A–Z',
    description: 'One favorite (or close enough) for every letter of the alphabet.',
    layout: 'az',
    items: [
      'Amy Winehouse',
      'Boyz II Men',
      'Cool Kids',
      'DMX',
      'Eminem',
      'Frank Ocean',
      'Gym Class Heroes',
      'Hall and Oates',
      'India Arie',
      'J. Cole',
      'Kanye West',
      'Lil Wayne',
      'Michael Jackson',
      'Nas',
      'Outkast',
      'Prince',
      'Queen',
      'Run the Jewels',
      'Stevie Wonder',
      'Tobe Nwigwe',
      'Usher',
      'Vulfpeck',
      'Whitney Houston',
      'Xzibit',
      'Yo-Yo Ma',
      'Z-Ro'
    ],
    note: 'If you disagree, you are wrong.',
    justification: `
    Boyz II Men, Stevie Wonder, and Whitney Houston aren't even debatable
    `
  },

  {
    slug: 'top-5-comedy-shows',
    title: 'Top 5 Comedy Shows',
    description: 'What are the top 5 tv shows guaranteed to make you laugh?',
    layout: 'top5',
    items: [
      "Chapelle Show",
      "Arrested Development",
      'Community',
      "Who's line is it anyways?",
      "The Office",
    ],
    note: 'These shows are hilarious',
    justification: `
      Jason Bateman's brand of comedy is unparalleled, but Dave's creativity is something else.
    `
  }
];
