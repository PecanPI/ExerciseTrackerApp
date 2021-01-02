import React, {useContext} from 'react'
import { AuthContext } from "../shared/context/auth-context";

function LandingPage() {
    const auth = useContext(AuthContext);
    console.log("you made it here user: " + auth.userId);
    return (
        <div>
            <h1>THIS IS A TEST PAGE</h1>this is a test page
        </div>
    )
}

export default LandingPage
