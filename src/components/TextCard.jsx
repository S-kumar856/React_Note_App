import React, { useState } from 'react'

import style from './TextCards.module.css'

function TextCard({ text }) {
    return (
        <>
            <div >
                {text.map((item, index) => (
                    <div className={style.container} key={index}>
                    <span>{item.TextInput}</span>
                    <div className={style.timeInfo}>
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                    </div></div>
                ))}
            </div>
        </>
    )
}
export default TextCard
