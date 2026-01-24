import { Composer, Work, Recording } from './types';

const COMMON_WORKS: Work[] = [
  { id: '1', title: 'Nocturne Op. 9 No. 2', edition: 'Henle Edition', year: '1832' },
  { id: '2', title: 'Ballade No. 1', edition: 'Paderewski Edition', year: '1835' },
  { id: '3', title: 'Fantaisie-Impromptu', edition: 'First Edition', year: '1855' },
  { id: '4', title: 'Polonaise in A-flat Major', edition: 'Cortot Edition', year: '1842' },
  { id: '5', title: 'Raindrop Prelude', edition: 'Ekier Edition', year: '1839' },
  { id: '6', title: 'Piano Sonata No. 2', edition: 'Henle Edition', year: '1839' },
  { id: '7', title: 'Etude Op. 10 No. 3', edition: 'Paderewski Edition', year: '1832' },
  { id: '8', title: 'Scherzo No. 2', edition: 'Cortot Edition', year: '1837' },
];

const COMMON_RECORDINGS: Recording[] = [
  { id: 'r1', title: 'Nocturne Op. 9 No. 2', performer: 'Arthur Rubinstein', duration: '4:30', year: '1965' },
  { id: 'r2', title: 'Ballade No. 1', performer: 'Krystian Zimerman', duration: '9:15', year: '1987' },
  { id: 'r3', title: 'Piano Sonata No. 2', performer: 'Martha Argerich', duration: '22:10', year: '1975' },
  { id: 'r4', title: 'Polonaise in A-flat Major', performer: 'Vladimir Horowitz', duration: '6:50', year: '1970' },
];

export const COMPOSERS: Composer[] = [
  {
    id: '1',
    name: 'Ludwig van Beethoven',
    period: 'Classical Period',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg',
    sheetMusicCount: 84,
    recordingCount: 12,
    works: [...COMMON_WORKS],
    recordings: [...COMMON_RECORDINGS]
  },
  {
    id: '2',
    name: 'Wolfgang Amadeus Mozart',
    period: 'Classical Period',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg',
    sheetMusicCount: 62,
    recordingCount: 18,
    works: [...COMMON_WORKS],
    recordings: [...COMMON_RECORDINGS]
  },
  {
    id: '3',
    name: 'Johann Sebastian Bach',
    period: 'Baroque Period',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg',
    sheetMusicCount: 96,
    recordingCount: 24,
    works: [...COMMON_WORKS],
    recordings: [...COMMON_RECORDINGS]
  },
  {
    id: '4',
    name: 'Frédéric Chopin',
    period: 'Romantic Period',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Frederic_Chopin_photo.jpeg',
    sheetMusicCount: 45,
    recordingCount: 8,
    works: [...COMMON_WORKS],
    recordings: [...COMMON_RECORDINGS]
  },
  {
    id: '5',
    name: 'Pyotr Ilyich Tchaikovsky',
    period: 'Romantic Period',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Tchaikovsky_by_Reutlinger.jpg',
    sheetMusicCount: 38,
    recordingCount: 6,
    works: [...COMMON_WORKS],
    recordings: [...COMMON_RECORDINGS]
  },
  {
    id: '6',
    name: 'Claude Debussy',
    period: 'Impressionist Period',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Claude_Debussy_atelier_Nadar.jpg',
    sheetMusicCount: 29,
    recordingCount: 4,
    works: [...COMMON_WORKS],
    recordings: [...COMMON_RECORDINGS]
  }
];

export const PERIODS = [
  { name: 'Early Music', range: '500–1400' },
  { name: 'Renaissance', range: '1400–1600' },
  { name: 'Baroque', range: '1600–1750' },
  { name: 'Classical', range: '1750–1830' },
  { name: 'Romantic', range: '1830–1900' },
  { name: 'Impressionist', range: '1890–1920' },
  { name: 'Modern', range: '1900–Present' },
  { name: 'Contemporary', range: '1945–Present' },
];

export const INSTRUMENTS = [
  'Piano', 'Violin', 'Cello', 'Flute', 'Clarinet', 'Oboe', 'Trumpet', 'Guitar', 'Organ', 'Harp', 'Voice'
];

export const GENRES = [
  'Concerto', 'Sonata', 'Symphony', 'Etude', 'Prelude', 'Suite', 'Opera', 'Chamber Music', 'Ballet', 'Oratorio'
];

export const REGIONS = [
  'Germany', 'Austria', 'France', 'Italy', 'Russia', 'Poland', 'United Kingdom', 'United States', 'Spain', 'Hungary'
];