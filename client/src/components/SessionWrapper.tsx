'use client';

import { ReactNode } from 'react';

// This component is kept for backwards compatibility
// We no longer use NextAuth session, instead we use localStorage for auth state
export function SessionWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
