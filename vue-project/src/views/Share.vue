<template>
    <div class="container">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Düşüncelerini Yaz</label>
            <input v-model="text" type="text"  class="form-control" id="exampleFormControlInput1" placeholder="Bugün çok mutluyum" >
        </div>
        <div class="mb-3 text-center">
            <button @click="handleClick" type="button" class="btn btn-dark">Gönder</button>
        </div>
        <hr />
        <div class="mb-3">
            <ol class="list-group list-group-numbered">
                <li v-for="g in gonderiler" :key="g.id"  class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                    <div class="fw-bold">{{g.gonderi}}</div>
                        {{ g.tarih }}
                    </div>
                    <span class="badge bg-primary rounded-pill">{{g.yorumlar.length}}</span>
                    <span @click="handleDelete(g.id)" class="badge bg-danger mx-2"><i class="bi bi-x"></i></span>
                </li>
   
            </ol>
        </div>
   
    </div>
</template>
<script>
import {ref} from 'vue'
import getUser from '../composable/getUser'
import {addDoc,collection,serverTimestamp,onSnapshot,query,where,deleteDoc,doc} from "firebase/firestore"
import {db} from '../firebase/config'
import moment from "moment"

export default {
    setup(){
        const {user} = getUser();
        const text = ref('');
        const gonderiler = ref([])
        moment.locale('tr')

        const q = query(collection(db,'gonderiler'),where('gKullaniciAd',"==",user.value.displayName))
        onSnapshot(q,querySnapshot => {
            const dizi = [];
            querySnapshot.forEach(doc=>{
                dizi.push({...doc.data(),id:doc.id,tarih:moment(doc.data().tarih?.toDate()).locale('tr').format('LL')})
            })
            gonderiler.value = dizi;
        })

        const handleClick = async () => {
            if(user.value){
                await addDoc(collection(db,'gonderiler'),{
                    gKullaniciAd:user.value.displayName,
                    gonderi:text.value,
                    tarih: serverTimestamp (),
                    yorumlar:[]
                })
                text.value=''
            }
        }

        const handleDelete = async(id) => {
            await deleteDoc(doc(db,"gonderiler",id))

        }
        return {text,handleClick,gonderiler,handleDelete}
    }
}
</script>