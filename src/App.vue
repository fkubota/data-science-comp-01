<template>
  <v-app>
    <template>
      <v-overlay :value="show_overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-snackbar v-model="show_score_alert" top dark color='red' :timeout=2000>
        <h4>select your name</h4>
        <v-btn icon dark color='white' @click.native="show_score_alert = false">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-snackbar v-model="show_name_alert" top dark color='red' :timeout=2000>
        <h4>invalid submission style</h4>
        <v-btn icon dark color='white' @click.native="show_name_alert = false">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </template>
    <v-app-bar color="primary" dark app class='title'>
      <v-toolbar-title>Data Science Competition #1</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn x-large icon dark @click='getRankingTable'>
        <v-icon dark>mdi-cached</v-icon>
      </v-btn>
    </v-app-bar>
    <v-footer color="primary" dark app></v-footer>
    <v-card class="mx-auto" width=1000>
    <v-content>
      <v-container>
        <v-row align="end">
          <v-col>
            <v-spacer></v-spacer>
          </v-col>
          <v-col>
              <v-select v-model="selection_name" :items='names' label='select your name' prepend-icon="mdi-account-circle" style='width: 400px'></v-select>
              <v-file-input @change='fileSelect' show-size label='select your submission file' accept='.csv'></v-file-input>
          </v-col>
          <v-col>
              <v-btn large color='primary' @click='getScore' outlined target='#de' class="ma-2">
                <v-icon left>mdi-cloud-upload</v-icon> submit
              </v-btn>
          </v-col>
          <v-col>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
        <v-row justify='center' style='margin-top: 50px margin-bottom: 50px'>
          <v-expand-transition>
            <v-card v-if=show_score width=500 height=100>
              <div class="title grey--text text--darken-2" align='center'>
                your submission score is 
              </div>
              <div v-if="this.show_score" style='fontSize: 40px' class='primary--text' align='center'>
                  <p>{{score}}</p>
              </div>
            </v-card>
          </v-expand-transition>
        </v-row>

        <!-- <v-divider></v-divider> -->
        <div class="title grey--text text--darken-2" align='center' style='margin-top: 50px'>
          <p>Leaderboard</p>
        </div>
        <v-data-table
          :headers="headers" 
          :items="participants" 
          :items-per-page="100" 
          hide-default-footer
          class="table-striped table-bordered">
          <template v-slot:item.rank="{ item }">
            <v-chip :color="getColor(item.rank)">{{ item.rank }}</v-chip>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
    </v-card>
  </v-app>
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
        heroku_addr: 'https://data-science-comp-01.herokuapp.com/',
        show_score_alert: false,
        show_name_alert: false,
        show_score: false,
        show_overlay: false,
        test_api:'test_api',
        score: '...',
        hello: '',
        subData: '',
        rankingTable: '',
        sortBy: 'rank',
        sortDesc: false,
        selection_name: '',
        names: ['A', 'B', 'C'],
        dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
        headers: [
          {
            text: '#',
            align: 'center',
            sortable: false,
            value: 'rank',
          },
          { text: 'Name', value: 'name'},
          { text: 'Score', value: 'score'},
          { text: 'N_Submission', value: 'n_submission' },
        ],
        participants: [
          {
            rank: '...',
            name: '...',
            score: '...',
            n_submission: '...',
          },
        ],
      }
    },
    methods: {
      async testApi(){
        console.log('func-↓testApi')
        // POST
        // await axios.post('https://data-science-comp-01.herokuapp.com/test_func', {
        await axios.post(this.heroku_addr+'test_func', {
          test: 'hello_api',
        })
        .then((response) => {
          this.test_api = response.data.test_return
        })
      },
      readFileAsync (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            resolve(reader.result)
          }
          reader.onerror = reject
          reader.readAsText(file)
        })
      },
      async fileSelect(file){
        console.log('func-↓fileSelect')
        try {
          let csv = await this.readFileAsync(file)
          csv = csv.replace(/\r?\n/g, '\n');
          this.subData = csv;
        } catch (e) {
          console.log(e)
        }
      },
      async getScore(){
        console.log('func-↓getScore')
        if (this.selection_name == ''){
          // alert('select your name');
          this.show_score_alert = true
          return
        }
        this.show_score = false
        this.show_overlay = true
        // POST
        await axios.post(this.heroku_addr + 'get_score', {
          arg_subData: this.subData,
          arg_selection_name: this.selection_name,
        })
        .then((response) => {
          // this.score = response.data.score
          const score = response.data.score
          if (score == 'bad_submission'){
            // alert('invalid submission style');
            this.show_score_alert = true
          }else{
            this.score = score
            this.getRankingTable()
          }
        this.show_score = true
        this.show_overlay = false
        })
      },
      async getRankingTable(){
        console.log('func-↓getRankingTable')
        // POST
        // await axios.post('http://127.0.0.1:5003/get_ranking_table', {
        await axios.post(this.heroku_addr + 'get_ranking_table', {
        })
        .then((response) => {
          this.rankingTable = response.data.ranking_table
        })
        this.updateRankingTable()
      },
      async getParticipants(){
        console.log('func-↓getParticipants')
        // POST
        await axios.post(this.heroku_addr+'get_participants', {
        })
        .then((response) => {
          const names_str = response.data.participants
          const names = names_str.split(',')
          this.names = names
        })
      },
      updateRankingTable() {
        console.log('func-↓updateRankingTable')
        const participants = [];
        const lines = this.rankingTable.split("\n");
        lines.forEach(element => {
          const participantsData = element.split(",");
          const participant = {
            rank: participantsData[0],
            name: participantsData[1],
            score: participantsData[2],
            n_submission: participantsData[3]
          };
          participants.push(participant);
        this.participants = participants
        });
      },
      getColor (rank) {
        if (rank == 1) return 'amber accent-2'
        else if (rank == 2) return 'blue-grey lighten-4'
        else if (rank == 3) return '#B87333'
        else return 'white'
      },
    },
    // mounted () {
    created () {
      console.log('func-↓mounted')
      console.log(this.participants)
      this.getParticipants()
      this.getRankingTable()
    }
  }
</script>