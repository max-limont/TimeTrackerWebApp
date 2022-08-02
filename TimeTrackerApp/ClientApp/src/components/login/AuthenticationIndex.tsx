
import React, {FC} from 'react';
import {AuthenticationForm} from "./AuthenticationForm";

export enum FormVariant {
    outlined='outlined',
    primary='primary'
}

interface FormProps {
    variant: FormVariant;
}

const imageStyle = {
    backgroundImage: `url(/images/workspace.jpg)`
}

export function AuthenticationIndex () {
    
    return (
        <div className={"container"}  style={imageStyle}>
            <div className={"flex-container h-fullscreen auth-container"}>
                <AuthenticationForm />
            </div>
        </div>
    );
};