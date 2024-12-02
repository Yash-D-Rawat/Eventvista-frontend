import React from 'react';
import { Users, Target, Calendar, School, Award } from 'lucide-react';
import { motion } from 'framer-motion';

function AboutPage() {
  const teamMembers = [
    { name: "Jheel Parikh", role: "Frontend Developer", imgUrl: "/images/jheel.jpeg" },
    { name: "Soham Parekh", role: "Backend Developer", imgUrl: "/images/soham.jpeg"},
    { name: "Yash Rawat", role: "Full Stack Developer", imgUrl: "/images/yashrawat.png"},
    { name: "Shravani Nikam", role: "Database Administraitor", imgUrl: "/images/shravani.jpeg" },
    { name: "Mitali Parulekar", role: "Community Manager", imgUrl: "/images/mitali.jpeg"}
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="bg-teal-600 text-white py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About EventVista</h1>
          <p className="text-lg leading-relaxed">
            EventVista is your premier platform for discovering and engaging with collegiate events across the nation. 
            We bridge the gap between event organizers and participants, making it easier than ever to explore 
            hackathons, case studies, cultural festivals, and e-sports competitions. Our platform empowers colleges 
            to showcase their events while enabling students to discover and participate in enriching experiences 
            that align with their interests.
          </p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="py-16 px-4 bg-teal-50"
        {...fadeIn}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <Calendar className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Event Discovery</h3>
            <p className="text-gray-600">Find exciting events happening across colleges</p>
          </div>
          <div className="text-center p-6">
            <School className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">College Connect</h3>
            <p className="text-gray-600">Connect with institutions nationwide</p>
          </div>
          <div className="text-center p-6">
            <Award className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
            <p className="text-gray-600">Seamless event registration process</p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Filtering</h3>
            <p className="text-gray-600">Filter events as per your liking</p>
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section 
        className="py-16 px-4"
        {...fadeIn}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Target className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-8">Our Vision & Mission</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-6 bg-teal-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become the leading platform that connects college events with passionate participants, 
                  fostering a vibrant community of learning and collaboration across educational institutions.
                </p>
              </div>
              <div className="p-6 bg-teal-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To simplify event discovery and participation while empowering colleges to showcase their 
                  initiatives, creating meaningful opportunities for student engagement and growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-16 px-4 bg-teal-50"
        {...fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative group">
                  <img 
                    src={member.imgUrl}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto mb-4 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;