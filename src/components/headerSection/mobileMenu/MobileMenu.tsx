import React, { useState } from 'react';
import { FaHome, FaFire, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Menu.module.css';

const MobileMenu = () => {
  const [selected, setSelected] = useState('#Inicio');

  const handleSelect = (link: string) => {
    setSelected(link);
  };

  return (
    <div className={`${styles.menu}`}>
      <MenuItem icon={<FaHome />} link="#Inicio" selected={selected} handleSelect={handleSelect} />
      <MenuItem icon={<FaFire />} link="#Resumo" selected={selected} handleSelect={handleSelect} />
      <MenuItem icon={<FaCog />} link="#Contato" selected={selected} handleSelect={handleSelect} />
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  link: string;
  selected: string;
  handleSelect: (link: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, link, selected, handleSelect }) => {
  const isSelected = selected === link;
  return (
    <Link href={link} scroll={false}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={`${styles.menuItem} ${isSelected ? styles.selected : ''}`}
        onClick={() => handleSelect(link)}
      >
        {icon}
        {isSelected && (
          <motion.div
            className={styles.highlight}
            layoutId="highlight"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default MobileMenu;
