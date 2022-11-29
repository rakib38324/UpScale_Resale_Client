import { useEffect, useState } from "react"

const UserHook = email =>{
    const [isUser, setIsUser] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true)

    useEffect(()=>{
        
        if(email){
            fetch(`https://up-scale-re-sale-server.vercel.app/users/UserHook/${email}`)
            .then(res => res.json())
            .then(data => {
            //    console.log(data)
                setIsUser(data.isUser);
           
                setIsUserLoading(false);
            });
        }
    },[email])
    return [isUser, isUserLoading]
}

export default UserHook;