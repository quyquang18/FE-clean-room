import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from './Slider';
import Footer from './Footer';
import ContentHome from './ContentHome';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                <Slider sliderWidth="845" sliderHeight="320" />
            </div>
            <div className={cx('content')}>
                <ContentHome />
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
