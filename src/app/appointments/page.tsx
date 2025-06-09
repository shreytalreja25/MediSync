"use client";

import { motion } from "framer-motion";
import { FaCalendarCheck, FaUser, FaClock } from "react-icons/fa";

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] pt-20">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-light text-[#4A4A4A] mb-4"
        >
          Book an <span className="text-[#8B7355] font-medium">Appointment</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-xl text-[#666] max-w-2xl mx-auto"
        >
          Schedule your next visit with ease. Fill out the form below to book an appointment with our healthcare professionals.
        </motion.p>
      </section>

      {/* Appointment Card */}
      <section className="py-8">
        <div className="container mx-auto px-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow p-8 w-full max-w-lg border border-[#8B7355]/10 flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaCalendarCheck className="text-3xl text-[#8B7355]" />
              <h2 className="text-2xl font-semibold text-[#8B7355]">Appointment Form</h2>
            </div>
            <form className="w-full flex flex-col gap-4">
              <div>
                <label className="block text-[#8B7355] font-medium mb-1" htmlFor="name">Your Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A67B5B]" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="pl-10 pr-4 py-2 rounded-lg border border-[#8B7355]/30 bg-white text-[#4A4A4A] w-full focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#8B7355] font-medium mb-1" htmlFor="date">Preferred Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="px-4 py-2 rounded-lg border border-[#8B7355]/30 bg-white text-[#4A4A4A] w-full focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40"
                  required
                />
              </div>
              <div>
                <label className="block text-[#8B7355] font-medium mb-1" htmlFor="time">Preferred Time</label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A67B5B]" />
                  <input
                    id="time"
                    name="time"
                    type="time"
                    className="pl-10 pr-4 py-2 rounded-lg border border-[#8B7355]/30 bg-white text-[#4A4A4A] w-full focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#8B7355] hover:bg-[#A67B5B] text-white font-semibold rounded-lg px-4 py-2 transition-colors w-full shadow mt-2"
              >
                Book Appointment
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 