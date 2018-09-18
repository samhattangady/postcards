<template>
  <div>
    <h1> Postcards from Sam </h1>
    <div v-for="postcard in postcards">
      To: 
      {{postcard.to}} : {{toDate(postcard.date)}}
      <br><br>
      {{postcard.message}}
      <hr>
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
      return new Date(d).toLocaleDateString('en-IN');
    }
  }
}
</script>
