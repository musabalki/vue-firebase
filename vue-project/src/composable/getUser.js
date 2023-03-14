import {ref} from "vue"
import { auth } from "../firebase/config"
import {onAuthStateChanged} from "firebase/auth"

const user = ref(auth.currentUser)

onAuthStateChanged(auth,u=>{
    user.value=u
})
const getUser = () => {
    return {user}
}

export default getUser;