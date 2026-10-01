import { useState, useCallback, useMemo } from 'react';

export type ResumeSectionKey =
  | 'personalInfo'
  | 'contacts'
  | 'experience'
  | 'skills'
  | 'education'
  | 'about';

interface UseResumeSectionsResult {
  editing: Record<ResumeSectionKey, boolean>;
  startEditing: (key: ResumeSectionKey) => void;
  stopEditing: (key: ResumeSectionKey) => void;
  stopAll: () => void;
}

const INITIAL: Record<ResumeSectionKey, boolean> = {
  personalInfo: false,
  contacts: false,
  experience: false,
  skills: false,
  education: false,
  about: false,
};

export const useResumeSections = (): UseResumeSectionsResult => {
  const [editing, setEditing] = useState(INITIAL);

  const startEditing = useCallback((key: ResumeSectionKey) => {
    setEditing((prev) => ({ ...prev, [key]: true }));
  }, []);

  const stopEditing = useCallback((key: ResumeSectionKey) => {
    setEditing((prev) => ({ ...prev, [key]: false }));
  }, []);

  const stopAll = useCallback(() => setEditing(INITIAL), []);

  return useMemo(
    () => ({ editing, startEditing, stopEditing, stopAll }),
    [editing, startEditing, stopEditing, stopAll],
  );
};