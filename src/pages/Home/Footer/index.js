import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sub-footer-1')}>
                <h2>LUXAS</h2>
                <div className={cx('service')}>
                    <span>LUXAS CO., LTD</span>
                    <ul>
                        <li>
                            <FormattedMessage id="homepage-footer.service1" />
                        </li>
                        <li>
                            <FormattedMessage id="homepage-footer.service2" />
                        </li>
                        <li>
                            <FormattedMessage id="homepage-footer.service3" />
                        </li>
                        <li>
                            <FormattedMessage id="homepage-footer.service4" />
                        </li>
                        <li>
                            <FormattedMessage id="homepage-footer.service5" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('sub-footer-2')}>
                <h2>
                    <span>
                        <FormattedMessage id="homepage-footer.info" />
                    </span>
                </h2>
                <ul>
                    <li>
                        <div>
                            <span>Contact</span>
                        </div>
                    </li>
                    <li>
                        <a href="tel:0937511617">Hotline: 0937511617</a>
                    </li>
                    <li>
                        <a href="mailto:sale-luxas@gmail.com.vn">Email: sale-luxas@.com.vn</a>
                    </li>
                </ul>
            </div>
            <div className={cx('sub-footer-3')}>
                <h2>
                    <span>
                        <FormattedMessage id="homepage-footer.address" />
                    </span>
                </h2>
                <ul>
                    <li>
                        -
                        <span>
                            <FormattedMessage id="homepage-footer.address-tt1" />
                        </span>{' '}
                        :
                        <address>
                            <span>
                                <FormattedMessage id="homepage-footer.address-sub1" />
                            </span>
                        </address>
                    </li>
                    <li>
                        -
                        <span>
                            <FormattedMessage id="homepage-footer.address-tt2" />
                        </span>{' '}
                        :
                        <address>
                            <FormattedMessage id="homepage-footer.address-sub2" />
                        </address>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
