import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Auth from './Auth';



const IMAGES = [
  'https://imgs.search.brave.com/byF8lLX8MK7nQAwfrOMCvhGSBXSk49SJ5lj2QaDd4U4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEzLzM4LzUxLzEy/LzM2MF9GXzEzMzg1/MTEyMjBfbUVvRmxU/TVJPbzVjUG10bVNs/MGNHUjJ6dUU0eWFK/RnUuanBn',
  'https://imgs.search.brave.com/rBbU82xBWkrDpYtDvHESjuzKz5eOFSiT1H3WMnTtf1U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA4/MzEzMTU3L3Bob3Rv/L2luZGlhLWZhcm1p/bmcuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWVJaDVxTHEz/Zm1VSUtmVlZ6ZzFH/Ty1hVTJjVFhDSF82/eWpmMTZ6TVBFSzg9',
  'https://imgs.search.brave.com/4CGkW2DDtKJd7M2TqhFvzoiokMnOZKbbjYH8KNEl4hg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzE5Lzc2LzMz/LzM2MF9GXzkxOTc2/MzM5NF9ibTNBbzJp/VUpaNVNhaEk5RHZY/dnBoQXJnY1l2S0Yw/Ti5qcGc',
  'https://imgs.search.brave.com/g5gaAhAAki_v-Ap4xMU_YXpAeFvc4LyctyD1Gq258KQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMx/NDQ3Mzc1Mi9waG90/by9mYXJtZXItY2Fy/cnlpbmctYnVuY2gt/b2Ytd2hlYXQtY3Jv/cC1vbi1hZ3JpY3Vs/dHVyZS1maWVsZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/bmw0YXBDT1I0eGVu/Ty1pVDZVRmQ3UE9P/SEJzWF9WV24yOTZL/YUZPTXVFaz0'
];

const translations = {
  en: {
    homeTitle: "FarmBridge — Your Crop, Our Support",
    homeDesc: "Weather, market rates, schemes & AI advice in one place.",
    docs: "Essential Documents",
    ai: "AI Advice (Hindi)",
    market: "Market Rates",
    weather: "Weather & Crops",
    schemes: "Govt Schemes",
    docsDesc: "Guides for seeds, fertilizer, insurance & subsidy.",
    aiDesc: "Ask farming questions in Hindi — prices, diseases, tips.",
    marketDesc: "View latest mandi prices and trends."
  },
  hi: {
    homeTitle: "FarmBridge — आपकी फसल, हमारा साथ",
    homeDesc: "Weather, market rates, schemes और AI सलाह एक ही जगह।",
    docs: "ज़रूरी दस्तावेज़",
    ai: "AI सलाह (हिन्दी)",
    market: "बाज़ार दरें",
    weather: "मौसम और फसलें",
    schemes: "सरकारी योजनाएँ",
    docsDesc: "बीज, उर्वरक, बीमा और सब्सिडी से जुड़ी जानकारी।",
    aiDesc: "अपनी खेती के प्रश्न हिंदी में पूछें — बाजार दर, रोग पहचान, युक्तियाँ।",
    marketDesc: "ताज़ा मंडी भाव और ट्रेंड देखें।"
  }
};

function Topbar({ lang, setLang }) {
  const t = translations[lang];
  return (
    <header className="topbar">
      <div className="tb-inner">
        <div className="logo-wrap">
          <div className="logo-badge">FB</div>
          <div>
            <div className="brand">FarmBridge</div>
            <div className="tag">Empowering Indian farmers</div>
          </div>
        </div>
        <nav className="nav">
          <Link to="/">{t.homeTitle}</Link>
          <Link to="/docs">{t.docs}</Link>
          <Link to="/ai">{t.ai}</Link>
          <Link to="/market">{t.market}</Link>
          <Link to="/weather">{t.weather}</Link>
          <Link to="/schemes">{t.schemes}</Link>
        </nav>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
    </header>
  );
}

