<template>
  <div class='container'>
    <h1> Postcards from Sam </h1>
    <p class='sub'> Writing Abstract Postcards for Abstract Purposes </p>
    <div class='cardlist'>
      <div v-for="postcard in postcards" class='content'>
        <div class='single-card' :id=postcard.id ref=postcard.id>
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
    <div class='shuffle-button' v-on:click='randomStory()'>
      <i class='material-icons'>shuffle</i>
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
    let firestorePostcards = firebase.firestore().collection('postcards').orderBy('date', 'asc');
    firestorePostcards.get().then( response => {
      for (var i=0; i<response.docs.length; i++) {
        let postcard = response.docs[i].data();
        postcard.id = i+1;
        this.postcards.push(postcard);
      }
    })
  },
  methods: {
    toDate: function(d) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let timestamp = new Date(d);
      return months[timestamp.getMonth()]+' '+timestamp.getDate()+', '+(1900+timestamp.getYear());
    },
    randomStory: function() {
      let randIndex = 1 + Math.floor(Math.random() * Math.floor(this.postcards.length));
      let yOffet = document.getElementById(randIndex).getBoundingClientRect().top - 20;
      window.scrollBy({
        top: yOffet,
        left: 0,
      });
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
.cardlist {
  display: flex;
  flex-direction: column-reverse;
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
.shuffle-button {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 48px;
  bottom: 48px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #455a64dd;
  color: #eceff1;
  text-align: center;
  box-shadow: 4px 4px 5px #455a6499;
  opacity: 0.3;
}
.shuffle-button:hover {
  opacity: 0.9;
  cursor: pointer;
}
</style>
