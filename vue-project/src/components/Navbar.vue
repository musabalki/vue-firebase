<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" v-if="user">
                <router-link to="/share" class="nav-link active" aria-current="page" href="#">Paylaş</router-link >
              </li>
            </ul>
            <div class="d-flex">
              <router-link to="/login" v-if="!user" class="btn btn-outline-success">Giriş</router-link>
              <button @click="handleSignOut" v-if="user" class="btn btn-outline-success">Çıkış</button>
            </div>
          </div>
        </div>
      </nav>
</template>
<script>
import getUser from "../composable/getUser"
import {auth} from "../firebase/config"
import { signOut } from "@firebase/auth";
import { useRouter } from "vue-router";
export default {
  setup(){
    const {user} = getUser();
    const router = useRouter();

    const handleSignOut =async () =>{
        await signOut(auth)
        router.push({name:'login'})
    }
    return {user,handleSignOut}
  }
}

</script>