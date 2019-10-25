<template>
    <div>
         <div class="container is-fluid">
             <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th class="mobileFont" scope="col">URL</th>
                        <th class="mobileFont" scope="col">Akce
                            <button @click="AddModal = true"  class="btn btn-sm">
                                <span class="icon has-text-info mobileFont">
                                    <i class="fas fa-plus"></i>
                                </span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="url in blokovane" v-bind:key="url.id">
                        <td class="mobileFont">{{url["tls-host"]}}</td>
                        <td class="mobileFont">
                            <form @submit="RemoveUrl(urlId = url.id)" class="inline_block">
                                <button type="submit"  class="btn btn-sm">
                                    <span class="icon has-text-danger mobileFont">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>
         <!-- Modals -->
        <div v-show="AddModal">
            <div class="modal is-active">
                <div class="modal-background" @click="AddModal=false"></div>
                <div id="modal_grey_m">
                    <div id="modal_grey_m" class="container rounded">
                        <br>
                        <form @submit="AddBlocked()">
                            <div class="form-group">
                                <label class="textColor_default">WWW adresa, kterou chcete blokovat</label>
                                <input type="text" class="form-control" v-model="url" placeholder="www.seznam.cz" pattern="[www]{3}[.][a-zA-Z]{1,64}[.][a-z]{1,6}" required>
                            </div>
                            <button type="submit" class="btn btn-primary" @click="AddModal=false">Přidat</button>
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            blokovane: '',
            url:'',
            urlId: '',
            AddResponse: '',
            DeleteResponse: '',
            RemoveModal: false,
            AddModal: false,
        }
    },
    created(){
        axios.get('/api/device/kidControll/www')
                .then( response => this.blokovane = response.data);
    },
    methods: {
        RemoveUrl() {
            let currentObj = this;
            axios.post('/api/device/kidControll/www/remove', {
                    urlId: this.urlId,
                })
                .then(function (response) {
                    currentObj.DeleteResponse = response.data;
                    currentObj.urlId = '',
                    axios.get('/api/device/kidControll/www')
                        .then( response => currentObj.blokovane = response.data);
                })
                .catch(function (error) {
                    currentObj.urlId = '';
                    currentObj.AddModal = false;
                });
        },
        AddBlocked() {
            let currentObj = this;
            axios.post('/api/device/kidControll/www', {
                    url: this.url,
                })
                .then(function (response) {
                    currentObj.AddResponse = response.data;
                    currentObj.url = '',
                    axios.get('/api/device/kidControll/www')
                        .then( response => currentObj.blokovane = response.data);
                })
                .catch(function (error) {
                    currentObj.url = '';
                    currentObj.AddModal = false;
                });
        }
    },
}
</script>
