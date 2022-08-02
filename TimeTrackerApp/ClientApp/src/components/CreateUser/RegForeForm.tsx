import React, {FC, useState} from 'react';
import styles from './CreateUser.module.scss';

interface FormProps {
    children: React.ReactNode
}

const RegForeForm: FC<FormProps> = () => {
    const [value, setValue] = useState<string>('')
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setValue(e.target.value);
    }
    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) =>        {
        console.log(value)
    }
    return (
        <>

            <span className={styles.title}>
                TimeTracker
            </span>
            <div className={styles.wrapInput}>
                <input className={styles.inputs} id={'login'} placeholder={'Email'} value={value} onChange={changeHandler} type="email"/>
            </div>
            <div className={styles.wrapInput}>
                <input className={styles.inputs} id={'firstname'} placeholder={'FirstName'} value={value} onChange={changeHandler} type="email"/>
            </div>
            <div className={styles.wrapInput}>
                <input className={styles.inputs} id={'lastname'} placeholder={'LastName'} value={value} onChange={changeHandler} type="email"/>
            </div>
            <div className={styles.wrapInput}>
            <input className={styles.inputs} id={'password'} placeholder={'Password'} value={value} onChange={changeHandler} type="text"/>
            </div>
            <div className={styles.formBtn}>
            <button className={styles.buttonsubmit} onClick={clickHandler}>
                Sign in
            </button>
            </div>
        </>
    );
};

export default RegForeForm;