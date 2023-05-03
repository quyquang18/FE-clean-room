import classNames from 'classnames/bind';
import { MapLocationIcon, ImpactIcon, MoneyIcon, UseDeviceIcon } from '~/components/Icons';

import styles from './ContentHome.module.scss';
import Image from '~/components/Image';
import { ReactComponent as MechanicalIcon } from '~/assets/SvgIcon/mechanical-Icon.svg';
import { ReactComponent as CleanRoom } from '~/assets/SvgIcon/clean-room-icon.svg';
import { ReactComponent as ElectricalIcon } from '~/assets/SvgIcon/electrical-icon.svg';
import { ReactComponent as PumpIcon } from '~/assets/SvgIcon/pump-icon.svg';
import { ReactComponent as Pneumatic } from '~/assets/SvgIcon/Pneumatic-icon.svg';
const cx = classNames.bind(styles);
function ContentHome() {
    return (
        <div className={cx('wrapper')}>
            <section className={cx('section-about')}>
                <div className={cx('container')}>
                    <div className={cx('main-container')}>
                        <div>
                            <h2 className={cx('title')}>Về chúng tôi</h2>
                            <div className={cx('section-desc')}>
                                <p>
                                    LUXAS là nhà cung cấp các thiết bị, phụ tùng trong nhà máy. Tư vấn lắp đặt hệ thống
                                    IoT cho mọi khách hàng trên toàn thế giới.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('sub-container')}>
                        <div className={cx('section-about-content')}>
                            <p>
                                Xây dựng và phát triển với phương châm hoạt động đạo đức, chuyên nghiệp và sáng tạo,
                                chúng tôi tạo ra môi trường làm việc ý nghĩa cho nhân viên, mang đến khách hàng các giá
                                trị cách tân và dịch vụ tuyệt hảo, hướng tới nâng cao giá trị cho cổ đông và có trách
                                nhiệm với cộng đồng.
                            </p>
                            <p>
                                Với chiến lược hoạt động: “” – LUXAS mong muốn trở thành một công ty dẫn đầu tại Việt
                                Nam và khu vực về chất lượng dịch vụ và hiệu quả trong các hoạt động thiết bị công
                                nghiệp.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('why-luxas')}>
                <div className={cx('container')}>
                    <h2 className={cx('title-section')}>Tại sao chọn LUXAS ?</h2>
                    <ul className={cx('why-luxas__list')}>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <UseDeviceIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>Dễ dàng sử dụng</div>
                                <p>Hướng dẫn đăng ký rõ ràng, dễ thực hiện</p>
                            </div>
                        </li>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <MoneyIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>Giá cả hợp lí</div>
                                <p>Thông tin về khoản vay được thể hiện đầy đủ, chi tiết</p>
                            </div>
                        </li>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <ImpactIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>Độ bền thiết bị cao</div>
                                <p>Nhận tiền về tài khoản của bạn trong vòng 20 phút</p>
                            </div>
                        </li>
                        <li className={cx('why-luxas__items')}>
                            <i className={cx('why-luxas__icon')}>
                                <MapLocationIcon width="5.6rem" height="5.6rem" />
                            </i>
                            <div className={cx('why-luxas__descr')}>
                                <div className={cx('why-luxas__title')}>Tiện lợi</div>
                                <p>Dịch vụ thực hiện hoàn toàn trực tuyến</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default ContentHome;
