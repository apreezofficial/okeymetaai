import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import BackgroundDots from './components/BackgroundDots';

function App() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="fixed inset-0 -z-50">
        <BackgroundDots />
      </div>
      <div className="relative z-10">
        <Header />
        
        <main className="pt-20">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </div>
  );
}

export default App;
