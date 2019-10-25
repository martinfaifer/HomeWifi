<template>
    <div>
         <div class="container is-fluid">
             <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col">IP</th>
                        <th scope="col">Akce
                            <button @click="AddModal = true"  class="btn btn-sm">
                                <span class="icon has-text-info">
                                    <i class="fas fa-plus"></i>
                                </span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <form class="inline_block">
                                <button type="submit"  class="btn btn-sm">
                                    <span class="icon has-text-danger">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            dmztky: '',
            AddResponse: '',
            DeleteResponse: '',
            RemoveModal: false,
            AddModal: false,
        }
    },
    created(){

    },
    methods: {

    },
}
</script>

