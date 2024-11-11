import React, { useEffect, useState } from 'react'
import MainPage from './components/MainPage'
import Model from './components/Model'

//  constant for localStorage key
const LOCAL_STORAGE_KEY = 'DataStorage';

function App() {
  const [model, setModel] = useState(false);

  // efficient initialization for localStorage retrieval
  const [groupInput, setGroupInput] = useState(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  });

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

   // Save to localStorage on groupInput change
  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);

    try{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(groupInput))
    }catch(error){
      console.error("Error saving to localStorage:", error);
    }
  }, [groupInput])


  const handleNoteChange = (Gname, Gcolor, GSname) => {
    const newNote = { Gname, Gcolor, GSname };
    const updatedNotes = [...groupInput, newNote];
    setGroupInput(updatedNotes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  };


  const handleModel = () => {
    setModel(!model);
  }

  
  return (
    <>
      <div className='main'>
        <MainPage click={handleModel} notes={groupInput}  Size = {screenSize.width} />
      </div>
      {model && (<div className="model">
        <Model click={handleModel} createGrp={handleNoteChange} />
      </div>)}
    </>
  )
}

export default App
