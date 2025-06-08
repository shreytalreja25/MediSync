'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: "Shrey Talreja",
    role: "Co-Founder & Lead Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shrey",
    description: "A passionate full-stack developer with a keen eye for design and user experience. Shrey brings innovative solutions to healthcare technology, focusing on creating seamless and intuitive interfaces. With expertise in modern web technologies and a deep understanding of healthcare systems, he leads the technical vision of MediSync.",
    skills: ["Full-Stack Development", "UI/UX Design", "System Architecture", "Healthcare Technology"],
    animeCharacter: "https://api.dicebear.com/7.x/bottts/svg?seed=Shrey&backgroundColor=8B7355"
  },
  {
    name: "Sahil Gupta",
    role: "Co-Founder & Product Strategist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil",
    description: "A visionary product strategist with a background in healthcare innovation. Sahil combines his technical expertise with a deep understanding of healthcare needs to create impactful solutions. His strategic thinking and leadership have been instrumental in shaping MediSync's mission to revolutionize healthcare accessibility.",
    skills: ["Product Strategy", "Healthcare Innovation", "Business Development", "User Research"],
    animeCharacter: "https://api.dicebear.com/7.x/bottts/svg?seed=Sahil&backgroundColor=8B7355"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light text-[#4A4A4A] mb-6">
              About <span className="text-[#8B7355] font-medium">MediSync</span>
            </h1>
            <p className="text-xl text-[#666] max-w-3xl mx-auto">
              We're on a mission to transform healthcare accessibility through innovative technology and human-centered design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-[#666] max-w-2xl mx-auto">
              The passionate individuals behind MediSync's vision to revolutionize healthcare.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#F5F5F0] rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <Image
                        src={member.animeCharacter}
                        alt={`${member.name}'s anime character`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-medium text-[#4A4A4A] mb-2">{member.name}</h3>
                  <p className="text-[#8B7355] font-medium mb-4">{member.role}</p>
                  <p className="text-[#666] mb-6">{member.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-[#8B7355]/10 text-[#8B7355] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-[#666] mb-8">
              At MediSync, we believe that quality healthcare should be accessible to everyone. 
              We're building the future of healthcare technology, one innovation at a time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "Pushing the boundaries of healthcare technology"
                },
                {
                  title: "Accessibility",
                  description: "Making healthcare available to everyone, everywhere"
                },
                {
                  title: "Quality",
                  description: "Delivering excellence in every aspect of our service"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-xl shadow-sm"
                >
                  <h3 className="text-xl font-medium text-[#4A4A4A] mb-2">{value.title}</h3>
                  <p className="text-[#666]">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 