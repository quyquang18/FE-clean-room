import classNames from 'classnames/bind';

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
                        <li>Installation, repair and maintenance services</li>
                        <li>Trading in machinery, equipment and spare parts in the factory</li>
                        <li>Supply of components for industrial machinery and equipment</li>
                        <li>Consumables in production</li>
                        <li>Consulting on installation of IoT systems</li>
                    </ul>
                </div>
            </div>
            <div className={cx('sub-footer-2')}>
                <h2>
                    <span>Information</span>
                </h2>
                <ul>
                    <li>
                        <a href="Contact.aspx">
                            <span>Contact</span>
                        </a>
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
                    <span>Address</span>
                </h2>
                <ul>
                    <li>
                        -<span>Head Office</span> :
                        <address>
                            <span>38/5 Van Kiep Street Ward 3, Binh Thanh District, Ho Chí Minh City, Viet Nam.</span>
                        </address>
                    </li>
                    <li>
                        -<span>Representative Office</span> :
                        <address>
                            111 N13 Street, Phu Hoa Residential Area 1, Phu Hoa Ward, Thu Dau Mot City, Binh Duong
                            Province, Viet Nam.
                        </address>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
