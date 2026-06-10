import { useState } from 'react';
import { X, Send, Mail, Inbox, Trash2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES_STORAGE_KEY = 'eva_contact_messages';

const ContactModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('compose');
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const saveMessage = (message) => {
    const newMessages = [message, ...messages].slice(0, 100);
    setMessages(newMessages);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(newMessages));
  };

  const deleteMessage = (id) => {
    const newMessages = messages.filter(m => m.id !== id);
    setMessages(newMessages);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(newMessages));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulated "local API" endpoint using fetch handler
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {
        // Fallback for when the endpoint doesn't actually exist in the dev server
        // This simulates a successful local storage-based API
        return { ok: true, json: async () => ({ success: true }) };
      });

      const message = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      saveMessage(message);
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setActiveTab('inbox');
      }, 1500);
    } catch (error) {
      console.error('Contact submission failed:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full max-w-lg glass overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-brand-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display tracking-display">Contact EVA</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-brand-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setActiveTab('compose')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'compose'
                    ? 'bg-brand-cyan/20 text-brand-cyan'
                    : 'text-brand-slate hover:text-brand-white'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Compose
              </button>
              <button
                onClick={() => setActiveTab('inbox')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'inbox'
                    ? 'bg-brand-cyan/20 text-brand-cyan'
                    : 'text-brand-slate hover:text-brand-white'
                }`}
              >
                <Inbox className="w-4 h-4 inline mr-2" />
                Inbox ({messages.length})
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[60vh] overflow-auto">
            {activeTab === 'compose' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                    <p className="text-lg font-semibold">Message Sent!</p>
                    <p className="text-brand-slate">Your message has been saved locally.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-slate mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-brand-grey border border-brand-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-slate mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-brand-grey border border-brand-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-slate mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-brand-grey border border-brand-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                        placeholder="What can EVA help you with?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-slate mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-brand-grey border border-brand-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                        placeholder="Tell EVA what's on your mind..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-white/30 border-t-brand-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            ) : (
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <Inbox className="w-12 h-12 text-brand-slate/50 mx-auto mb-4" />
                    <p className="text-brand-slate">No messages yet</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div
                      key={msg.id}
                      className="p-4 bg-brand-grey/50 rounded-lg border border-brand-white/5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{msg.subject}</h4>
                          <p className="text-xs text-brand-slate mt-1">
                            From: {msg.name} ({msg.email})
                          </p>
                          <p className="text-sm text-brand-slate mt-2 line-clamp-2">
                            {msg.message}
                          </p>
                          <p className="text-xs text-brand-slate/50 mt-2">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="p-2 hover:bg-brand-pink/20 rounded-lg transition-colors text-brand-slate hover:text-brand-pink"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-brand-white/10 bg-brand-grey/30">
            <p className="text-xs text-brand-slate text-center">
              Messages are stored locally on your device
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
