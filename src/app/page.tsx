'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Earthy color palette
const colors = {
  primary: '#8B7355',    // Warm brown
  secondary: '#A67B5B',  // Light brown
  accent: '#D2B48C',     // Tan
  background: '#F5F5F0', // Off-white
  text: '#4A4A4A',       // Dark gray
  highlight: '#C4A484'   // Warm beige
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-light text-[#4A4A4A] mb-6">
              Welcome to{' '}
              <span className="text-[#8B7355] font-medium">MediSync</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#666] mb-12 max-w-2xl mx-auto">
              Your trusted partner in healthcare, bringing modern solutions with a personal touch.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/appointments"
                  className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-full hover:bg-[#A67B5B] transition-colors duration-300"
                >
                  Book Appointment
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/services"
                  className="inline-block px-8 py-3 bg-transparent border-2 border-[#8B7355] text-[#8B7355] rounded-full hover:bg-[#8B7355] hover:text-white transition-colors duration-300"
                >
                  Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F5F5F0] to-transparent"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-4">
              Why Choose MediSync?
            </h2>
            <p className="text-[#666] max-w-2xl mx-auto">
              Experience healthcare reimagined with our innovative approach and personalized care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "24/7 Care",
                description: "Round-the-clock medical assistance and support whenever you need it.",
                icon: "🕒"
              },
              {
                title: "Expert Doctors",
                description: "Access to highly qualified and experienced healthcare professionals.",
                icon: "👨‍⚕️"
              },
              {
                title: "Easy Booking",
                description: "Simple and quick appointment scheduling at your convenience.",
                icon: "📅"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-lg bg-[#F5F5F0] hover:bg-[#E8E8E0] transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-[#4A4A4A] mb-2">{feature.title}</h3>
                <p className="text-[#666]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-4">
              What Our Patients Say
            </h2>
            <p className="text-[#666] max-w-2xl mx-auto">
              Hear from our satisfied patients about their experience with MediSync.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "MediSync has transformed my healthcare experience. The ease of booking appointments and the quality of care is exceptional.",
                author: "Sarah Johnson",
                role: "Patient"
              },
              {
                quote: "The doctors are incredibly knowledgeable and caring. I feel confident in the care I receive.",
                author: "Michael Chen",
                role: "Patient"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-lg shadow-sm"
              >
                <p className="text-[#666] italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-[#4A4A4A]">{testimonial.author}</p>
                  <p className="text-sm text-[#8B7355]">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-6">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-[#666] mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust MediSync for their healthcare needs.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-full hover:bg-[#A67B5B] transition-colors duration-300"
              >
                Get Started Today
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 