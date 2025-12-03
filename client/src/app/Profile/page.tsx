import Header from '@/components/Header';
import Footer from '@/components/Footer';
// Using plain elements to avoid missing UI imports
import { redirect } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit2, Camera, Heart, Clock } from 'lucide-react';

export default function ProfilePage() {
  redirect('/Account');
}
