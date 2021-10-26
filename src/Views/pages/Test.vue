<template>
<v-container grid-list-md fluid class="tiny_data_table">
                <v-layout row>
                                <v-flex xs3 sm3 md3>
                                                <v-card tile outlined class="tabledetail">
                                                                <v-card-text class="pa-2" style="height:190px">
                                                                                <table style="width: 100%; font-size: 13px; color: black">
                                                                                                <tr>
                                                                                                                <td class="font-weight-light" width="75px">Id:</td>
                                                                                                                <td class="font-weight-medium" width="">
                                                                                                                                {{selectDataDetail.id }}
                                                                                                                </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                                <td class="font-weight-light">CreatedAt:</td>
                                                                                                                <td class="font-weight-medium" colspan="3">
                                                                                                                                {{selectDataDetail.createdAt ? $moment(selectDataDetail.createdAt).format(`MM/DD/YYYY`) : '' }}
                                                                                                                </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                                <td class="font-weight-light">Title:</td>
                                                                                                                <td class="font-weight-medium" width="">
                                                                                                                                {{ selectDataDetail.title }}
                                                                                                                </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                                <td class="font-weight-light">Image:</td>
                                                                                                                <td class="font-weight-medium">{{selectDataDetail.image}}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                                <td class="font-weight-light">Content:</td>
                                                                                                                <td class="font-weight-medium">{{selectDataDetail.content}}</td>
                                                                                                </tr>
                                                                                </table>
                                                                </v-card-text>
                                                </v-card>
                                </v-flex>
                                <v-flex xs9 sm9 md9>
                                                <v-layout justify-end>
                                                                <v-col cols="12" sm="2" md="2" class="btn-sort">
                                                                                <v-layout justify-end>
                                                                                                <v-btn medium color="success" @click="sorting">sort</v-btn>
                                                                                </v-layout>

                                                                </v-col>
                                                                <v-col cols="12" sm="2" md="2" class="btn-search">
                                                                                <v-layout justify-end>
                                                                                                <v-btn medium color="primary" @click="searchData">
                                                                                                                <v-icon>mdi-magnify</v-icon>
                                                                                                </v-btn>
                                                                                </v-layout>

                                                                </v-col>
                                                                <v-col cols="12" sm="2" md="2">
                                                                                <v-layout justify-end>
                                                                                                <v-text-field v-model="search" label="Search" solo dense @keydown.enter="searchData"></v-text-field>
                                                                                </v-layout>

                                                                </v-col>

                                                </v-layout>

                                                <v-card tile outlined class="tiny_form tabledata">
                                                                <v-data-table dense loader-height="2" disable-sort :loading="loading" :items="dataTable" :items-per-page="-1" :headers="header" fix-header hide-default-footer class="elevation-0 tiny_data_table" height="451px">

                                                                                <template v-slot:item="{item}">
                                                                                                <tr @click="SelectItem(item)" :class="{active: dataDetail == item ?'#e0eafc':''}">
                                                                                                                <td style="text-align:center;">{{ item.id}}</td>
                                                                                                                <td style="text-align:center;">{{ $moment(item.createdAt).format(`MM/DD/YYYY`)}}</td>
                                                                                                                <td style="text-align:center;">{{ item.title }}</td>
                                                                                                                <td style="text-align:center;">{{ item.image }}</td>
                                                                                                                <td style="text-align:center;">{{ item.content }}</td>
                                                                                                </tr>
                                                                                </template>
                                                                </v-data-table>
                                                </v-card>

                                                <v-layout style="height:20px;" justify-end>
                                                                <v-pagination v-model="page" total-visible="5" :length="pageCount" circle @input="nextPage(page)"></v-pagination>
                                                </v-layout>
                                </v-flex>
                </v-layout>

</v-container>
</template>

