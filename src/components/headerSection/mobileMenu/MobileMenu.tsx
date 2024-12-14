// /components/mobileMenu/MobileMenu.tsx

import React, { useState } from "react";
import { FaHome, FaFire, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./Menu.module.css";

interface MobileMenuProps {
  translations: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ translations }) => {
  const [selected, setSelected] = useState("mainSection");

  const handleSelect = (link: string) => {
    setSelected(link);
  };

  const headerOptions = [
    { key: "inicio", offset: 128, id: "mainSection", icon: <FaHome /> },
    { key: "resumo", offset: 0, id: "resumeSection", icon: <FaFire /> },
    { key: "contato", offset: 0, id: "contactSection", icon: <FaCog /> }
  ];

  return (
    <div className={`${styles.menu}`}>
      {headerOptions.map((option, index) => (
        <MenuItem
          key={index}
          icon={option.icon}
          link={option.id}
          selected={selected}
          handleSelect={handleSelect}
          translation={translations[option.key]}
          offset={option.offset}
        />
      ))}
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  link: string;
  selected: string;
  handleSelect: (link: string) => void;
  translation: string;
  offset: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  link,
  selected,
  handleSelect,
  translation,
  offset
}) => {
  const isSelected = selected === link;

  const handleScrollToSection = (id: string, offset: number) => {
    handleSelect(id);
    const mentionedSection = document.getElementById(id);
    if (mentionedSection) {
      const sectionTop =
        mentionedSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - offset, behavior: "smooth" });
    }
  };

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={`${styles.menuItem} ${isSelected ? styles.selected : ""}`}
        onClick={() => handleScrollToSection(link, offset)}
      >
        {icon}
        <span className={styles.menuText}>{translation}</span>
        {isSelected && (
          <motion.div
            className={styles.highlight}
            layoutId="highlight"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default MobileMenu;