function Slider({ lang }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const t = translations[lang];

  useEffect(() => {
    timer.current = setInterval(() => setIdx(i => (i + 1) % IMAGES.length), 4500);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <div className="slider">
      {IMAGES.map((src, i) => (
        <img key={i} src={src} alt={`Slide ${i + 1}`} className={i === idx ? 'slide active' : 'slide'} />
      ))}
      <div className="slider-caption">
        <h2>{t.homeTitle}</h2>
        <p>{t.homeDesc}</p>
      </div>
      <div className="dots">
        {IMAGES.map((_, i) => (
          <button key={i} className={`dot ${i === idx ? 'dot-active' : ''}`} onClick={() => setIdx(i)} aria-label={`slide ${i+1}`} />
        ))}
      </div>
    </div>
  );
}

function Card({ title, desc, to }) {
  return (
    <Link className="card" to={to}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}

function Home({ lang }) {
  const t = translations[lang];
  return (
    <main className="main">
      <Slider lang={lang} />
      <section className="cards">
        <Card title={t.docs} desc={t.docsDesc} to="/docs" />
        <Card title={t.ai} desc={t.aiDesc} to="/ai" />
        <Card title={t.market} desc={t.marketDesc} to="/market" />
      </section>
    </main>
  );
}

function Docs({ lang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', en: 'All', hi: 'सभी' },
    { id: 'identity', en: 'Identity Docs', hi: 'पहचान पत्र' },
    { id: 'financial', en: 'Financial & Loans', hi: 'वित्तीय और ऋण' },
    { id: 'agriculture', en: 'Agriculture Support', hi: 'कृषि सहायता' },
    { id: 'land', en: 'Land & Legal', hi: 'भूमि और कानूनी' },
    { id: 'insurance', en: 'Insurance', hi: 'बीमा' },
  ];

  const allDocuments = [
    {
      id: 1,
      category: 'identity',
      icon: '🪪',
      title_en: 'Aadhaar Card', title_hi: 'आधार कार्ड',
      desc_en: 'The most important identity proof for all government schemes and subsidies.', desc_hi: 'सभी सरकारी योजनाओं और सब्सिडी के लिए सबसे महत्वपूर्ण पहचान पत्र।',
      link: 'https://uidai.gov.in/',
      downloadLink: '#',
      isPopular: true
    },
    {
      id: 2,
      category: 'financial',
      icon: '💳',
      title_en: 'Kisan Credit Card (KCC)', title_hi: 'किसान क्रेडिट कार्ड (KCC)',
      desc_en: 'To help farmers access affordable short-term agricultural loans.', desc_hi: 'किसानों को रियायती दरों पर अल्पकालिक कृषि ऋण प्राप्त करने के लिए।',
      link: 'https://www.myscheme.gov.in/schemes/kcc',
      downloadLink: '#',
      isPopular: true
    },
    {
      id: 3,
      category: 'agriculture',
      icon: '🌱',
      title_en: 'Soil Health Card', title_hi: 'मृदा स्वास्थ्य कार्ड',
      desc_en: 'Soil test report providing fertilizer and crop recommendations.', desc_hi: 'मिट्टी की जांच रिपोर्ट जो उर्वरक और फसल अनुशंसाएं प्रदान करती है।',
      link: 'https://soilhealth.dac.gov.in/',
      downloadLink: '#',
      isPopular: false
    },
    {
      id: 4,
      category: 'land',
      icon: '📜',
      title_en: 'Land Record (Khasra/Khatauni)', title_hi: 'भूमि प्रमाणपत्र (खसरा/खतौनी)',
      desc_en: 'Proof of land ownership mandated for various agricultural benefits.', desc_hi: 'जमीन के मालिकाना हक का प्रमाण जो कई योजनाओं में अनिवार्य है।',
      link: 'https://dilrmp.gov.in/',
      downloadLink: '#',
      isPopular: true
    },
    {
      id: 5,
      category: 'insurance',
      icon: '🛡️',
      title_en: 'Crop Insurance Policy', title_hi: 'फसल बीमा पॉलिसी',
      desc_en: 'Financial protection against crop loss due to natural calamities (PMFBY).', desc_hi: 'प्राकृतिक आपदाओं से फसल नुकसान पर वित्तीय सुरक्षा (PMFBY)।',
      link: 'https://pmfby.gov.in/',
      downloadLink: '#',
      isPopular: false
    },
    {
      id: 6,
      category: 'financial',
      icon: '🏦',
      title_en: 'Bank Passbook', title_hi: 'बैंक पासबुक',
      desc_en: 'Required for receiving Direct Benefit Transfers (DBT) like PM-KISAN.', desc_hi: 'PM-KISAN और अन्य सब्सिडी सीधे बैंक खाते में प्राप्त करने के लिए अनिवार्य।',
      link: 'https://pmkisan.gov.in/',
      downloadLink: '#',
      isPopular: false
    }
  ];

  const filteredDocs = allDocuments.filter(doc => {
    const matchesSearch = doc.title_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.title_hi.includes(searchQuery) || 
                          doc.desc_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.desc_hi.includes(searchQuery);
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page docs-page-wrapper">
      <section className="docs-hero">
        <h2>{lang === 'hi' ? 'ज़रूरी दस्तावेज़' : 'Essential Documents'}</h2>
        <p>{lang === 'hi' ? 'खेती, सरकारी योजनाओं और वित्तीय सहायता के लिए महत्वपूर्ण दस्तावेज़ प्राप्त करें' : 'Access important documents for farming, government schemes, and financial support'}</p>
        
        <div className="docs-search">
          <input 
            type="text" 
            placeholder={lang === 'hi' ? 'दस्तावेज़ खोजें (जैसे KCC, आधार, बीमा...)' : 'Search documents (e.g., KCC, Aadhaar, Insurance...)'} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <div className="docs-filters">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`docs-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {lang === 'hi' ? cat.hi : cat.en}
          </button>
        ))}
      </div>

      {filteredDocs.length > 0 ? (
        <div className="docs-grid">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="doc-card">
              {doc.isPopular && <span className="doc-popular-badge">{lang === 'hi' ? 'सर्वाधिक उपयोगी' : 'Most Used'}</span>}
              <div className="doc-icon">{doc.icon}</div>
              <h3>{lang === 'hi' ? doc.title_hi : doc.title_en}</h3>
              <p>{lang === 'hi' ? doc.desc_hi : doc.desc_en}</p>
              <div className="doc-actions">
                <a href={doc.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  {lang === 'hi' ? 'अधिक जानकारी' : 'Learn More'}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="docs-empty">
          <p>{lang === 'hi' ? 'कोई दस्तावेज़ नहीं मिला' : 'No documents found'}</p>
        </div>
      )}
    </div>
  );
}

function AIChat({ lang }) {
  const t = translations[lang];
  return (
    <div className="page ai-chat">
      <h2>{t.ai}</h2>
      <p>{t.aiDesc}</p>
      <div className="iframe-container" style={{ width: "100%", height: "100%", minHeight: "700px" , backgroundColor: "lightgreen"}}>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/va7JJHg-ZM6HihOUZq-j0"
          width="100%"
          style={{ height: "100%", minHeight: "700px", border: "none" , backgroundColor: "lightgreen"}}
          frameBorder="0"
          title="AI Chatbot"
        ></iframe>
      </div>
    </div>
  );
}


  


function Market({ lang }) {
  const t = translations[lang];
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [userState, setUserState] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // newest, asc, desc
  
  // List of states
  const availableStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir"
  ];

  const fetchMarketData = async (stateStr, districtStr, queryStr, sort = sortOrder) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (stateStr) params.append('state', stateStr);
      if (districtStr) params.append('district', districtStr);
      if (queryStr) params.append('commodity', queryStr);
      if (sort !== 'newest') params.append('sortPrice', sort);

      const response = await fetch(`http://localhost:5000/api/mandi-prices?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch market data");
      const data = await response.json();
      
      if (data.success) {
        setMarketData(data.data || []);
      } else {
        throw new Error(data.message || "Error fetching data");
      }
    } catch (err) {
      console.error(err);
      setError(lang === 'hi' ? "डेटा लोड करने में विफल।" : "Failed to load market data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData(userState, userDistrict, searchQuery, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, userDistrict, sortOrder]); 

  const handleSearch = () => {
    fetchMarketData(userState, userDistrict, searchQuery, sortOrder);
  };

  const handleRefresh = () => {
    fetchMarketData(userState, userDistrict, searchQuery, sortOrder);
  };

  const autoDetectLocation = async () => {
    setLoading(true);
    try {
      const resp = await fetch('https://ipapi.co/json/');
      const data = await resp.json();
      if (data && data.region) {
        let detectedState = data.region;
        setUserState(detectedState);
        setUserDistrict(data.city || '');
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error("Auto detect failed:", error);
      alert(lang === 'hi' ? "स्थान का पता नहीं चला।" : "Could not detect location automatically.");
      setLoading(false);
    }
  };

  // Find best market nearby if any search is active
  const bestMarket = marketData.length > 0 ? marketData.reduce((prev, current) => {
    return (prev.modalPrice > current.modalPrice) ? prev : current;
  }) : null;

  return (
    <div className="page market-page">
      <div className="market-header">
        <h2 className="market-title">{t.market}</h2>
        <p className="market-desc">{t.marketDesc}</p>
      </div>

      <div className="market-controls">
        <div className="location-bar">
          <button className="btn-auto-detect" onClick={autoDetectLocation}>
            📍 {lang === 'hi' ? "स्थान खोजें" : "Auto-detect"}
          </button>
          
          <select value={userState} onChange={(e) => setUserState(e.target.value)} className="market-select">
            <option value="">{lang === 'hi' ? "-- राज्य (State) --" : "-- Select State --"}</option>
            {availableStates.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
          
          <input 
            type="text" 
            placeholder={lang === 'hi' ? "ज़िला (District)" : "District"} 
            value={userDistrict}
            onChange={(e) => setUserDistrict(e.target.value)}
            className="market-input"
          />

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="market-select">
            <option value="newest">{lang === 'hi' ? "नवीनतम" : "Newest Price"}</option>
            <option value="desc">{lang === 'hi' ? "उच्चतम मूल्य" : "Highest Price"}</option>
            <option value="asc">{lang === 'hi' ? "न्यूनतम मूल्य" : "Lowest Price"}</option>
          </select>

          <button className="btn-refresh" onClick={handleRefresh}>
            🔄
          </button>
        </div>

        <div className="search-bar" style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder={lang === "hi" ? "फसल खोजें (जैसे Wheat)..." : "Search crop (e.g., Wheat)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn-search" onClick={handleSearch} style={{ padding: '10px 20px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            🔍 {lang === 'hi' ? "खोजें" : "Search"}
          </button>
        </div>
      </div>

      {bestMarket && !loading && (
        <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #2e7d32' }}>
          <strong>🏅 {lang === 'hi' ? 'सर्वश्रेष्ठ बाज़ार:' : 'Best Market Nearby:'}</strong> {bestMarket.market}, {bestMarket.district} - 
          <span style={{ color: '#2e7d32', fontWeight: 'bold', marginLeft: '8px' }}>₹{bestMarket.modalPrice} / Quintal</span> for {bestMarket.commodity}
        </div>
      )}

      {error && <div className="market-error">{error}</div>}

      {loading ? (
        <div className="market-loading">
          <div className="spinner"></div>
          <p>{lang === 'hi' ? "भाव ढूँढ रहे हैं..." : "Loading live rates from data.gov.in..."}</p>
        </div>
      ) : marketData.length > 0 ? (
        <div className="market-grid">
          {marketData.map((item, idx) => {
            // Mock a trend based on prices
            const isHigh = item.modalPrice > (item.minPrice + item.maxPrice) / 2;
            const trendText = isHigh ? '↑ High' : '→ Stable';
            const trendClass = isHigh ? 'trend-high' : 'trend-stable';

            return (
              <div key={item._id || idx} className="market-card">
                <div className="mc-header">
                  <h3>{item.commodity}</h3>
                  <span className={`mc-trend ${trendClass}`}>
                    {trendText}
                  </span>
                </div>
                <div className="mc-location">
                  <span className="icon">📍</span> {item.market}, {item.district}, {item.state}
                </div>
                <div className="mc-prices">
                  <div className="price-box">
                    <span className="label">Min</span>
                    <span className="value">₹{item.minPrice || '--'}</span>
                  </div>
                  <div className="price-box highlight">
                    <span className="label">Modal (Avg)</span>
                    <span className="value">₹{item.modalPrice || '--'}</span>
                  </div>
                  <div className="price-box">
                    <span className="label">Max</span>
                    <span className="value">₹{item.maxPrice || '--'}</span>
                  </div>
                </div>
                <div className="mc-footer">
                  <small>Updated: {new Date(item.arrivalDate || item.timestamp).toLocaleDateString()}</small>
                  <small>Per Quintal</small>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="market-empty">
          <p>{lang === 'hi' ? "आपके क्षेत्र के लिए कोई भाव उपलब्ध नहीं।" : "No market rates found. Ensure the background sync is running."}</p>
          <a href="https://agmarknet.gov.in/home" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '12px', padding: '8px 16px', background: '#effaf3', color: '#2e7d32', borderRadius: '6px', fontWeight: 600, textDecoration: 'none', border: '1px solid #2e7d32' }}>
            {lang === 'hi' ? "आधिकारिक Agmarknet पोर्टल पर जाँच करें ↗" : "Check official Agmarknet portal ↗"}
          </a>
        </div>
      )}
    </div>
  );
}

// Crop data with ideal weather thresholds

const CROPS = [
  { name: 'Wheat', hindi: 'गेहूँ', minTemp: 5, maxTemp: 25, minRain: 30, maxRain: 100, idealHarvestHumidity: 100 },
  { name: 'Rice', hindi: 'चावल', minTemp: 20, maxTemp: 35, minRain: 100, maxRain: 500, idealHarvestHumidity: 100 },
  { name: 'Maize', hindi: 'मक्का', minTemp: 18, maxTemp: 30, minRain: 50, maxRain: 300, idealHarvestHumidity: 65 },
  { name: 'Cotton', hindi: 'कपास', minTemp: 20, maxTemp: 35, minRain: 50, maxRain: 200, idealHarvestHumidity: 60 },
  { name: 'Sugarcane', hindi: 'गन्ना', minTemp: 20, maxTemp: 35, minRain: 75, maxRain: 400, idealHarvestHumidity: 70 },
  { name: 'Barley', hindi: 'जौ', minTemp: 0, maxTemp: 25, minRain: 30, maxRain: 100, idealHarvestHumidity: 60 },
  { name: 'Sorghum', hindi: 'ज्वार', minTemp: 20, maxTemp: 35, minRain: 40, maxRain: 200, idealHarvestHumidity: 55 },
  { name: 'Millet', hindi: 'बाजरा', minTemp: 20, maxTemp: 35, minRain: 25, maxRain: 200, idealHarvestHumidity: 50 },
  { name: 'Gram', hindi: 'चना', minTemp: 10, maxTemp: 30, minRain: 30, maxRain: 100, idealHarvestHumidity: 60 },
  { name: 'Lentil', hindi: 'मसूर', minTemp: 10, maxTemp: 28, minRain: 40, maxRain: 120, idealHarvestHumidity: 60 },
  { name: 'Pulses', hindi: 'दालें', minTemp: 15, maxTemp: 30, minRain: 40, maxRain: 150, idealHarvestHumidity: 65 },
  { name: 'Soybean', hindi: 'सोयाबीन', minTemp: 20, maxTemp: 32, minRain: 50, maxRain: 250, idealHarvestHumidity: 70 },
  { name: 'Groundnut', hindi: 'मूंगफली', minTemp: 20, maxTemp: 30, minRain: 60, maxRain: 300, idealHarvestHumidity: 70 },
  { name: 'Potato', hindi: 'आलू', minTemp: 10, maxTemp: 25, minRain: 50, maxRain: 200, idealHarvestHumidity: 80 },
  { name: 'Tomato', hindi: 'टमाटर', minTemp: 15, maxTemp: 30, minRain: 50, maxRain: 150, idealHarvestHumidity: 70 },
  { name: 'Onion', hindi: 'प्याज', minTemp: 10, maxTemp: 28, minRain: 40, maxRain: 120, idealHarvestHumidity: 65 },
  { name: 'Okra', hindi: 'भिन्डी', minTemp: 20, maxTemp: 35, minRain: 50, maxRain: 200, idealHarvestHumidity: 70 },
  { name: 'Brinjal', hindi: 'बैंगन', minTemp: 20, maxTemp: 32, minRain: 50, maxRain: 200, idealHarvestHumidity: 75 },
  { name: 'Cabbage', hindi: 'पत्ता गोभी', minTemp: 10, maxTemp: 25, minRain: 50, maxRain: 150, idealHarvestHumidity: 85 },
  { name: 'Cauliflower', hindi: 'फूलगोभी', minTemp: 10, maxTemp: 25, minRain: 50, maxRain: 150, idealHarvestHumidity: 85 },
  { name: 'Peas', hindi: 'मटर', minTemp: 10, maxTemp: 25, minRain: 60, maxRain: 200, idealHarvestHumidity: 75 },
  { name: 'Mustard', hindi: 'सरसों', minTemp: 5, maxTemp: 25, minRain: 30, maxRain: 100, idealHarvestHumidity: 60 },
  { name: 'Sunflower', hindi: 'सनफ्लावर', minTemp: 20, maxTemp: 32, minRain: 50, maxRain: 200, idealHarvestHumidity: 65 }
];


// Example translations object
const sampleTranslations = {
  en: {
    weatherTitle: "Weather & Crop Suggestion",
    enterCity: "Enter city name",
    suggestion: "Suggested Crops based on today's weather:",
    noSuggestion: "No crops match today’s weather well."
  },
  hi: {
    weatherTitle: "मौसम और फसल सुझाव",
    enterCity: "शहर का नाम दर्ज करें",
    suggestion: "आज के मौसम के अनुसार सुझावित फसलें:",
    noSuggestion: "आज के मौसम में कोई उचित फसल नहीं मिली।"
  }
};

function WeatherCrop({ lang }) {
  const t = sampleTranslations[lang];
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "6f942fb5337e646ce9bce228884815a9"; 

  const fetchWeatherAndSuggest = async () => {
    if (!city) {
      setError(lang === "hi" ? "शहर नाम आवश्यक है।" : "City name is required.");
      return;
    }
    setError("");
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );
      if (!resp.ok) throw new Error("Weather fetch failed");
      const data = await resp.json();
      // extract needed weather info
      const temp = data.main.temp; // in Celsius
      const humidity = data.main.humidity;
      const rainfall = (data.weather[0].main === "Rain") ? 10 : 0; 
      // Note: For real rainfall hours, use detailed forecast endpoints

      setWeather({ temp, humidity, rainfall, desc: data.weather[0].description });

      // Suggest crops whose thresholds match
      const matches = CROPS.filter(crop =>
        temp >= crop.minTemp &&
        temp <= crop.maxTemp &&
        humidity <= crop.idealHarvestHumidity + 10 && // allow small leeway
        // rainfall between crop.minRain- some margin
        rainfall >= crop.minRain * 0.2 && // some fraction
        rainfall <= crop.maxRain + 20
      );
      setSuggested(matches);
    } catch (err) {
      console.error(err);
      setError(lang === "hi" ? "मौसम डेटा लाने में त्रुटि।" : "Error fetching weather data.");
    }
  };

  return (
    <div className="page">
      <h2>{t.weatherTitle}</h2>
      <div className="weather-input">
        <input
          type="text"
          placeholder={t.enterCity}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherAndSuggest}>
          {lang === "hi" ? "दर्ज करें" : "Submit"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <p>{lang === "hi" ? "तापमान" : "Temperature"}: {weather.temp}°C</p>
          <p>{lang === "hi" ? "आद्रता" : "Humidity"}: {weather.humidity}%</p>
          <p>{lang === "hi" ? "मौसम" : "Conditions"}: {weather.desc}</p>
        </div>
      )}

      {weather && (
        <div className="crop-suggestions">
          <h3>{t.suggestion}</h3>
          {suggested.length > 0 ? (
            <ul>
              {suggested.map((c, idx) => (
                <li key={idx}>{c.name} ({c.hindi})</li>
              ))}
            </ul>
          ) : (
            <p>{t.noSuggestion}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Schemes({ lang }) {
  const t = translations[lang];

  // Comprehensive scheme data with heavily reliable local images
  const schemes = [
    {
      name: lang === "hi" ? "पीएम किसान सम्मान निधि" : "PM Kisan Samman Nidhi",
      desc: lang === "hi"
        ? "किसानों को प्रति वर्ष ₹6000 की सीधी वित्तीय सहायता प्रदान करता है।"
        : "Provides direct financial assistance of ₹6000 per year to farmers.",
      link: "https://pmkisan.gov.in/",
      image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=600&auto=format&fit=crop" 
    },
    {
      name: lang === "hi" ? "प्रधानमंत्री फसल बीमा योजना" : "Pradhan Mantri Fasal Bima Yojana",
      desc: lang === "hi"
        ? "प्राकृतिक आपदाओं से फसलों के नुकसान पर न्यूनतम प्रीमियम पर बीमा कवरेज उपलब्ध कराता है।"
        : "Offers comprehensive insurance coverage against crop losses at a very low premium.",
      link: "https://pmfby.gov.in/",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: lang === "hi" ? "मृदा स्वास्थ्य कार्ड (SHC)" : "Soil Health Card (SHC)",
      desc: lang === "hi"
        ? "मिट्टी की उर्वरता की जांच कर सही खाद और बीज का सुझाव देता है।"
        : "Provides an assessment of soil health to optimize fertilizer use and crop yields.",
      link: "https://soilhealth.dac.gov.in/",
      image: "/soil.jpg"
    },
    {
      name: lang === "hi" ? "किसान क्रेडिट कार्ड (KCC)" : "Kisan Credit Card (KCC)",
      desc: lang === "hi"
        ? "आसान ब्याज दरों पर अल्पकालिक कृषि ऋण उपलब्ध कराता है।"
        : "Provides adequate and timely credit support via short-term loans for agriculture.",
      link: "https://www.myscheme.gov.in/schemes/kcc",
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: lang === "hi" ? "राष्ट्रीय कृषि बाज़ार (e-NAM)" : "National Agriculture Market (e-NAM)",
      desc: lang === "hi"
        ? "किसानों को अपनी उपज देशभर की मंडियों में ऑनलाइन बेचने की सुविधा देता है।"
        : "A pan-India electronic trading portal uniting existing APMC mandis.",
      link: "https://www.enam.gov.in/web/",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: lang === "hi" ? "प्रधानमंत्री कृषि सिंचाई योजना" : "PM Krishi Sinchayee Yojana",
      desc: lang === "hi"
        ? "'हर खेत को पानी' के लक्ष्य के साथ बेहतर सिंचाई और जल संरक्षण को बढ़ावा।"
        : "Focuses on 'Har Khet Ko Pani' to improve farm water-use efficiency.",
      link: "https://pmksy.gov.in/",
      image: "/water.jpg"
    }
  ];

  return (
    <div className="page schemes-page">
      <h2 className="schemes-title">{t.schemes}</h2>
      <p className="schemes-desc">
        {lang === "hi"
          ? "भारत सरकार द्वारा किसानों के आर्थिक और तकनीकी विकास के लिए महत्वपूर्ण योजनाएँ।"
          : "Key government initiatives for the financial and technical development of Indian farmers."}
      </p>

      <div className="schemes-container">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="scheme-card">
            {scheme.image && (
              <div className="scheme-image-wrap">
                <img src={scheme.image} alt={scheme.name} />
              </div>
            )}
            <div className="scheme-content">
              <h3>{scheme.name}</h3>
              <p>{scheme.desc}</p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="scheme-link"
              >
                {lang === "hi" ? "अधिक जानकारी" : "Learn More"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} FarmBridge — Empowering Indian farmers</div>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = useState('hi');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Topbar lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/docs" element={<Docs lang={lang} />} />
        <Route path="/ai" element={<AIChat lang={lang} />} />
        <Route path="/market" element={<Market lang={lang} />} />
        <Route path="/weather" element={<WeatherCrop lang={lang} />} />
        <Route path="/schemes" element={<Schemes lang={lang} />} />
      </Routes>
      <Footer />
    </Router>
  );
}
