import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import ContactModal from './components/ContactModal';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onContactOpen={() => setIsContactOpen(true)} />} />
      </Routes>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </Router>
  );
}

export default App;
