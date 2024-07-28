import Link from 'next/link';
import styles from './MarketPlaceCard.module.scss';

import { FaHeart, FaStar, FaRegHeart } from 'react-icons/fa';
import { Star } from '../Icons';

const MarketPlaceCard = ({ key, data, pathname }) => {
    const isTrabajador = pathname === 'trabajadores';
    console.log('-> ', data);

    // Reorganizar las keys de data
    const item = {
        user_id: '',
        profesional_id: '',
        professions: [],
        title: '',
        desc: '',
        rating: '',
        cant_works: 0,
        user_img: '',
        prov: '',
        city: '',
    };

    // TODO: Ver bien los datos que trameos de la db
    if (data) {
        if (isTrabajador) {
            item.user_id = data?.usuario_id;
            item.profesional_id = data?.profesional_id;
            item.professions = data.categoria.split('/');
            item.title = data?.nombre + ' ' + data?.apellido;
            item.desc = data?.desc;
            item.rating = data?.puntuacion;
            if (item?.rating === 0) {
                item.cant_works = Math.round(Math.random() * 0);
            } else if (item.rating < 3) {
                item.cant_works = Math.round(Math.random() * 50);
            } else {
                item.cant_works = Math.round(Math.random() * 150);
            }
            item.ratingsProfessions = Array.from({ length: item.professions.length }).map((_) => item.rating);
            item.user_img = data?.foto;
            item.prov = data?.provincia;
            item.city = data?.ciudad;
        } else {
            // ...
        }
    }

    return (
        <div className={styles.card} key={key}>
            <img
                src={data?.foto ? data?.foto : '/default_img_item.jpg'}
                alt="SIN-IMAGEN"
                className={styles.image}
            />
            <div className={styles.info}>
                <div className={styles.title}>
                    <h3>{item?.title}</h3>
                </div>
                {/* TODO:  */}
                {/*      
                    <p className={styles.description}>
                        {item.desc}
                    </p>
                */}
                <div className={styles.starContainer}>
                    <span className={styles.rating}>{item.rating}</span>
                    {Array.from({ length: 5 }).map((_, idx) => {
                        return (
                            <Star
                                key={idx}
                                otherStyles={`${styles.icon} ${idx < item.rating ? styles.fill : ''}`}
                            />
                        );
                    })}
                    <span className={styles.works}>({item.cant_works})</span>
                </div>
                <div className={styles.professionContainer}>
                    {item.professions.map((profession, idx) => {
                        return (
                            <div key={idx} className={styles.profession}>
                                <span>{profession}</span>
                                {item.rating !== 0 && (
                                    <>
                                        <span>{item.ratingsProfessions[idx]}</span>
                                        <span>
                                            <Star />
                                        </span>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.addressContainer}>
                    <span>
                        {item?.prov} / {item?.city}
                    </span>
                </div>
                <button className={styles.button}>
                    <Link className={styles.buttonLink} href={`/usuario/${item?.user_id}`}>
                        {isTrabajador ? 'Ver Perfil' : 'Ver Oferta'}
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default MarketPlaceCard;
