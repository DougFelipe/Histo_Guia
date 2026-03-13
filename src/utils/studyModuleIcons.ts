import {
  BookOpen,
  Brain,
  Clock,
  Layers,
  Microscope,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { StudyModuleIconKey } from '../types';

export const STUDY_MODULE_ICONS: Record<StudyModuleIconKey, LucideIcon> = {
  brain: Brain,
  microscope: Microscope,
  layers: Layers,
  zap: Zap,
  clock: Clock,
  'book-open': BookOpen,
};

