import React, { useState } from 'react'
import style from './Model.module.css';

function Model({ click, createGrp }) {
    const [input, setInput] = useState("");
    const [colorName, setColorName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [colorError, setColorError] = useState(false);
    const [colorSelected, setColorSelected] = useState(null);

    // Array of colors
    const Colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"]

    // Handle color selection
    const handleColorChange = (color, index) => {
        setColorName(color);
        setColorError(false);
        setColorSelected(index === colorSelected ? null : index);

    }

    // Function to handle input submission
    const handleChange = (e) => {
        setInput(e.target.value);
        setNameError(false)

    }

    // function for submiting values
    const handleInput = () => {
        if (!input) {
            setNameError(true);
        }
        else if (!colorName) {
            setColorError(true)
        }
        else {
            const sName = generateShortName();
            createGrp(input, colorName, sName);
            setInput("");
            click(false);
        }
    };

    // Generate short name from input
    const generateShortName = () => {
        let ans = input.split(" ");
        let res = "";
        if (ans.length >= 2) {
            ans.forEach(element => {
                res += element[0];
            });
            return res.slice(0, 2).toUpperCase();
        }
        else {
            return ans[0][0].toUpperCase();
        }
    };

    return (

        <div>
            <div className={style.container} onClick={() => click(false)}>
                <div className={style.child_container} onClick={(e) => e.stopPropagation()}>
                    <div className={style.child}>
                        <div className={style.head}><p>Create New group</p></div>
                        <div className={style.input}>
                            <label htmlFor="name" className={style.groupName}>Group Name</label>
                            <input
                                type="text"
                                placeholder='Enter group name'
                                value={input}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={style.error_msg}>
                            {nameError && (<p className={style.error}>*Please enter your name</p>)}
                        </div>
                        <div className={style.colors}><p>Choose colour</p>
                            <div className={style.circle}>{Colors.map((i, index) => {
                                return (
                                    <div key={index} className={colorSelected === index ? style.selected : ""}>
                                        <div className={style.bgCircle}
                                            style={{ backgroundColor: Colors[index] }}
                                            onClick={() => handleColorChange(Colors[index], index)}>
                                        </div>

                                    </div>
                                )
                            })}</div>
                        </div>
                        <div className={style.errorColor}>
                            {colorError && (<p className={style.error}>*Please select color</p>)}
                        </div>
                        <button className={style.btn} onClick={handleInput} type='submit'>Create</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Model
