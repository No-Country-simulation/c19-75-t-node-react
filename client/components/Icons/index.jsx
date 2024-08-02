import style from './Icons.module.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import {
  FaArrowLeft,
  FaBookmark,
  FaFilter,
  FaSignOutAlt,
  FaLinkedin,
  FaFire,
  FaPaintRoller,
  FaStar,
  FaExternalLinkAlt,
} from 'react-icons/fa'; // Importar desde 'fa'
import { RiInstagramFill } from 'react-icons/ri'; // Importar desde 'ri'
import { BsTwitterX } from 'react-icons/bs'; // Importar desde 'bs'
import { GrVmMaintenance } from 'react-icons/gr';
import { MdOutlinePlumbing, MdConstruction, MdCarpenter, MdElectricBolt } from 'react-icons/md';
import { GiGardeningShears, GiBlacksmith } from 'react-icons/gi';

const Bookmark = ({ otherStyles }) => <FaBookmark className={`${style.icon} ${otherStyles}`} />;
const Filter = ({ otherStyles }) => <FaFilter className={`${style.icon} ${otherStyles}`} />;
const ArrowLeft = ({ otherStyles }) => <FaArrowLeft className={`${style.icon} ${otherStyles}`} />;
const SignOut = ({ otherStyles }) => <FaSignOutAlt className={`${style.icon} ${otherStyles}`} />;
const ArrowDropdown = ({ otherStyles }) => <IoMdArrowDropdown className={`${style.icon} ${otherStyles}`} />;
const Star = ({ otherStyles }) => <FaStar className={`${style.icon} ${otherStyles}`} />;
// Social Media
const Instagram = ({ otherStyles }) => <RiInstagramFill className={`${style.icon} ${otherStyles}`} />;
const Twitter = ({ otherStyles }) => <BsTwitterX className={`${style.icon} ${otherStyles}`} />;
const Linkedin = ({ otherStyles }) => <FaLinkedin className={`${style.icon} ${otherStyles}`} />;
// Categories
const Mantenimiento = ({ otherStyles }) => <GrVmMaintenance className={`${style.icon} ${otherStyles}`} />;
const Electricista = ({ otherStyles }) => <MdElectricBolt className={`${style.icon} ${otherStyles}`} />;
const Plomeria = ({ otherStyles }) => <MdOutlinePlumbing className={`${style.icon} ${otherStyles}`} />;
const Gasista = ({ otherStyles }) => <FaFire className={`${style.icon} ${otherStyles}`} />;
const Albanileria = ({ otherStyles }) => <MdConstruction className={`${style.icon} ${otherStyles}`} />;
const Jardineria = ({ otherStyles }) => <GiGardeningShears className={`${style.icon} ${otherStyles}`} />;
const Pintureria = ({ otherStyles }) => <FaPaintRoller className={`${style.icon} ${otherStyles}`} />;
const Carpinteria = ({ otherStyles }) => <MdCarpenter className={`${style.icon} ${otherStyles}`} />;
const Herreria = ({ otherStyles }) => <GiBlacksmith className={`${style.icon} ${otherStyles}`} />;

const EnlaceExterno = ({ otherStyles }) => <FaExternalLinkAlt className={`${style.icon} ${otherStyles}`} />;

export {
  Bookmark,
  Filter,
  ArrowLeft,
  SignOut,
  Instagram,
  Twitter,
  Linkedin,
  Mantenimiento,
  Electricista,
  Plomeria,
  Gasista,
  Albanileria,
  Jardineria,
  Pintureria,
  Carpinteria,
  Herreria,
  ArrowDropdown,
  Star,
  EnlaceExterno,
};
