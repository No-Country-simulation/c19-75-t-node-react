import Link from 'next/link';
import styles from './MarketPlaceCard.module.scss';

import { FaHeart, FaStar, FaRegHeart } from 'react-icons/fa';
import { Star } from '../Icons';
import { CATEGORIES } from '@/types/types';

const tDataMaerketPlace = {
    id: null, //
    title: 'Titulo',
    prov: 'Provincia', //
    city: 'Ciudad', //
    barrio: 'Barrio', //
    img: '', //
};

const tWorkerMarketPlace = {
    ...tDataMaerketPlace,
    professions: [
        //
        {
            profession_id: null,
            profession_name: 'Profesion',
            rating: 0,
        },
    ],
    rating: 0,
    cant_works_done: 0,
};
const tJobMarketPlace = {
    ...tDataMaerketPlace,
    desc: 'Descripcion',
    comentario: 'Comentario',
    client_id: null,
    client_name: 'Nombre',
    client_lastName: 'Apellido',
    category: 'categoria',
    subcategory: 'Subcategoria',
};

const MarketPlaceCard = ({ keyProp, data, pathname, categoria }) => {
    const isWorker = pathname === 'trabajadores';

    // Reorganizar la info de data segun el tipo de de dato trabajador o laburo
    const item = isWorker ? tWorkerMarketPlace : tJobMarketPlace;

    // TODO: Ver bien los datos que traemos de la db
    // FIXME: Cambiar todo esto dependiendo de los datos traidos de la db
    if (data) {
        if (data?.provincia) item.prov = data?.provincia;
        if (data?.ciudad) item.city = data?.ciudad;
        if (data?.barrio) item.barrio = data?.barrio;
        item.img = data?.foto;
        if (isWorker) {
            item.id = data?.usuario_id;
            if (data?.nombre && data?.apellido) item.title = data?.nombre + ' ' + data?.apellido;
            if (data?.categorias || data?.categoria) {
                let arrCategories = [];
                if (data?.categorias) arrCategories = data?.categorias.split(',');
                else arrCategories = data?.categoria.split(',');
                console;
                item.professions = arrCategories.map((cat) => {
                    return {
                        profession_name: cat,
                        rating: item.rating,
                    };
                });
            }

            if (data?.puntuacion) item.rating = data?.puntuacion;
            if (item?.rating === 0) {
                item.cant_works_done = 0;
            } else if (item.rating <= 3) {
                item.cant_works_done = Math.round(Math.random() * 30);
            } else {
                item.cant_works_done = Math.round(Math.random() * 130);
            }
        } else {
            item.id = data?.id;
            if (data?.titulo) item.title = data?.titulo;
            if (data?.descripcion) item.desc = data?.descripcion; // FIXME: el laburo no tiene descripcion :(
            if (data?.cliente_id) item.client_id = data?.cliente_id;
            if (data?.nombre) item.client_name = data?.nombre;
            if (data?.apellido) item.client_lastName = data?.apellido;
            if (data?.categoria_nombre) item.category = data?.categoria_nombre;
            if (data?.subcategoria) item.subcategory = data?.subcategoria;
        }
    }

    const renderInfoWorker = () => {
        return (
            <>
                <p className={styles.description}>{item.desc}</p>

                <div className={styles.starContainer}>
                    {item.cant_works_done !== 0 && (
                        <>
                            <span className={styles.rating}>{item.rating}</span>
                            {Array.from({ length: 5 }).map((_, idx) => {
                                return (
                                    <Star
                                        key={idx}
                                        otherStyles={`${styles.icon} ${idx < item.rating ? styles.fill : ''}`}
                                    />
                                );
                            })}
                        </>
                    )}
                    <span className={styles.works}>({item.cant_works_done})</span>
                </div>

                <div className={styles.professionContainer}>
                    {item.professions.map((profession, idx) => {
                        return (
                            <div key={idx} className={styles.profession}>
                                <span>{profession.profession_name}</span>
                                {item.cant_works_done !== 0 && (
                                    <>
                                        <span>{profession.rating}</span>
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
                    <span>{item?.prov && `${item.prov} / ${item.city} / ${item.barrio}`}</span>
                </div>
            </>
        );
    };
    const renderInfoJob = () => {
        return (
            <>
                <p className={styles.description}>{item.desc}</p>

                <div className={styles.userConainer}>
                    <Link href={`/usuario/${item.client_id}`} className={styles.user}>
                        {item.client_name} {item.client_lastName}
                    </Link>
                </div>

                <div className={styles.categoryContainer}>
                    <span>{item.category}</span>
                </div>
                <div className={styles.addressContainer}>
                    <span>
                        {item.prov} / {item.city} / {item.barrio}
                    </span>
                </div>
            </>
        );
    };

    const CATEGORY_MAP = CATEGORIES.reduce((acc, category) => {
        acc[category.name] = category.url;
        return acc;
    }, {});

    return (
        <div className={styles.card} key={keyProp + item?.title}>
            <img
                src={data?.foto ? item?.img : '/default_img_item.jpg'}
                alt="SIN-IMAGEN"
                className={styles.image}
            />
            <div
                className={`${styles.info} ${
                    isWorker ? styles.info__grid_workers : styles.info__grid_laburos
                }`}
            >
                <div className={styles.title}>
                    <h3>{item?.title}</h3>
                </div>
                {isWorker ? renderInfoWorker() : renderInfoJob()}
                <button className={styles.button}>
                    <Link
                        className={styles.buttonLink}
                        href={
                            isWorker
                                ? `/usuario/${item?.id}`
                                : `/laburos/${CATEGORY_MAP[item?.category]}/${item?.id}`
                        }
                    >
                        {isWorker ? 'Ver Perfil' : 'Ver Oferta'}
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default MarketPlaceCard;
