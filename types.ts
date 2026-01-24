import React from 'react';

export interface Work {
  id: string;
  composerId?: string;
  title: string;
  edition: string;
  year: string;
  fileUrl?: string;
}

export interface Recording {
  id: string;
  composerId?: string;
  title: string;
  performer: string;
  duration: string;
  year: string;
}

export interface Composer {
  id: string;
  name: string;
  period: string;
  image: string;
  // NOTE: 这两个字段不存储在数据库中，应动态计算
  sheetMusicCount?: number;
  recordingCount?: number;
  works: Work[];
  recordings: Recording[];
}

export type ViewMode = 'Sheet Music' | 'Recordings';

export interface NavItem {
  id: string;
  label: string;
  icon: React.FC<any>;
  path: string;
}