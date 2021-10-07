import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (isDone:boolean,id:string) => void
    filter: FilterValuesType
}
export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState( true)

    const addTask = () => {
        props.addTask(title);
        setTitle("");
        setError(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

     const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>,id: string) => {
         props.changeStatus(event.currentTarget.checked,id)
     }

    return <div className={styles.container}>
    <div className={styles.block}>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''} value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>Title is requred</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)



                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(event  ) => onChangeHandlerForChangeStatus(event,t.id)} />
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? styles.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === "active" ? styles.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === "completed" ? styles.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
     </div>
}
