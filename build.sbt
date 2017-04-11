import play.sbt.PlayImport.PlayKeys.playRunHooks

name := """play-webpack"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
    cache,
    ws,
    specs2 % Test
)

// Starts: Prevent documentation of API for production bundles
sources in (Compile, doc) := Seq.empty
publishArtifact in (Compile, packageDoc) := false
// Ends.


resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

// Starts: Webpack build task
lazy val isWin = System.getProperty("os.name").toUpperCase().indexOf("WIN") >= 0
val appPath = if (isWin) "\\app\\frontend" else "./app/frontend"
val webpackBuild = taskKey[Unit]("Webpack build task.")
webpackBuild := {
    if (isWin) Process("cmd /c npm run build", file(appPath)).run else Process("npm run build", file(appPath)).run
}
(packageBin in Universal) <<= (packageBin in Universal) dependsOn webpackBuild
// Ends.


// Starts: Webpack server process when running locally and build actions for productionbundle
lazy val frontendDirectory = baseDirectory {_ / appPath}
playRunHooks <+= frontendDirectory.map(base => WebpackServer(base))
// Ends.
