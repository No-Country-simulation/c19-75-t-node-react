import styles from './MarketplaceLayout.module.scss';

export default function TrabajadoresLayout({ children }) {
    return <div className={styles.marketplace_layout}>{children}</div>;
}
