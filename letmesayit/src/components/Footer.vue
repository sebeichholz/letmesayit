<template>
  <!-- #####################  Footer ###################### -->
  <div id="footer">
    <a href="impressum.html">Impressum</a>
    <a href="datenschutz.html">Datenschutz</a>
    <a href="https://github.com/sebeichholz/letmesayit" target="_blank">Source Code</a>
    <a href="https://www.facebook.com/LetMeSayIt.org/" target="_blank"><img src="static/_icons/FB-f-Logo__blue_29.png" border="0" id="facebook"/></a>
  </div>
</template>

<script>
export default {
  name: 'footer2',
  data () {
    return {
    }
  },
  methods: {
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  #footer a {
    margin-right: 2mm;
    border: 0px solid blue;
  }

  #footer {
    position: fixed;
    bottom: 2px;
    right: 5px;
    opacity: 0.7;
    text-align: right;
    width: 100%;
    font-size: 8pt;
  }

/* Ansicht für Tablets */
@media screen and (min-width: 38.75em) {

    #footer a {
        margin-right: 1cm;
    }

    #footer {
        font-size: 14pt;
    }

    #facebook {
        display: inline;
    }

}


</style>
