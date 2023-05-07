import classNames from 'classnames/bind';
import styles from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { path } from '~/utils';
const cx = classNames.bind(styles);

function NotFoundPage() {
    return (
        <div className={cx('page-not-found-container')}>
            <div className={cx('image-not-found')} style={{ backgroundImage: `url(${images.imageNotFound})` }}></div>
            <div className={cx('page-not-found-content')}>
                <h1>Sorry!</h1>
                <p>
                    Either you aren't cool enough to visit this page or it doesn't exist{' '}
                    <em>. . . like your social life.</em>
                </p>
                <span className={cx('btn-go-home')}>
                    <Link to={path.HOMEPAGE}>Go to Home Page!</Link>
                </span>
            </div>
        </div>
    );
}

export default NotFoundPage;
