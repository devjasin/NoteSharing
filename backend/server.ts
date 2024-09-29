import { env } from 'process'
import app from './src/app'
import envConfig from './src/config/config'
import connectToDatabase from './src/config/db'

const startServer=async()=>{
  await connectToDatabase()
  const port=envConfig.port||3000
  app.listen(port,()=>{
    console.log(`sever has running at ${port}`)
  })
}

startServer()