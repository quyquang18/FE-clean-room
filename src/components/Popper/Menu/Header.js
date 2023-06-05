import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Menu.module.scss';
import { BackIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <BackIcon width="2.2rem" height="2.2rem" className="icon" />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Header;
