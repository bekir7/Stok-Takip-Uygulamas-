const stok={template:`
<div>
<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
Ürün Ekle
</button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Ürün Id
        </th>
        <th>
            Ürün Adı
        </th>
        <th>
            Kategori
        </th>
        <th>
            Stok Adet
        </th>
        <th>
            Ayarlar
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="stok in Stok">
        <td>{{stok.StokId}}</td>
        <td>{{stok.StokName}}</td>
        <td>{{stok.StokKategorisi}}</td>
        <td>{{stok.StokAdet}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(stok)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(stok.StokId)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        </td>
    </tr>
</tbody>
</thead>
</table>


<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 w-50 bd-highlight">
            <div class="input-group mb-3">
                <span class="input-group-text">Adı</span>
                <input type="text" class="form-control" v-model="StokName">
            </div>
            <div class="input-group mb-3">
            <span class="input-group-text">Kategori</span>
            <input type="text" class="form-control" v-model="StokKategorisi">
        </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Adet</span>
                <input type="int" class="form-control" v-model="StokAdet">
            </div>
        </div>
        
    </div>
        <button type="button" @click="createClick()"
        v-if="StokId==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="StokId!=0" class="btn btn-primary">
        Update
        </button>
    </div>
</div>
</div>
</div>
</div>

`,

data(){
    return{
        Kategori:[],
        Stok:[],
        modalTitle:"",
        StokId:0,
        StokName:"",
        StokKategorisi:"",
        StokAdet:0,
       
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"stok")
        .then((response)=>{
            this.Stok=response.data;
        });
    },
    addClick(){
        this.modalTitle="Ürün Ekle";
        this.StokId=0;
        this.StokName="";
        this.StokKategorisi="";
        this.StokAdet=0
        
    },
    editClick(stok){
        this.modalTitle="Ürün Ekle";
        this.StokId=stok.StokId;
        this.StokName=stok.StokName;
        this.StokKategorisi=stok.StokKategorisi,
        this.StokAdet=stok.StokAdet
    },
    createClick(){
        axios.post(variables.API_URL+"stok",{
            StokName:this.StokName,
            StokKategorisi:this.StokKategorisi,
            StokAdet:this.StokAdet
           
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"stok",{
            StokId:this.StokId,
            StokName:this.StokName,
            StokKategorisi:this.StokKategorisi,
            StokAdet:this.StokAdet
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Emin Misin?")){
            return;
        }
        axios.delete(variables.API_URL+"stok/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
   

},
mounted:function(){
    this.refreshData();
}

}