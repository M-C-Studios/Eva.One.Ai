import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">
          Mentally Creative Studios
        </h1>
        <p className="text-brand-slate max-w-2xl text-lg mb-8">
          A parent ecosystem building AI platforms, software products, creative media, business automation, gaming, and executive intelligence.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="btn-primary">Explore Ecosystem</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </motion.div>

      {/* Placeholder for 3D Ecosystem Map */}
      <div className="mt-20 w-full max-w-4xl h-64 glass flex items-center justify-center">
        <p className="text-brand-slate animate-pulse">3D Ecosystem Map Coming Soon...</p>
      </div>
    </div>
  );
};

export default Home;