<script>
import axios from "axios";
export default {

                data: () => ({
                                header: [{
                                                                text: "Id",
                                                                value: "id",
                                                                align: "center"
                                                },
                                                {
                                                                text: "CreatedAt",
                                                                value: "createdAt",
                                                                align: "center"
                                                },
                                                {
                                                                text: "Title",
                                                                value: "title",
                                                                align: "center"
                                                },
                                                {
                                                                text: "Image",
                                                                value: "image",
                                                                align: "center"
                                                },
                                                {
                                                                text: "Content",
                                                                value: "content",
                                                                align: "center"
                                                }
                                ],

                                dataTable: [],
                                dataDetail: [],
                                selectDataDetail: [],
                                loading: false,
                                page: 1,
                                pageCount: 0,
                                search: "",
                }),
                mounted() {
                                this.getData();
                },
                methods: {
                                SelectItem(item) {
                                                this.dataDetail = item;
                                                this.selectDetail();
                                },

                                getData() {
                                                this.loading = true;
                                                let datatosend = {};
                                                axios.get(this.$store.state.ApiPathBlog, datatosend)
                                                                .then(resp => {
                                                                                console.log(resp);
                                                                                if (resp.status == 200) {
                                                                                                this.dataTable = resp.data;
                                                                                                this.pageCount = ( this.dataTable.length / 10);
                                                                                } else {
                                                                                                this.$store.state.Snack.show = true;
                                                                                                this.$store.state.Snack.msg = resp.data.msg;
                                                                                                this.$store.state.Snack.color = "error";
                                                                                }
                                                                                this.loading = false;
                                                                })
                                                                .catch(err => {
                                                                                this.$store.state.Snack.msg = err.message;
                                                                                this.$store.state.Snack.color = "error";
                                                                                this.$store.state.Snack.show = true;
                                                                                console.log(JSON.stringify(err));
                                                                                this.loading = false;
                                                                });
                                },
                                nextPage(item) {
                                                this.page = item;
                                                this.selectDataFollowPage(this.page);
                                },
                                selectDataFollowPage(pagenumber) {
                                                this.loading = true;
                                                axios.get(this.$store.state.ApiPathBlog, {
                                                                                params: {
                                                                                                page: pagenumber,
                                                                                                limit: 10
                                                                                }
                                                                })
                                                                .then(resp => {
                                                                                if (resp.status == 200) {
                                                                                                this.dataTable = resp.data;
                                                                                } else {
                                                                                                this.$store.state.Snack.show = true;
                                                                                                this.$store.state.Snack.msg = resp.data.msg;
                                                                                                this.$store.state.Snack.color = "error";
                                                                                }
                                                                                this.loading = false;
                                                                })
                                                                .catch(err => {
                                                                                this.$store.state.Snack.msg = err.message;
                                                                                this.$store.state.Snack.color = "error";
                                                                                this.$store.state.Snack.show = true;
                                                                                console.log(JSON.stringify(err));
                                                                                this.loading = false;
                                                                });
                                },
                                searchData() {
                                                this.loading = true;
                                                axios.get(this.$store.state.ApiPathBlog,{params: {
                                                                                                search: this.search
                                                                                }
                                                                                } )
                                                                .then(resp => {
                                                                                if (resp.status == 200) {
                                                                                                this.dataTable = resp.data;
                                                                                                this.pageCount = (this.dataTable.length / 10);
                                                                                } else {
                                                                                                this.$store.state.Snack.show = true;
                                                                                                this.$store.state.Snack.msg = resp.data.msg;
                                                                                                this.$store.state.Snack.color = "error";
                                                                                }
                                                                                this.loading = false;
                                                                })
                                                                .catch(err => {
                                                                                this.$store.state.Snack.msg = err.message;
                                                                                this.$store.state.Snack.color = "error";
                                                                                this.$store.state.Snack.show = true;
                                                                                console.log(JSON.stringify(err));
                                                                                this.loading = false;
                                                                });
                                },
                                selectDetail() {

                                                axios.get(this.$store.state.ApiPathBlog + "/"+ this.dataDetail.id)
                                                                .then(resp => {
                                                                                if (resp.status == 200) {
                                                                                                this.selectDataDetail = resp.data;
                                                                                } else {
                                                                                                this.$store.state.Snack.show = true;
                                                                                                this.$store.state.Snack.msg = resp.data.msg;
                                                                                                this.$store.state.Snack.color = "error";
                                                                                }
                                                                })
                                                                .catch(err => {
                                                                                this.$store.state.Snack.msg = err.message;
                                                                                this.$store.state.Snack.color = "error";
                                                                                this.$store.state.Snack.show = true;
                                                                                console.log(JSON.stringify(err));
                                                                });
                                },
                                sorting() {
                                                this.loading = true;
                                                axios.get(this.$store.state.ApiPathBlog, {
                                                                                params: {
                                                                                                sortBy: "createdAt",
                                                                                                order: "desc"
                                                                                }
                                                                })
                                                                .then(resp => {
                                                                                if (resp.status == 200) {
                                                                                                this.dataTable = resp.data;
                                                                                               this.pageCount = (this.dataTable.length / 10);
                                                                                } else {
                                                                                                this.$store.state.Snack.show = true;
                                                                                                this.$store.state.Snack.msg = resp.data.msg;
                                                                                                this.$store.state.Snack.color = "error";
                                                                                }
                                                                                this.loading = false;
                                                                })
                                                                .catch(err => {
                                                                                this.$store.state.Snack.msg = err.message;
                                                                                this.$store.state.Snack.color = "error";
                                                                                this.$store.state.Snack.show = true;
                                                                                console.log(JSON.stringify(err));
                                                                                this.loading = false;
                                                                });
                                },

                },
                watch: {}
};
</script>

<style scoped>
.tabledata {
                margin-top: -2%
}

.tabledetail {
                margin-top: 15%
}

.btn-search {
                margin-right: -1%;
                margin-top: 2px;
}

.btn-sort {
                margin-right: -4%;
                margin-top: 2px;
}
</style>
