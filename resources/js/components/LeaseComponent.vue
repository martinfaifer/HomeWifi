<template>
    <div>
         <div class="container is-fluid">
            <router-view></router-view>
             <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th class="mobileFont" scope="col">IP</th>
                        <th class="hide_isMobile" scope="col">MAC</th>
                        <th class="mobileFont" scope="col">Výrobce</th>
                        <th class="mobileFont" scope="col">Popis</th>
                        <th class="hide_isMobile" scope="col">Naposledy viděn</th>
                        <th class="mobileFont" scope="col">status</th>
                        <th class="mobileFont" scope="col">Akce</th>
                    </tr>
                </thead>
                <transition name="fade" mode="out-in">
                <tbody>
                    <tr v-for="lease in leases" v-bind:key="lease.id">
                        <td class="mobileFont">{{lease.address}}</td>
                        <td class="hide_isMobile">{{lease["mac-address"]}}</td>
                        <td class="mobileFont">{{lease.vendor}}</td>
                        <td class="mobileFont">{{lease.comment}}</td>
                        <td class="hide_isMobile">{{lease["last-seen"]}}</td>
                        <td class="mobileFont">{{lease.status}}</td>
                        <td>
                            <form @submit.prevent="EditCommentModal(leaseId = lease.address)" class="inline_block">
                                <button @click="EditModal = true" type="submit"  class="btn btn-sm">
                                    <span class="icon has-text-info">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                </button>
                            </form>
                            <form @submit.prevent="RemoteLeaseModal(leaseId = lease.address)" class="inline_block" v-show="lease.status === 'waiting'">
                                <button type="submit"  class="btn btn-sm">
                                    <span class="icon has-text-danger">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </button>
                            </form>
                        </td>
                    </tr>
                </tbody>
                </transition>
            </table>
         </div>

         <!-- Modal -->
         <transition name="fade" mode="out-in">
         <div v-show="EditModal">
            <div class="modal is-active">
                <div class="modal-background" @click="EditModal=false"></div>
                    <div id="modal_grey_m">
                        <div id="modal_grey_m" class="container rounded" v-for="leaseEdit in edit" v-bind:key="leaseEdit.id">
                            <br>
                            <form @submit.prevent="EditComment()">
                                <div class="form-group">
                                    <label class="textColor_default">Změnit popis</label>
                                    <input type="text" class="form-control" v-model="commnet = leaseEdit.comment">
                                </div>
                                <button type="submit" class="btn btn-primary" @click="EditModal=false">Změnit</button>
                            </form>
                        <br>
                    </div>
                </div>
            </div>
        </div>
         </transition>
    </div>
</template>
<script>

export default {
    data() {
        return {
            DeleteModal: '',
            EditModal: false,
            leases: '',
            commnet: '',
            edit:'',
            interval: null,
            editResponse:'',
            leaseId:'',
        }
    },
    mounted(){
        this.loadDataLeases();
        this.interval = setInterval(function () {
            this.loadDataLeases();
        }.bind(this), 1000);
    },
    methods: {

        loadDataLeases: function () {
            let currentObj = this;
            axios.get('api/device/leases')
                .then(response => {
                    currentObj.leases = response.data;
                })
                .catch(error => {
                    currentObj.globalError = error;
                    currentObj.leases = '';
                    currentObj.interval = false;
                });
        },
        EditCommentModal() {
            let currentObj = this;
            axios.post('/api/device/lease/getEditData', {
                    leaseId: this.leaseId,
                })
                .then(response => {
                    currentObj.edit = response.data;
                    currentObj.EditModal = true;
                })
                .catch(error => {
                    currentObj.leaseId = '';
                    currentObj.EditModal = false;
                });
        },
        RemoteLeaseModal() {
            let currentObj = this;
            axios.post('/api/device/lease/remove', {
                    leaseId: this.leaseId,
                })
                .then(response => {
                    currentObj.editResponse = response.data;
                    currentObj.EditModal = false;
                })
                .catch(error => {
                    currentObj.leaseId = '';
                    currentObj.EditModal = false;
                });

        },
        EditComment() {
            let currentObj = this;
            axios.post('/api/device/lease/edit', {
                    leaseId: this.leaseId,
                    commnet: this.commnet,
                })
                .then(response => {
                    currentObj.editResponse = response.data;
                    currentObj.EditModal = false;
                })
                .catch(error => {
                    currentObj.leaseId = '';
                    currentObj.commnet = '',
                    currentObj.EditModal = false;
                });
        }
    },
    created(){
        axios.get('api/device/leases')
                .then( response => this.leases = response.data);
    },
    beforeDestroy: function(){
        clearInterval(this.interval);
    },
}
</script>
