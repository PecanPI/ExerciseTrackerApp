import {useState, useCallback, useEffect} from 'react'

let logoutTimer;

function useAuth(){
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [tokenExperationDate, setTokenExprationDate] = useState();
  
    const login = useCallback((uid, token, expirationDate) => {
      setUserId(uid);
      setToken(token);
      const tokenExperationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //ms * s * h === 1hr
      setTokenExprationDate(tokenExperationDate)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExperationDate.toISOString(),
        })
      );
    }, []);
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      setTokenExprationDate(null);
      localStorage.removeItem("userData");
    }, []);
  
  useEffect(()=>{
    if(token && tokenExperationDate){
      const remainingtime = tokenExperationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingtime)
    } else {
      clearTimeout(logoutTimer)
    }
  },[token, logout, tokenExperationDate])
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(
          storedData.userId,
          storedData.token,
          new Date(storedData.expiration)
        );
      }
    }, [login]);

    return {token, login, logout, userId}
}


export default useAuth