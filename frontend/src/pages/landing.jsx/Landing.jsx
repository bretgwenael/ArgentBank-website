import React from 'react';
import './landing.scss';

import IconChat from '../../assets/icon-chat.png'
import IconMoney from '../../assets/icon-money.png'
import IconSecurity from '../../assets/icon-security.png'

function Landing() {
    return (
        <>
            <div className='banner'>
                <section className='banner__content'>
                    <p className='banner__content__subtitle'>No fees.</p>
                    <p className='banner__content__subtitle'>No minimum deposit.</p>
                    <p className='banner__content__subtitle'>High interest rates.</p>
                    <br />
                    <p className='banner__content__text'>Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            
            <section className='feature'>
                <div className='feature__item'>
                    <img src={IconChat} alt="Chat Icon" className='feature__icon' />
                    <h3 className='feature__item__title'>You are our #1 priority</h3>
                    <p className='feature__item__text'>
                        Need to talk to a representative? You can get in touch through our
                        24/7 chat or through a phone call in less than 5 minutes.
                    </p>
                </div>
                <div className='feature__item'>
                    <img src={IconMoney} alt="Chat Icon" className='feature__icon' />
                    <h3 className='feature__item__title'>More savings means higher rates</h3>
                    <p className='feature__item__text'>
                        The more you save with us, the higher your interest rate will be!
                    </p>
                </div>
                <div className='feature__item'>
                    <img src={IconSecurity} alt="Chat Icon" className='feature__icon' />
                    <h3 className='feature__item__title'>Security you can trust</h3>
                    <p className='feature__item__text'>
                        We use top of the line encryption to make sure your data and money
                        is always safe.
                    </p>
                </div>
            </section>
        </>
    )
}

export default Landing;