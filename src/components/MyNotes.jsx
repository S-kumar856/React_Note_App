import React, { useState, useEffect } from 'react'
import style from './MyNotes.module.css';
import ArrowImg from '../assets/Arrow.png';
import ActiveArrow from '../assets/ActiveArrow.png'
import TextCard from './TextCard';


function MyNotes({ copyArray, savedData, notesDataArr, Size, bool, setBool }) {
  const [TextInput, setTextInput] = useState("");
  const [NoteContent, setNoteContent] = useState(notesDataArr || JSON.parse(localStorage.getItem("notes")) || []);

  // function for time and date
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const getDateTime = () => {
    const data = new Date();
    const date = data.getDate();
    const month = months[data.getMonth()];
    const year = data.getFullYear();
    const min = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
    const hours = data.getHours();
    const ampm = (hours < 12 ? `${hours}: ${min} AM` : ` ${hours - 12}: ${min} PM`) || hours === 12 && `${hours}:${min} PM`;
    return { date: ` ${date} ${month} ${year}`, time: ampm };
  };

  useEffect(() => {
    setNoteContent(notesDataArr);
  }, [notesDataArr]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(NoteContent)); // Save notes to local storage whenever items change
  }, [NoteContent]);

  // handling inputs

  const handleTextArea = (e) => {
    setTextInput(e.target.value);
  }

  //  inputs submit 

  const handleSubmit = () => {

    const { date, time } = getDateTime();
    const newNote = { TextInput, date, time };
    const newItems = [...NoteContent, newNote];
    setNoteContent(newItems);
    savedData(newItems);
    setTextInput("");
  }
console.log(bool)
  // funtion for the enter key from the keyboard

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (TextInput.trim()) {
        handleSubmit();
      }
    }
  };
  
  return (
    // header section
    <div className={style.body}>
      <header className={style.head}>
        <div className={style.heading}>
          {Size < 989 && (
            <div>
              <button className={style.button} onClick={() => setBool(!bool)}>←</button>
            </div>
          )}

          <div className={style.circle} style={{ backgroundColor: `${copyArray.color}` }}>{copyArray.sName}</div>
          <div className={style.ItemName}>{copyArray.item}</div>
        </div>
      </header>

      {/* main section */}
      <section className={style.cardSection}>
        <TextCard text={NoteContent} />
      </section>

      {/* footer section */}
      <footer className={style.footer}>
        <div className={style.text}>
          <textarea name="text" id="text" placeholder='Enter your text here...........'
            className={style.textArea}
            onKeyDown={handleKeyPress}
            value={TextInput}
            onChange={handleTextArea}
          >

          </textarea>
          <div className={style.img}>
            {TextInput === "" ? (<img src={ArrowImg} alt="Arrow" className={style.arrowImg}
              height={25} width={25}
              style={{ cursor: 'not-allowed' }} />) : (<img src={ActiveArrow} alt="Arrow" className={style.arrowImg}
                height={25} width={25} onClick={handleSubmit} />)}
          </div>

        </div>
      </footer>
    </div>
  )
}

export default MyNotes
