import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToMenu({ className = '' }: { className?: string }) {
  return (
    <div className={`mb-6 md:hidden ${className}`}>
      <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 text-sm">
        <ArrowLeft size={18} />
        <span>Back to menu</span>
      </Link>
    </div>
  );
}
