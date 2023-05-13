import SliderHome from './SliderHome';
import Footer from './Footer';
import ContentHome from './ContentHome';
import { ref, onValue } from 'firebase/database';
import { getMessaging, getToken } from 'firebase/messaging';
import { database, app } from '~/firebase';
import { useState, useEffect } from 'react';

const dbRef = ref(database);
const messaging = getMessaging(app);
function Home() {
    getToken(messaging, {
        vapidKey: 'BLwPhCS1XyILkeZkNo9iCYzTcI2X0PWcv7HNrmUNB7o2OCmKeAUEIQ0pFNQu57Cez786F3L1jaTgTJ0siWCaAI0',
    })
        .then((currentToken) => {
            if (currentToken) {
                // ...
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [heightImage, setHeightImage] = useState();
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        if (windowWidth < 740) {
            setHeightImage('120');
        }
        if (windowWidth > 740 && windowWidth < 1023) {
            setHeightImage('260');
        }
        if (windowWidth > 1023) {
            setHeightImage('320');
        }
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);
    return (
        <div>
            <div>
                <SliderHome sliderWidth={windowWidth < 1023 ? windowWidth : 892} sliderHeight={heightImage} />
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
