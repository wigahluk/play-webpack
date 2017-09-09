import play.sbt.PlayImport.PlayKeys.playRunHooks

name := """play-webpack"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.2"

libraryDependencies ++= Seq(
  guice,
  ws,
  "org.scalatestplus.play" %% "scalatestplus-play" % "3.0.0" % Test
)

// Starts: Prevent documentation of API for production bundles
sources in (Compile, doc) := Seq.empty
publishArtifact in (Compile, packageDoc) := false
// Ends.

//resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Starts: Webpack build task
lazy val isWin = System.getProperty("os.name").toUpperCase().contains("WIN")
val appPath = if (isWin) "app\\frontend" else "./app/frontend"
val webpackBuild = taskKey[Unit]("Webpack build task.")

webpackBuild := {
  if (isWin) Process("cmd /c npm run build", file(appPath)) !
  else Process("npm run build", file(appPath)) !
}

(packageBin in Universal) := ((packageBin in Universal) dependsOn webpackBuild).value
// Ends.

// Starts: Webpack server process when running locally and build actions for production bundle
lazy val frontendDirectory = baseDirectory {_ / appPath}
playRunHooks += frontendDirectory.map(WebpackServer(_)).value
// Ends.
