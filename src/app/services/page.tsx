"use client";

import { motion } from "framer-motion";
import { FaStethoscope, FaUserMd, FaVials, FaVideo, FaFileMedical } from "react-icons/fa";

const services = [
  {
    icon: <FaStethoscope className="text-3xl text-[#8B7355]" />,
    title: "General Consultation",
    description: "Access experienced general physicians for routine checkups, health advice, and preventive care.",
  },
  {
    icon: <FaUserMd className="text-3xl text-[#8B7355]" />,
    title: "Specialist Care",
    description: "Book appointments with top specialists across various fields for expert diagnosis and treatment.",
  },
  {
    icon: <FaVials className="text-3xl text-[#8B7355]" />,
    title: "Lab Tests",
    description: "Schedule lab tests and receive results digitally, all from the comfort of your home.",
  },
  {
    icon: <FaVideo className="text-3xl text-[#8B7355]" />,
    title: "Telemedicine",
    description: "Consult with doctors online via secure video calls, ensuring safe and convenient healthcare.",
  },
  {
    icon: <FaFileMedical className="text-3xl text-[#8B7355]" />,
    title: "Health Records",
    description: "Manage and access your health records securely, anytime and anywhere.",
  },
];

export default function ServicesPage() {
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
          Our <span className="text-[#8B7355] font-medium">Services</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-xl text-[#666] max-w-2xl mx-auto"
        >
          MediSync offers a comprehensive suite of healthcare services designed to make your experience seamless, accessible, and personalized.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border border-[#8B7355]/10 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#8B7355] mb-2">{service.title}</h3>
                <p className="text-[#4A4A4A]">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 