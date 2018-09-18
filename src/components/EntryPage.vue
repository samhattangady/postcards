<template>
  <div>
    <div v-if='!signedIn'>
      <input v-model="email"></input>
      <input v-model="password" type="password"></input>
      <button v-on:click="signin">signin</button>
    </div>
    <div v-else>
      <br>
      <p>To</p>
      <input v-model="to"></input>
      <br>
      <p>Message:</p>
      <textarea rows=20 cols=50 v-model="entry"></textarea>
      <br>
      <p>{{numWords}}</p>
      <button v-on:click="addEntry">add</button>
      <br>
      <button v-on:click="signout">signout</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'EntryPage',
  data: function() {
    return {
      email: '',
      password: '',
      entry: '',
      to: '',
      signedIn: false,
      numWords: 0,
    }
  },
  mounted: function() {
    // check if signed in
    var _user = firebase.auth().currentUser;
    console.log(_user);
    if (_user == null) {
      this.signedIn = false;
    } else {
      this.signedIn = true;
    }
  },
  methods: {
    signin: function() {
        firebase.auth().signInWithEmailAndPassword(
          this.email, this.password).then(() => {
            console.log('signed in')
            this.signedIn = true;
          }).catch(function(error) {
          // Handle Errors here.
            console.log('error with sign in');
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
      });
    },
    signout: function() {
      firebase.auth().signOut().then(() => {
        console.log('signed out');
        this.signedIn = false;
      }).catch(function(err) {
        console.log('couldnt sign out')
        console.log(err);
      })
    },
    addEntry: function() {
      firebase.firestore().collection('postcards').add({
        message: this.entry,
        to: this.to,
        rating: 0,
        tags: [],
        date: Date.now()
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        this.$router.push('/');
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    }
  },
  watch: {
    entry: function() {
      this.numWords = this.entry.split(' ').length - 1;
    }
  }
}
</script>

