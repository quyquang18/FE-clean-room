import { getMessaging, getToken } from 'firebase/messaging';
import SliderHome from './SliderHome';
import Footer from './Footer';
import ContentHome from './ContentHome';
import { app } from '~/firebase';

const messaging = getMessaging(app);
function Home() {
    // getToken(messaging, {
    //     vapidKey: 'BLwPhCS1XyILkeZkNo9iCYzTcI2X0PWcv7HNrmUNB7o2OCmKeAUEIQ0pFNQu57Cez786F3L1jaTgTJ0siWCaAI0',
    // })
    //     .then((currentToken) => {
    //         if (currentToken) {
    //             // ...
    //         } else {
    //             // Show permission request UI
    //             console.log('No registration token available. Request permission to generate one.');
    //             // ...
    //         }
    //     })
    //     .catch((err) => {
    //         console.log('An error occurred while retrieving token. ', err);
    //         // ...
    //     });
    let heightImage = '0';
    const elementApp = document.querySelector('.App');
    let appWidth = elementApp.clientWidth;
    if (appWidth < 740) {
        heightImage = '120';
    }
    if (appWidth > 740 && appWidth < 1023) {
        heightImage = '260';
    }
    if (appWidth > 1023) {
        heightImage = '320';
    }

    return (
        <div>
            <div>
                <SliderHome sliderWidth={appWidth < 1023 ? appWidth : 892} sliderHeight={heightImage} />
            </div>
            <div>
                <ContentHome />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
