import React, {FC, useState} from 'react';
import styles from './CreateUser.module.scss';
import utilstyle from './util.module.scss'

export enum FormVariant {
    outlined='outlined',
    primary='primary'
}

interface FormProps{
    children: React.ReactNode;
    variant: FormVariant;
}
const imageStyle =
{
    backgroundImage: `url(/images/workspace.jpg)`
}


const RegBackForm: FC<FormProps> =
    ({
        children,
        variant}) => {
    return (
        <div className={`${styles.limiter}`}>
        <div className={`${styles.container}`} style={imageStyle}>
            <div className={`${styles.wrapContainer} ${utilstyle['p-b-33']} ${utilstyle['p-t-5']}`}>
            <form className={`${styles.loginForm} ${utilstyle['p-t-30']} ${utilstyle['p-b-50']}`}>
                {children}
            </form>
        </div>
        </div>
        </div>
    );
};

export default RegBackForm;