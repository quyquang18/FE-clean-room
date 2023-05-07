import classNames from 'classnames/bind';
import { MapLocationIcon, ImpactIcon, MoneyIcon, UseDeviceIcon } from '~/components/Icons';
import { FormattedMessage } from 'react-intl';
import styles from './ContentHome.module.scss';

const cx = classNames.bind(styles);
function ContentHome() {
    return (
        <div className={cx('wrapper')}>
            <section className={cx('section-about')}>
                <div className={cx('container')}>
                    <div className={cx('main-container')}>
                        <div>
                            <h2 className={cx('title')}>
                                <FormattedMessage id="homepage.about-us" />
                            </h2>
                            <div className={cx('section-desc')}>
                                <p>
                                    <FormattedMessage id="homepage.section-desc" />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('sub-container')}>
                        <div className={cx('section-about-content')}>
                            <p>
                                <FormattedMessage id="homepage.section-about1" />
                            </p>
                            <p>
                                <FormattedMessage id="homepage.section-about2" />
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('why-luxas')}>
                <div className={cx('container')}>
                    <h2 className={cx('title-section')}>
                        <FormattedMessage id="homepage.why-luxas-title" />
                    </h2>
                    <ul className={cx('why-luxas__list')}>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <UseDeviceIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>
                                    <FormattedMessage id="homepage.why-luxas-content1" />
                                </div>
                                <p>
                                    <FormattedMessage id="homepage.why-luxas-sub1" />
                                </p>
                            </div>
                        </li>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <MoneyIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>
                                    <FormattedMessage id="homepage.why-luxas-content2" />
                                </div>
                                <p>
                                    <FormattedMessage id="homepage.why-luxas-sub2" />
                                </p>
                            </div>
                        </li>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <ImpactIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>
                                    <FormattedMessage id="homepage.why-luxas-content3" />
                                </div>
                                <p>
                                    <FormattedMessage id="homepage.why-luxas-sub3" />
                                </p>
                            </div>
                        </li>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <MapLocationIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>
                                    <FormattedMessage id="homepage.why-luxas-content4" />
                                </div>
                                <p>
                                    <FormattedMessage id="homepage.why-luxas-sub4" />
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default ContentHome;
