import React, { useState, useEffect } from 'react';

import '../App.css';
import style from './MainPage.module.css'
import Home from './Home';
import MyNotes from './MyNotes';

function MainPage({ click, notes, Size }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [hidePage, setHidePage] = useState(false);
    const [notesData, setNotesData] = useState(null);
    const [notesDataArr, setNotesDataArr] = useState([]);
    const [bool, setBool] = useState(false);

    // Load notes from localStorage when notesData changes
    useEffect(() => {
        if (notesData) {
            const savedNotes = JSON.parse(localStorage.getItem(notesData.item)) || [];
            setNotesDataArr(savedNotes);
        }
    }, [notesData]);


    // Save updated notes to localStorage
    const handleSaveNote = (updatedNotes) => {
        if (notesData) {
            localStorage.setItem(notesData.item, JSON.stringify(updatedNotes));
        }
        setNotesDataArr(updatedNotes);
    };


    // Handle selecting a list item
    const handleListItem = (item, sName, color, index) => {
        setNotesData({ item, sName, color })
        setHidePage(true)
        setSelectedIndex(index === selectedIndex ? null : index);
    }

    return (
        <>
            {Size < 990  ? (  <main>
                <div className={style.main_container}>
                    <div className={`${style.left} ${bool ? style.display : ""}`}>
                        <div className={style.left_container}>
                            <div className={style.main_header}>
                                <h1 onClick={() => setHidePage(false)}>Pocket Notes</h1>
                            </div>
                            <div className={style.content}>
                                <ul>
                                    {notes.map((item, index) => (
                                        <div key={index} className={selectedIndex === index ? style.selected : ""}>
                                            <li onClick={() => {handleListItem(item.Gname, item.GSname, item.Gcolor, index)
                                             setBool(!bool)}
        
                                            }>
                                                <span style={{ backgroundColor: item.Gcolor }}>{item.GSname}</span>{item.Gname}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={style.add_btn}>
                            <button className='btn' onClick={() => click(true)}>+</button>
                        </div>
                    </div>

                    {/*---------------------- rendering app --------------------*/}


                    {!hidePage ? (
                        <Home />
                    ) : (
                        <MyNotes
                            copyArray={notesData}
                            savedData={handleSaveNote}
                            notesDataArr={notesDataArr}
                            Size={Size}
                            setBool = {setBool}
                            bool = {bool}

                        />
                    )}

                </div>
            </main>): (  <main>
                <div className={style.main_container}>
                    <div className={style.left}>
                        <div className={style.left_container}>
                            <div className={style.main_header}>
                                <h1 onClick={() => setHidePage(false)}>Pocket Notes</h1>
                            </div>
                            <div className={style.content}>
                                <ul>
                                    {notes.map((item, index) => (
                                        <div key={index} className={selectedIndex === index ? style.selected : ""}>
                                            <li onClick={() => handleListItem(item.Gname, item.GSname, item.Gcolor, index)}>
                                                <span style={{ backgroundColor: item.Gcolor }}>{item.GSname}</span>{item.Gname}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={style.add_btn}>
                            <button className='btn' onClick={() => click(true)}>+</button>
                        </div>
                    </div>

                    {/*---------------------- rendering app --------------------*/}


                    {!hidePage ? (
                        <Home />
                    ) : (
                        <MyNotes
                            copyArray={notesData}
                            savedData={handleSaveNote}
                            notesDataArr={notesDataArr}
                        />
                    )}

                </div>
            </main>) }
          
        </>
    );
}

export default MainPage
