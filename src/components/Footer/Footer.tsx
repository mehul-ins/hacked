import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Instagram, Linkedin, Calendar, Users, Phone } from "lucide-react";
import "./footer.css";

// ============ TextHoverEffect Component ============
interface TextHoverEffectProps {
  text: string;
  duration?: number;
  className?: string;
}

const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  text,
  duration,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`text-hover-svg ${className}`}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="25%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="75%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fbbf24" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="text-stroke-light"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="text-stroke-accent"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="text-gradient-mask"
      >
        {text}
      </text>
    </svg>
  );
};

// ============ FooterBackgroundGradient Component ============
const FooterBackgroundGradient: React.FC = () => {
  return <div className="footer-bg-gradient" />;
};



// ============ Main Footer Component ============
const Footer: React.FC = () => {
  type FooterLink = {
    label: string;
    href: string;
    icon?: React.ReactNode;
    target?: string;
    pulse?: boolean;
  };

  const footerLinks: { title: string; links: FooterLink[] }[] = [
    {
      title: "Event",
      links: [
        { label: "Schedule", href: "#schedule", icon: <Calendar size={14} /> },
        { label: "Tracks & Themes", href: "#theme" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQs", href: "#faq" },
        { label: "Code of Conduct", href: "/pdf/Code%20of%20Conduct%20Hacked%204.0.pdf", target: "_blank" },
      ],
    },
    {
      title: "Participate",
      links: [
        { label: "Register Now", href: "https://unstop.com/hackathons/hacked-40-bml-munjal-university-bmu-gurgaon-1638479", target: "_blank", icon: <Users size={14} /> },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Phone size={18} className="icon-accent" />,
      text: "Contact Mehak",
      href: "tel:+919315567701",
    },
    {
      icon: <Phone size={18} className="icon-accent" />,
      text: "Contact Divisha",
      href: "tel:+918287918026"
    },
    {
      icon: <MapPin size={18} className="icon-accent" />,
      text: "BML Munjal University, Gurugram, Haryana, India",
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/hacked_bmu?igsh=MXJkNnNqdGN2a25tcQ==" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/hacked-67thmilestone/" },
  ];

  return (
    <footer className="footer">
      {/* Background - lowest layer */}
      <FooterBackgroundGradient />

      {/* Text hover effect - middle layer */}
      <div className="text-hover-container">
        <TextHoverEffect text="HACKED" />
      </div>

      {/* Main content - highest layer */}
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand section */}
          <div className="brand-section">
            <div className="brand-logo">
              <span className="brand-icon">&lt;/&gt;</span>
              <span className="brand-name">Hacked 4.0</span>
            </div>
            <p className="brand-description">
              The ultimate 24-hour hackathon experience. Build, innovate, and
              connect with developers from around the world.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="link-section">
              <h4 className="section-title">{section.title}</h4>
              <ul className="link-list">
                {section.links.map((link) => (
                  <li
                    key={link.label}
                    className={link.pulse ? "link-item-pulse" : ""}
                  >
                    <a
                      href={link.href}
                      className="footer-link"
                      {...(link.target ? { target: link.target, rel: "noopener noreferrer" } : {})}
                    >
                      {'icon' in link && link.icon && <span className="link-icon">{link.icon}</span>}
                      {link.label}
                    </a>
                    {'pulse' in link && link.pulse && <span className="pulse-dot"></span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div className="contact-section">
            <h4 className="section-title">Contact Us</h4>
            <ul className="contact-list">
              {contactInfo.map((item, i) => (
                <li key={i} className="contact-item">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="footer-link">
                      {item.text}
                    </a>
                  ) : (
                    <span className="footer-link">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Footer bottom */}
        <div className="footer-bottom">
          {/* Social icons */}
          <div className="social-link-1s">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-link-1"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="copyright">
            &copy; {new Date().getFullYear()} Hacked 4.0 | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;