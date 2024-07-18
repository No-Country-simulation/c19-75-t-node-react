import style from './Icons.module.scss';
import {
  FaArrowLeft,
  FaBookmark,
  FaFilter,
  FaSignOutAlt,
  FaLinkedin,
} from 'react-icons/fa'; // Importar desde 'fa'
import { RiInstagramFill } from 'react-icons/ri'; // Importar desde 'ri'
import { BsTwitterX } from 'react-icons/bs'; // Importar desde 'bs'

const Bookmark = ({ otherStyles }) => (
  <FaBookmark className={`${style.icon} ${otherStyles}`} />
);
const Filter = ({ otherStyles }) => (
  <FaFilter className={`${style.icon} ${otherStyles}`} />
);
const ArrowLeft = ({ otherStyles }) => (
  <FaArrowLeft className={`${style.icon} ${otherStyles}`} />
);
const SignOut = ({ otherStyles }) => (
  <FaSignOutAlt className={`${style.icon} ${otherStyles}`} />
);
const Instagram = ({ otherStyles }) => (
  <RiInstagramFill className={`${style.icon} ${otherStyles}`} />
);
const Twitter = ({ otherStyles }) => (
  <BsTwitterX className={`${style.icon} ${otherStyles}`} />
);
const Linkedin = ({ otherStyles }) => (
  <FaLinkedin className={`${style.icon} ${otherStyles}`} />
);

export { Bookmark, Filter, ArrowLeft, SignOut, Instagram, Twitter, Linkedin };
