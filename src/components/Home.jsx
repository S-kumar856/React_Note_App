import React from 'react';
import img from '../assets/image.png'
import lock from '../assets/Vector.png'
import style from './MainPage.module.css'

function Home() {
   
    return (
        <>
            <div className={style.right_container}>
                <div className={style.details}>
                    <img src={img} alt="bg_img" />
                    <h1>Pocket Notes</h1>
                    <p>Send and receive messages without keeping your phone online.<br />
                        Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                </div>
                <div className={style.footer}>
                    <p className='end'><img src={lock} alt="Lock" />end-to-end encrypted</p>
                </div>
            </div>
        </>
    )
}

export default Home
