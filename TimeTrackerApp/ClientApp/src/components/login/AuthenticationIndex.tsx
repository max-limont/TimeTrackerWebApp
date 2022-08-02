import {AuthenticationForm} from "./AuthenticationForm";



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