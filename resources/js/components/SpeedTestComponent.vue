<template>
    <div>
        <div class="container is-fluid">
            <br>
            <nav v-if="SpeedTest != false" class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Latence</p>
                        <p class="title is-4 count">{{speedTest.ping}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Download</p>
                        <p class="title is-4 count">{{speedTest.download}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Upload</p>
                        <p class="title is-4 count">{{speedTest.upload}}</p>
                    </div>
                </div>
            </nav>
            <div class="center_btn">
                <button @click="SpeedTest" type="button" class="btn btn-lg btn-outline-success">
                    <span v-if="loading === true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Spustit Test
                </button>
             </div>
         </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            speedTest: false,
            loading: false,
        }
    },
    methods: {
        SpeedTest: function () {
            this.loading = true;
            let currentObj = this;
            axios.get('/api/device/speedTest')
                .then(function (response) {
                    currentObj.speedTest = response.data;
                    currentObj.loading = false;
                })
                .catch(function (error) {
                    currentObj.speedTest = '';
                    currentObj.loading = false;
                });
        },
    }
}
</script>
