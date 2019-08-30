const express = require('express')
const fs = require('fs')
const mustacheExpress = require('mustache-express')
const path = require('path')

const app = express()
const router = express.Router()
const port = 3000

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/resources/views')
app.set('view cache', false)

app.use('/public', express.static(path.join(__dirname, '/public'), {
  maxAge: '1d'
}))

//list of router
router.get('/rest/profile', ( req, res, next ) => {
  res.send({
    id: 1,
    name: "Atom"
  })
})

router.get('*', ( req, res ) => {
  //list version of file
  const manifest = JSON.parse(fs.readFileSync('./rev-manifest.json', 'utf8'))
  res.render('index', { manifest: {bundle: manifest["bundle.js"]} })
})

app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))