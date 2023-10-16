import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { classes } from 'utils/style';
import styles from './Footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <Link
        secondary
        className={styles.link}
        href="https://github.com/HamishMW"
        target="_self"
      >
        <span className={styles.date}>
          {`© ${new Date().getFullYear()} All Credits Reserved. Build on Next.js`}
        </span>
      </Link>
    </Text>
  </footer>
);
