import React, {useContext} from 'react'
import { AuthContext } from "../shared/context/auth-context";

function LandingPage() {
    const auth = useContext(AuthContext);
    console.log(auth);
    return (
        <div>
            this is a test page
        </div>
    )
}

export default LandingPage
