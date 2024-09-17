import express, { Application } from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import { HOST, PORT } from "./config/environments"
import { startDB } from "./db/startDB"
import { userRouter } from "./routes/user.routes"
import { authRouter } from "./routes/auth.routes"
import { categoryRouter } from "./routes/category.routes"
import { brandRouter } from "./routes/brand.routes"

export default class Server {
    private app: Application
    private port: number
    private host: string

    constructor ( ) {
        this.app = express()
        this.port = parseInt(PORT)
        this.host = HOST
        this.connectDB()
        this.middlewares()
        this.routes()
    }

    private async connectDB(): Promise<void> {
        startDB()
    }

    private middlewares(): void {
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        this.app.use(express.json())
    }

    private routes(): void {
        this.app.use('/api/user', userRouter)
        this.app.use('/api/auth', authRouter)
        this.app.use('/api/category', categoryRouter)
        this.app.use('/api/brand', brandRouter)
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://${this.host}:${this.port}`)
        })
    }
}

export { Server }