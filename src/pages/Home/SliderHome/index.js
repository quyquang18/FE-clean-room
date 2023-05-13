import classNames from 'classnames/bind';
import { useState } from 'react';
import images from '~/assets/images';
import { BackWard, ForWard } from '~/components/Icons';
import styles from './Slider.module.scss';
const cx = classNames.bind(styles);

function SliderHome({ sliderWidth, sliderHeight }) {
    const listImgSlider = [
        {
            url: images.sliderHomePage1,
            describe: 'Slider 1',
            name: 'slider1',
        },
        {
            url: images.sliderHomePage2,
            describe: 'Slider 2',
            name: 'slider2',
        },
        {
            url: images.sliderHomePage3,
            describe: 'Slider 3',
            name: 'slider3',
        },
    ];
    const [activeIndex, setActiveIndex] = useState(1);
    const [locationImgleft, setLocationImgleft] = useState(0);

    const prevSlide = () => {
        setActiveIndex(activeIndex - 1);
        setLocationImgleft(locationImgleft + sliderWidth);
        if (activeIndex === 1) {
            setActiveIndex(activeIndex + listImgSlider.length - 1);
            setLocationImgleft(locationImgleft - sliderWidth * (listImgSlider.length - 1));
        }
    };
    let widthSlider = listImgSlider.length * sliderWidth;
    const nextSlide = () => {
        setActiveIndex(activeIndex + 1);
        setLocationImgleft(locationImgleft - sliderWidth);
        if (activeIndex === listImgSlider.length) {
            setActiveIndex(activeIndex - listImgSlider.length + 1);
            setLocationImgleft(0);
        }
    };
    const clickIndicator = (e) => {
        setActiveIndex(parseInt(e.target.textContent));
        setLocationImgleft(sliderWidth - parseInt(e.target.textContent) * sliderWidth);
    };

    return (
        <div>
            <div className={cx('slider-wrapper')}>
                <ul style={{ width: widthSlider }}>
                    {listImgSlider.map((item, index) => {
                        return (
                            <li
                                key={index}
                                style={{
                                    left: locationImgleft,
                                    width: sliderWidth + 'px',
                                    height: sliderHeight + 'px',
                                }}
                                className={cx(index + 1 === activeIndex ? 'slider-item' : 'hide')}
                            >
                                <div
                                    className={cx('image-slider')}
                                    src={listImgSlider[index].url}
                                    style={{
                                        backgroundImage: `url(${listImgSlider[index].url})`,
                                        width: sliderWidth + 'px',
                                        height: sliderHeight + 'px',
                                    }}
                                />
                            </li>
                        );
                    }, this)}
                </ul>
                <div className={cx('buttons-wrapper')}>
                    <span className={cx('btn-slider', 'prev-button')} onClick={prevSlide}>
                        <BackWard />
                    </span>
                    <span className={cx('btn-slider', 'next-button')} onClick={nextSlide}>
                        <ForWard />
                    </span>
                </div>
                <div className={cx('indicators-wrapper')}>
                    <ul className={cx('indicators')}>
                        {listImgSlider.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={cx(index + 1 === activeIndex ? 'active-indicator' : '')}
                                    onClick={clickIndicator}
                                >
                                    {index + 1}
                                </li>
                            );
                        }, this)}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default SliderHome;
