<template>
  <div class='container'>
    <h1> Postcards from Sam </h1>
    <p class='sub'> Writing Abstract Postcards for Abstract Purposes </p>
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
  background-color: #cfd8dc;
}
.sub {
  text-align: center;
  margin-top: -30px;
  font-size: 16px;
}
.content {
  max-width: 800px;
}
.single-card {
  margin: 10px;
  margin-bottom: 40px;
  background-color: #eceff1;
  padding: 30px;
  box-shadow: 5px 8px #546e7a33;
  display: flex;
}
.to-col {
  min-width: 100px;
  flex-grow: 3;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}
.date {
  padding-top: 15px;
}
.message-col {
  flex-grow: 1;
  padding-left: 10px;
}
</style>
