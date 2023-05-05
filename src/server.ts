// initial express app class
import app from './app'
import { getLocalConfig } from './configs/app.conf'

const port = getLocalConfig().port

app.listen(port, () => {
  console.log(`⚡️[Node.JS]: Server is running at http://localhost:${port}`)
})
