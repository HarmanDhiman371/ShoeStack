import React from 'react';
import { FiAward, FiUsers, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import TeamMember from '../components/TeamMember';
import '../styles/About.css';

const About = () => {
  const stats = [
    { icon: <FiAward size={32} />, value: '150+', label: 'Awards Won' },
    { icon: <FiUsers size={32} />, value: '10K+', label: 'Happy Customers' },
    { icon: <FiCheckCircle size={32} />, value: '500+', label: 'Quality Checks' },
    { icon: <FiTrendingUp size={32} />, value: '99%', label: 'Satisfaction Rate' }
  ];

  const teamMembers = [
    { 
      name: 'Alex Johnson', 
      role: 'Founder & CEO', 
      image: '/images/team1.jpg',
      social: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    { 
      name: 'Sarah Williams', 
      role: 'Lead Designer', 
      image: '/images/team2.jpg',
      social: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    { 
      name: 'Michael Chen', 
      role: 'Product Engineer', 
      image: '/images/team3.jpg',
      social: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    { 
      name: 'Emma Rodriguez', 
      role: 'Customer Success', 
      image: '/images/team4.jpg',
      social: {
        twitter: '#',
        linkedin: '#',
        instagram: '#'
      }
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">Our Story</h1>
          <p className="about-subtitle">Redefining footwear since 2015</p>
          <div className="about-hero-image"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At ShoeStack, we believe that exceptional footwear should be accessible to everyone. 
            We combine cutting-edge technology with timeless design to create shoes that don't 
            just look good, but feel incredible from the first step to the last.
          </p>
          <div className="mission-values">
            <div className="value-card">
              <div className="value-icon">✓</div>
              <h3>Innovation</h3>
              <p>Pushing boundaries with new materials and technologies</p>
            </div>
            <div className="value-card">
              <div className="value-icon">♥</div>
              <h3>Comfort</h3>
              <p>Engineered for all-day wear without compromise</p>
            </div>
            <div className="value-card">
              <div className="value-icon">♻</div>
              <h3>Sustainability</h3>
              <p>Ethically sourced materials and responsible manufacturing</p>
            </div>
          </div>
        </div>
        <div className="mission-image"></div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="team-header">
          <h2>Meet The Team</h2>
          <p>The passionate people behind ShoeStack's success</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to step into the future?</h2>
        <p>Join thousands of happy customers experiencing next-level comfort</p>
        <button className="cta-button">Shop Now</button>
      </section>
    </div>
  );
};

export default About;