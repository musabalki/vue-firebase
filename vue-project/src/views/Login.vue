<template>
   <main class="form-signin m-auto w-100">
        <div class="row">
            <div class="col-12">
                <button @click="handleLogin" class="btn btn-success"> <i class="bi bi-google"> </i>   ile giriş</button>
            </div>  
        </div>
   </main>
</template>

<script>
import {auth} from "../firebase/config"
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {useRouter} from "vue-router"
export default{
    setup(){

        const router = useRouter(); 
        const handleLogin = () =>{
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth,provider).then(res=>{
                router.push({name:'home'})
            })
        }

        return {handleLogin}
    }
}


</script>

<style>
.form-signin{
   display: flex;
   justify-content: center;
   padding-top: 2rem;
}
</style>