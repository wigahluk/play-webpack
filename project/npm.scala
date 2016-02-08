import java.io.File
import java.net.InetSocketAddress

import play.sbt.PlayRunHook
import sbt._

object WebpackServer {
    def apply(base: File): PlayRunHook = {

        object WebpackServerScript extends PlayRunHook {

            var process: Option[Process] = None // This is really ugly, how can I do this functionally?

            override def afterStarted(addr: InetSocketAddress): Unit = {
                process = Some (Process("npm start", base).run)
            }

            override def afterStopped(): Unit = {
                process.map(p =>
                    {
                        p.destroy()
                    }
                )
                process = None
            }
        }

        WebpackServerScript
    }
}
