import styles from './SearchBar.module.css';
import { useState } from 'react';

const SearchBar = ({taskList, setResults}) => {

    const [darkMode, setDarkMode] = useState(false);
    const [searchInput, setSearchInput] = useState('')

    function handleInput (userInput) {
        if (!userInput) {
            setResults(taskList)
        }
        else {
        setSearchInput(userInput)
        const searchResults = taskList.filter(tasks => {
            return tasks && (tasks.task_name.includes(searchInput) || tasks.task_description.includes(searchInput)) 
        })
        // console.log(searchResults)
            if (searchResults.length > 0) {
                setResults(searchResults)
            }
        }
    }

    function toggleDarkMode() {
        setDarkMode(!darkMode)
        const body = document.body;
        if(darkMode) {

            body.style.backgroundColor = 'black';
        }
        else {
            body.style.backgroundColor = 'white'
        }
    }

    return (
        <div className={styles.headerFunction}>
            <div className={styles.searchBar}>
                <input id='searchBox' className={styles.inputBox} placeholder='Search your tasks' type='text' onChange={(e)=> {
                    handleInput(e.target.value)
                }}>
                </input>
                <svg className={styles.searchIcon} onClick={(e)=>{
                    handleInput(e.target.valuet)
                }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6C63FF"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </div>
            <div className={styles.darkMode}>
                <svg onClick={toggleDarkMode} xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>
            </div>
        </div>
    )
}

export default SearchBar;