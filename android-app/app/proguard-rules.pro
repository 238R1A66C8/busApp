# Add project specific ProGuard rules here.# Add project specific ProGuard rules here.

# You can control the set of applied configuration files using the# You can control the set of applied configuration files using the

# proguardFiles setting in build.gradle.# proguardFiles setting in build.gradle.

##

# For more details, see# For more details, see

#   http://developer.android.com/guide/developing/tools/proguard.html#   http://developer.android.com/guide/developing/tools/proguard.html



# If your project uses WebView with JS, uncomment the following# Keep WebView JavaScript interface

# and specify the fully qualified class name to the JavaScript interface-keepclassmembers class * {

# class:    @android.webkit.JavascriptInterface <methods>;

#-keepclassmembers class fqcn.of.javascript.interface.for.webview {}

#   public *;

#}# Keep location-related classes

-keep class android.location.** { *; }
# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Keep Capacitor and Cordova classes
-keep class com.getcapacitor.** { *; }
-keep class org.apache.cordova.** { *; }

# Keep custom plugins
-keep public class * extends com.getcapacitor.Plugin
-keep public class * extends org.apache.cordova.CordovaPlugin

# Keep javascript interfaces
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}