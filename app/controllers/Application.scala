package controllers

import javax.inject.Inject

import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global
import play.api._
import play.api.mvc._
import play.api.libs.ws._
import play.api.mvc._
import play.api.Play

class Application @Inject()(ws: WSClient)  extends Controller {

    def index = Assets.at("/public", "index.html")

    def bundle(file:String) = Play.isDev match {
        case true => Action.async {
            ws.url("http://localhost:8080/bundles/" + file).get().map { response =>
                Ok(response.body)
            }
        }
        // If Production, use build files.
        case false => Assets.at("public/bundles", file)
    }

}
