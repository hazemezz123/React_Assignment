import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Sample team members
  const teamMembers = [
    {
      name: "Jane Smith",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      bio: "Jane has over 15 years of experience in e-commerce and retail management.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Michael leads our technology team with expertise in building scalable platforms.",
    },
    {
      name: "Elena Rodriguez",
      role: "Design Director",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Elena ensures our products are showcased with the highest visual standards.",
    },
    {
      name: "David Kim",
      role: "Head of Customer Experience",
      image: "https://randomuser.me/api/portraits/men/91.jpg",
      bio: "David is dedicated to creating exceptional shopping experiences for our customers.",
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah J.",
      comment:
        "I love the clean interface and how easy it is to find exactly what I'm looking for. The wishlist feature is a game-changer!",
      rating: 5,
    },
    {
      name: "Robert T.",
      comment:
        "The product quality is excellent, and the shipping was faster than expected. Will definitely shop here again.",
      rating: 5,
    },
    {
      name: "Aisha M.",
      comment:
        "Customer service was amazing when I needed to exchange a product. The whole process was smooth and hassle-free.",
      rating: 4,
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} ${
        isDarkMode ? "text-white" : "text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Hero Section */}
      <motion.section
        className={`relative py-20 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={`text-4xl md:text-5xl font-bold mb-6 text-gradient bg-clip-text text-transparent ${
              isDarkMode
                ? "bg-gradient-to-r from-indigo-400 to-purple-600"
                : "bg-gradient-to-r from-indigo-600 to-purple-800"
            }`}
            variants={itemVariants}
          >
            About FakeStore
          </motion.h1>
          <motion.p
            className={`text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto`}
            variants={itemVariants}
          >
            We're on a mission to provide high-quality products at affordable
            prices with exceptional customer service.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Our Story */}
      <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className={`text-3xl font-bold mb-6 ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.h2>
              <motion.p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-4`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Founded in 2015, FakeStore began with a simple idea: create an
                online shopping experience that customers would truly enjoy. We
                wanted to build more than just another e-commerce site; we
                wanted to build a community around quality products and
                exceptional service.
              </motion.p>
              <motion.p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-4`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                What started as a small operation has grown into a trusted
                marketplace offering a curated selection of products across
                multiple categories. We personally test and review each product
                before it's featured on our platform to ensure it meets our
                quality standards.
              </motion.p>
              <motion.p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                Our team is dedicated to making your shopping experience as
                seamless and enjoyable as possible. From easy navigation to
                secure checkout and reliable shipping, we've got you covered
                every step of the way.
              </motion.p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } p-2 rounded-xl shadow-xl`}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Team working"
                  className="rounded-lg h-full w-full object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </div>
              <motion.div
                className={`absolute -bottom-6 -right-6 ${
                  isDarkMode ? "bg-indigo-600" : "bg-indigo-500"
                } text-white p-4 rounded-lg shadow-xl`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
                viewport={{ once: true }}
              >
                <p className="text-xl font-bold">
                  Trusted by 10,000+ Customers
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            className={`text-3xl font-bold mb-12 text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <motion.div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } p-6 rounded-xl shadow-lg`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div
                className={`w-16 h-16 ${
                  isDarkMode ? "bg-indigo-600/20" : "bg-indigo-500/10"
                } rounded-full flex items-center justify-center mb-6`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Quality First
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                We never compromise on quality. Every product on our platform is
                rigorously tested and evaluated before being offered to our
                customers.
              </p>
            </motion.div>
            <motion.div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } p-6 rounded-xl shadow-lg`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div
                className={`w-16 h-16 ${
                  isDarkMode ? "bg-indigo-600/20" : "bg-indigo-500/10"
                } rounded-full flex items-center justify-center mb-6`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Customer-Centric
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Our customers are at the heart of everything we do. We
                continuously improve our services based on feedback and strive
                to exceed expectations.
              </p>
            </motion.div>
            <motion.div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } p-6 rounded-xl shadow-lg`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div
                className={`w-16 h-16 ${
                  isDarkMode ? "bg-indigo-600/20" : "bg-indigo-500/10"
                } rounded-full flex items-center justify-center mb-6`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Transparency
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                We believe in being open and honest about our products, pricing,
                and policies. What you see is what you get—no hidden fees or
                surprises.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            className={`text-3xl font-bold mb-12 text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:translate-y-[-8px] border ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: isDarkMode
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.5)"
                    : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-52 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
                <div className="p-5">
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    } mb-3`}
                  >
                    {member.role}
                  </p>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm`}
                  >
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={`py-16 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-gray-50 to-indigo-50"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className={`text-3xl font-bold mb-12 text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } p-6 rounded-xl shadow-lg border ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : isDarkMode
                          ? "text-gray-600"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4 italic`}
                >
                  "{testimonial.comment}"
                </p>
                <p
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } font-semibold`}
                >
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover our curated
            collection of quality products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-3 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/cart"
              className="px-8 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
