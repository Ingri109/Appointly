import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToMenu({ className = '' }: { className?: string }) {
  return (
    <div className={`mb-4 md:hidden ${className}`}>
      <Link href="/" className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-medium">
        <ArrowLeft size={18} />
        <span>Powrót</span>
      </Link>
    </div>
  );
}
