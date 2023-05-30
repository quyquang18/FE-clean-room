import AccList from '~/components/AccList';
import { useSelector } from 'react-redux';
import ManageAccByCompany from './ManageAccByCompany';

function ManageAccount() {
    document.title = 'LUXAS-ManageAccount';
    const user = useSelector((state) => state.user);
    return (
        <div className="wrapper">
            {user.userInfo.roleID === 'R1' && (
                <div className="acc-list">
                    <AccList />
                </div>
            )}
            {user.userInfo.roleID === 'R2' && (
                <div className="acc-list">
                    <ManageAccByCompany />
                </div>
            )}
        </div>
    );
}

export default ManageAccount;
