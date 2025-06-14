import React from 'react';
import { FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

const TeamMember = ({ name, role, image, social }) => {
  return (
    <div className="team-member">
      <div className="member-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="member-info">
        <h3>{name}</h3>
        <p>{role}</p>
        <div className="member-social">
          <a href={social.twitter} aria-label={`${name} Twitter`}><FiTwitter /></a>
          <a href={social.linkedin} aria-label={`${name} LinkedIn`}><FiLinkedin /></a>
          <a href={social.instagram} aria-label={`${name} Instagram`}><FiInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;