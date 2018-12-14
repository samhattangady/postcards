<template>
  <div class='container'>
    <h1> Postcards from Sam </h1>
    <div v-for="postcard in postcards" class='content'>
      <div class='single-card'>
        <div class='to-col'>
          <div class='recepient'>
            To: 
            <br>
            {{postcard.to}}
          </div>
          <div class='date'>
            {{toDate(postcard.date)}}
          </div>
        </div>
        <hr>
        <div class='message-col'>
          {{postcard.message}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'LandingPage',
  data: function() {
    return {
      message: 'postcards',
      postcards: [],
      entry: null,
    }
  },
  mounted: function() {
    this.postcards = []
    let firestore_postcards = firebase.firestore().collection('postcards').orderBy('date', 'desc');
    firestore_postcards.get().then( response => {
      for (var i=0; i<response.docs.length; i++) {
        this.postcards.push(response.docs[i].data());
      }
    })
  },
  methods: {
    toDate: function(d) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let timestamp = new Date(d);
      return months[timestamp.getMonth()]+' '+timestamp.getDate()+', '+(1900+timestamp.getYear());
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff3e0;
}
.content {
  max-width: 800px;
}
.single-card {
  display: flex;
  margin-bottom: 40px;
  background-color: #efebe9;
  padding: 30px;
  border-radius: 13px;
  box-shadow: 5px 10px #32272333;
}
.to-col {
  flex-grow: 7;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.message-col {
  flex-grow: 1;
  padding-left: 10px;
}
</style>
