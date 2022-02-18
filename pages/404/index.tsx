import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { MainLayout } from '../../layouts/MainLayout';
import styles from './Custom404.module.scss';
export default function Custom404() {
  const router = useRouter();
  const onBackButton = () => {
    router.back();
  };
  return (
    <MainLayout hideComments>
      <h2 className={styles.title}>Страница не найдена</h2>
      <p>По такому адресу страницы не существует</p>
      <section className={styles.errorContainer}>
        <span className={styles.four}>
          <span className={styles.screenReaderText}>4</span>
        </span>
        <span className={styles.zero}>
          <span className={styles.screenReaderText}>0</span>
        </span>
        <span className={styles.four}>
          <span className={styles.screenReaderText}>4</span>
        </span>
      </section>

      <Button onClick={onBackButton} variant="contained">
        &#8592; Вернуться назад
      </Button>
      <div className={styles.linkContainer}></div>
    </MainLayout>
  );
}
