import React, { useState } from "react";
import { FaHome, FaFire, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Menu.module.css";

const MobileMenu = () => {
  const [selected, setSelected] = useState("mainSection");

  const handleSelect = (link: string) => {
    setSelected(link);
  };

  const headerOptions = [
    { name: "Início", offset: 128, id: "mainSection", icon: <FaHome /> },
    { name: "Resumo", offset: 0, id: "resumeSection", icon: <FaFire /> },
    { name: "Contato", offset: 0, id: "contactSection", icon: <FaCog /> }
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
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  link,
  selected,
  handleSelect
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
        onClick={() => handleScrollToSection(link, 0)}>
        {icon}
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
