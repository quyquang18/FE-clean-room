import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './EmailVerify.module.scss';
import { handleVerifyEmail } from '~/services/userService';
import images from '~/assets/images';
import { CloseIcon } from '~/components/Icons';
import { path } from '~/utils';
const cx = className.bind(styles);
const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                let data = await handleVerifyEmail(param.id, param.token);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p className={cx('company-name')}>LUXAS</p>
            </div>
            <div className={cx('content')}>
                <img className={cx('image')} src={images.anhJerry} alt=""></img>
                {validUrl ? (
                    <div className={cx('sub-content')}>
                        <h4>Email đã được xác thực thành công !</h4>
                        <p>Bạn có thể quay trở lại trang đăng nhập để bắt đầu tiến hành sử dụng dịch vụ nhé</p>
                        <Link to={path.LOGIN}>
                            <button className={cx('btn-login')}>Login</button>
                        </Link>
                    </div>
                ) : (
                    <div className={cx('sub-content')}>
                        <h4>Ui, Email chưa xác thực được rồi !</h4>
                        <p>Link đặt lại mật khẩu đã hết hạn. Bạn vui lòng thử lại nhé</p>
                        <CloseIcon width="4.2rem" height="4.2rem" color="#fff" fontWeight="3" className={cx('icon')} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailVerify;
