import Link from 'next/link';
import styles from './MarketPlaceCard.module.scss';

import { FaHeart, FaStar, FaRegHeart } from 'react-icons/fa';
import { Star } from '../Icons';

const tDataMaerketPlace = {
    id: null, //
    title: 'Titulo',
    prov: 'Provincia', //
    city: 'Ciudad', //
    address: 'Calle', //
    num_address: '000', //
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
    client_id: null,
    client_name: 'Nombre',
    client_lastName: 'Apellido',
    category: 'categoria',
    subcategory: 'Subcategoria',
};

const MarketPlaceCard = ({ keyProp, data, pathname }) => {
    const isWorker = pathname === 'trabajadores';

    // Reorganizar la info de data segun el tipo de de dato trabajador o laburo
    const item = isWorker ? tWorkerMarketPlace : tJobMarketPlace;

    // TODO: Ver bien los datos que traemos de la db
    // FIXME: Cambiar todo esto dependiendo de los datos traidos de la db
    // FIXME: Los if no van, esto es par mostrar el card algo armado
    if (data) {
        if (data?.provincia) item.prov = data?.provincia;
        if (data?.ciudad) item.city = data?.ciudad;
        if (data?.direccion) item.address = data?.direccion;
        if (data?.num_direccion) item.num_address = data?.num_direccion;
        item.img = data?.foto;
        if (isWorker) {
            item.id = data?.usuario_id;
            if (data?.nombre && data?.apellido) item.title = data?.nombre + ' ' + data?.apellido;
            if (data?.categoria) {
                const arrCategories = data?.categoria.split('/');
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
            } else if (item.rating < 3) {
                item.cant_works_done = Math.round(Math.random() * 50);
            } else {
                item.cant_works_done = Math.round(Math.random() * 150);
            }
        } else {
            item.id = data?.id;
            if (data?.titulo) item.title = data?.titulo;
            if (data?.descripcion) item.desc = data?.descripcion;
            if (data?.cliente_id) item.client_id = data?.cliente_id;
            if (data?.client_name) item.client_name = data?.client_name;
            if (data?.client_lastName) item.client_lastName = data?.client_lastName;
            if (data?.categoria) item.category = data?.categoria;
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
                    <span>
                        {item?.prov && `${item.prov} / ${item.city} / ${item.address} / ${item.num_address}`}
                    </span>
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
                        {item.prov} / {item.city} / {item.address} / {item.num_address}
                    </span>
                </div>
            </>
        );
    };

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
                        href={isWorker ? `/usuario/${item?.id}` : `/laburos/${item?.category}/${item?.id}`}
                    >
                        {isWorker ? 'Ver Perfil' : 'Ver Oferta'}
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default MarketPlaceCard;
