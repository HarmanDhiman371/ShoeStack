import React, { useEffect, useState, useRef } from 'react';
import '../styles/Body.css';
import ShoeCustomizer from '../components/ShoeCustomizer';

const Body = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgColor, setBgColor] = useState('#1a1a2e');
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Top selling shoes data with associated colors
  const topShoes = [
    {
      id: 1,
      name: "Nike Air Max 2090",
      price: "$149.99",
      image: "/images/max-1.png",
      colors: ['#6a11cb', '#2575fc'],
      features: ["Flyknit construction", "Max Air cushioning", "Lightweight"]
    },
    {
      id: 2,
      name: "Adidas Ultraboost 21",
      price: "$179.99",
      image: "/images/adid-1.png",
      colors: ['#11998e', '#38ef7d'],
      features: ["Primeknit+ upper", "Boost midsole", "Torsion System"]
    },
    {
      id: 3,
      name: "Puma Future Rider",
      price: "$89.99",
      image: "/images/puma-1.png",
      colors: ['#ff416c', '#ff4b2b'],
      features: ["Rider foam", "Rubber outsole", "Vintage design"]
    },
    {
      id: 4,
      name: "New Balance 990v5",
      price: "$174.99",
      image: "/images/shoe-transparent-4.png",
      colors: ['#0f2027', '#2c5364'],
      features: ["ENCAP midsole", "Pigskin lining", "Made in USA"]
    }
  ];

  // Handle slide change
  const changeSlide = (index) => {
    clearInterval(intervalRef.current);
    setCurrentSlide(index);
    setBgColor(topShoes[index].colors[0]);
    
    // Auto-rotate after manual change
    startAutoRotation();
  };

  // Start auto rotation
  const startAutoRotation = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % topShoes.length);
      setBgColor(topShoes[(currentSlide + 1) % topShoes.length].colors[0]);
    }, 5000);
  };

  // Initialize effects
  useEffect(() => {
    const shoeContainer = document.querySelector('.shoe-container');
    const hero = document.querySelector('.hero');

    const handleMouseMove = (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      shoeContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };

    const handleMouseLeave = () => {
      shoeContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    // Particles effect
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 5 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `-${size}px`;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      particlesContainer.appendChild(particle);
    }

    // Intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hero-content, .shoe-image, .top-selling-title, .shoe-slider, .shoe-features').forEach(el => observer.observe(el));

    // Start auto rotation for slider
    startAutoRotation();

    return () => {
      clearInterval(intervalRef.current);
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Update background color on slide change
  useEffect(() => {
    const gradient = `linear-gradient(135deg, ${topShoes[currentSlide].colors[0]} 0%, ${topShoes[currentSlide].colors[1]} 100%)`;
    document.querySelector('.shoe-slider-container').style.background = gradient;
  }, [currentSlide]);

  return (
    <>
      <div className="bg-wrapper">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
        <div className="bg-noise"></div>
      </div>

      <section className="hero">
        <div className="particles" id="particles"></div>
        <div className="hero-content">
          <h1 className="hero-title">STEP INTO <span>THE FUTURE</span></h1>
          <p className="hero-text">
            With custom-designed running shoes from <strong>ShoeStack</strong>. Our expert designers will work with you to
            create a unique pair of shoes tailored to your needs, preferences, and goals.
          </p>
          <button className="hero-btn">EXPLORE PRODUCTS <i className="fas fa-arrow-right"></i></button>
        </div>

        <div className="shoe-image">
          <div className="shoe-container">
            <img src="/images/im8.png" alt="Futuristic Sneaker" id="shoe" />
          </div>
        </div>

        <div className="scroll-hint">
          <i className="fas fa-chevron-down"></i>
          <span>Scroll Down</span>
        </div>
      </section>
      
      <ShoeCustomizer />
      
      {/* New Top Selling Shoes Section */}
      <section className="top-selling-section">
        <h1 className="top-selling-title">TOP SELLING SHOES</h1>
        <p className="top-selling-subtitle">Discover our most popular designs loved by thousands</p>
        
        <div className="shoe-slider-container">
          <div 
            className="shoe-slider" 
            ref={sliderRef}
            style={{
              background: `linear-gradient(135deg, ${topShoes[currentSlide].colors[0]} 0%, ${topShoes[currentSlide].colors[1]} 100%)`
            }}
          >
            <div className="slider-nav">
              {topShoes.map((shoe, index) => (
                <button
                  key={shoe.id}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => changeSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="slider-content">
              <div className="shoe-display">
                <img 
                  src={topShoes[currentSlide].image} 
                  alt={topShoes[currentSlide].name} 
                  className="slider-shoe"
                />
                {/* <div className="floating-price">{topShoes[currentSlide].price}</div> */}
              </div>
              
              <div className="shoe-info">
                <h2 className="shoe-name">{topShoes[currentSlide].name}</h2>
                <div className="shoe-features">
                  <ul className="shoe-features">
                    {topShoes[currentSlide].features.map((feature, i) => (
                      <li key={i} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="buy-now-btn">BUY NOW</button>
              </div>
            </div>
            
            <button 
              className="slider-arrow prev" 
              onClick={() => changeSlide((currentSlide - 1 + topShoes.length) % topShoes.length)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="slider-arrow next" 
              onClick={() => changeSlide((currentSlide + 1) % topShoes.length)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="category-section">
        <h1 className="category-title">OUR PRODUCT CATEGORY</h1>
        <p className="category-description">
          Orem Ipsum Dolor Sif Amet, Consectetur Adipiscing Elit, Sed Do Eusmod Tempor<br />
          Incididunt Ut Labore Et Dolore Magna Aliqua.
        </p>
        <div className="divider"></div>

        <div className="category-items">
          {['Formal', 'Sneakers', 'Loafer', 'Sports'].map((item, index) => (
            <div className="category-item" key={index}>
              <div className={`category-image c${index + 1}`}></div>
              <p className="category-label">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="part-two">
        <div className="second"></div>
        <div className="first">
          <h3>Elevate Your Running Experience and Unleash Your Creativity</h3>
          <p>
            Say goodbye to boring, outdated footwear and hello to the future with our revolutionary, futuristic shoes. Our team
            of professional shoe designers will work closely with you to understand your running style, preferences, and goals
            to create a shoe that is designed to help you perform at your best. So why settle for off-the-shelf running shoes
            when you can have a custom pair designed specifically for you with <span className="shoestack">ShoeStack</span>.
          </p>
        </div>
      </section>

      <section className="shoe-section">
        <div className="section-wrapper">
          <h1 className="section-title">Next Generation of Comfortable</h1>
          <div className="outer">
            {[
              { label: "AIR JORDANS", img: "/images/shoe5.png" },
              { label: "ADIDAS", img: "/images/shoe3.png" },
              { label: "NIKE", img: "/images/shoe7.png" },
            ].map((shoe, index) => (
              <div className="inner" key={index}>
                <div className={`boxes box${index + 1}`}>
                  <img src={shoe.img} className="shoe-pop" alt={shoe.label} />
                </div>
                <h3 className="box-text">{shoe.label}</h3>
                <button className="shop-btn">Shop Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Body;