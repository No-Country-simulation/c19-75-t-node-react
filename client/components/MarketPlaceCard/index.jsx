import Link from 'next/link';
import styles from './MarketPlaceCard.module.scss';

import { Star } from '../Icons';
import { CATEGORIES } from '@/types/types';

import { useRouter } from 'next/navigation';

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
    const router = useRouter();
    const isWorker = pathname === 'trabajadores';

    // Reorganizar la info de data segun el tipo de de dato trabajador o laburo
    const item = isWorker ? tWorkerMarketPlace : tJobMarketPlace;

    if (data) {
        console.log(data)
        item.prov = data?.provincia;
        item.city = data?.ciudad;
        item.barrio = data?.barrio;
        item.img = data?.foto;
        if (isWorker) {
            item.id = data?.usuario_id;
            item.title = data?.nombre + ' ' + data?.apellido;
            if (data?.categorias || data?.categoria) {
                let arrCategories = [];
                if (data?.categorias) arrCategories = data?.categorias.split(',');
                else arrCategories = data?.categoria.split(',');
                item.professions = arrCategories.map((cat) => {
                    return {
                        profession_name: cat,
                        rating: item.rating,
                    };
                });
            }
            item.rating = parseFloat(data?.puntuacion) || 0;
            item.cant_works_done = parseInt(data?.totalTrabajos, 10) || 0;
            console.log(data.puntuacion)
            console.log(item.rating)
            // item.cant_works_done = 2; // FIXME: ESTO ES SOLO PARA MOSTRAR
        } else {
            item.id = data?.id;
            item.title = data?.titulo;
            item.client_id = data?.cliente_id;
            item.client_name = data?.nombre;
            item.client_lastName = data?.apellido;
            item.category = data?.categoria_nombre;
            item.subcategory = data?.subcategoria;
        }
    }

    const renderInfoWorker = () => {
        return (
            <>
                <p className={styles.description}>{item.desc}</p>

                <div className={styles.starContainer}>
                    {item.cant_works_done > 0 ? (
                        <>
                            <span className={styles.rating}>{item.rating}</span>
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                    key={idx}
                                    otherStyles={`${styles.icon} ${idx < item.rating ? styles.fill : ''}`}
                                />
                            ))}
                            <span className={styles.works}>({item.cant_works_done})</span>
                        </>
                    ) : (
                        <span className={styles.works}>Sin calificaciones ({item.cant_works_done})</span>
                    )}
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
                    <span>{item?.prov && `${item.prov} / ${item.city} / ${item.barrio || ''}`}</span>
                </div>
            </>
        );
    };
    const renderInfoJob = () => {
        return (
            <>
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
                        {item.prov} / {item.city} / {item.barrio || ''}
                    </span>
                </div>
            </>
        );
    };

    const CATEGORY_MAP = CATEGORIES.reduce((acc, category) => {
        acc[category.name] = category.url;
        return acc;
    }, {});

    const handleClick = () => {
        if (isWorker) {
            router.push(`/usuario/${item?.id}`);
        } else {
            router.push(`/laburos/${CATEGORY_MAP[item?.category]}/${item?.id}`);
        }
    };

    return (
        <div className={styles.card} key={keyProp + item?.title}>
            <img src={data?.foto ? item?.img : ''} alt="SIN-IMAGEN" className={styles.image} />
            <div
                className={`${styles.info} ${isWorker ? styles.info__grid_workers : styles.info__grid_laburos
                    }`}
            >
                <div className={styles.title}>
                    <h3>{item?.title}</h3>
                </div>
                {isWorker ? renderInfoWorker() : renderInfoJob()}
                <button className={styles.button} onClick={handleClick}>
                    {isWorker ? 'Ver Perfil' : 'Ver Oferta'}
                </button>
            </div>
        </div>
    );
};

export default MarketPlaceCard;
