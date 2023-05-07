import classNames from 'classnames/bind';
import styles from './SettingsControler.module.scss';
import Button from '~/components/Button';
import { BackWard } from '~/components/Icons';
import { path } from '~/utils';
const cx = classNames.bind(styles);
function SettingsControler() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('btn-back')}>
                <Button leftIcon={<BackWard />} to={path.MONITORCONTROLER} primary>
                    Back
                </Button>
            </div>
            <h2 className={cx('title')}>Settings Controler</h2>
        </div>
    );
}

export default SettingsControler;
