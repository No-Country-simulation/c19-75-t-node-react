// Default types
export const tJob = {
    job_id: null,
    status_job: '', // Pendiente | En proceso | Finalizado
    title: '',
    desc: '',
    img: '',
    imgs: [],
    client_id: null,
    worker_id: null,
    category_id: null,
    subcategory_id: null,
    rating: 0,
};
export const tProfession = {
    profession_id: null,
    profession_name: '',
};

export const tUser = {
    user_id: null,
    name: '',
    lastname: '',
    user_img: '',
    prov: '',
    city: '',
    address: '',
    num_address: '',
    isWorker: false,
    rating: 0,
};
export const tWorker = {
    ...tUser,
    isWorker: true,
    professions: [
        {
            ...tProfession,
            rating: 0,
        },
    ],
    about_me: '',
    jobs_done: 0,
    jobs: [
        {
            job_id: null,
            status_worker: '', // Postulado | Aceptado | Rechazado | Finalizado
        },
    ],
};
export const tClient = {
    ...tUser,
    jobs_posted: 0,
    jobs: [
        {
            job_id: null,
            status_client: '', // Pendiente | En proceso | Finalizado
        },
    ],
};

export const CATEGORIES = {
    0: 'Todas las categorias',
    1: 'Pintureria',
    2: 'Herreria',
    3: 'Plomeria',
    4: 'Electricitstas',
    5: 'Jardineria',
    6: 'Mantenimiento',
    7: 'Albanileria',
    8: 'Carpinteria',
};
