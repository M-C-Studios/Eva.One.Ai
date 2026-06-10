import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Pillars from '../components/sections/Pillars';
import Vision from '../components/sections/Vision';
import UpdateLog from '../components/sections/UpdateLog';
import DashboardPreview from '../components/sections/DashboardPreview';
import SynergyVisualization from '../components/sections/SynergyVisualization';

const Home = ({ onContactOpen }) => {
  return (
    <div className="min-h-screen bg-brand-void text-brand-white font-body overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Pillars />
        <SynergyVisualization />
        <DashboardPreview />
        <Vision />
        <UpdateLog />
      </main>
      <Footer onContactOpen={onContactOpen} />
    </div>
  );
};

export default Home;
