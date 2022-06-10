# Eject your application

first you have to eject your application with:
```
$ expo eject
```
And just press enter..
(run in sudo if necessary)
```
➜  client_mobile git:(client_mobile_contentPage) ✗ expo eject
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   There is a new version of expo-cli available (4.1.6).                 │
│   You are currently using expo-cli 4.1.3                                │
│   Install expo-cli globally using the package manager of your choice;   │
│   for example: `npm install -g expo-cli` to get the latest version      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
Warning! Your git working tree is dirty.
It's recommended to commit all your changes before proceeding, so you can revert the changes made by this command if necessary.

✔ Would you like to proceed? … yes

✔ Created native projects | /android, /ios already created | gitignore already synced
✔ Updated package.json and added index.js entry point for iOS and Android.
📦 Using npm to install packages.
✔ Cleaned JavaScript dependencies.
✔ Installed JavaScript dependencies.
⠙ Config syncing
Using node to generate images. This is much slower than using native packages.
› Optionally you can stop the process and try again after successfully running `npm install -g sharp-cli`.

✔ Config synced

➡️  Next steps
› 🍫 When CocoaPods is installed, initialize the project workspace: npx pod-install
› 💡 You may want to run npx @react-native-community/cli doctor to help install any tools that your app may need to run your native projects.
› 🔑 Download your Android keystore (if you're not sure if you need to, just run the command and see): expo fetch:android:keystore
› 📁 The property assetBundlePatterns does not have the same effect in the bare workflow. Learn more: https://docs.expo.io/bare/updating-your-app/#embedding-assets
```

# Generating an upload key

With this command generate the keystore file that let you create your apk:
```
$ keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You should have something like this in output just follow the step

```
Entrez le mot de passe du fichier de clés :  
Ressaisissez le nouveau mot de passe : 
Quels sont vos nom et prénom ?
  [Unknown]:  
Quel est le nom de votre unité organisationnelle ?
  [Unknown]:  
Quel est le nom de votre entreprise ?
  [Unknown]:  
Quel est le nom de votre ville de résidence ?
  [Unknown]:  
Quel est le nom de votre état ou province ?
  [Unknown]:  
Quel est le code pays à deux lettres pour cette unité ?
  [Unknown]:  
Est-ce CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown ?
  [non]:  oui

Génération d'une paire de clés RSA de 2 048 bits et d'un certificat auto-signé (SHA256withRSA) d'une validité de 10 000 jours
	pour : CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown
Entrez le mot de passe de la clé pour <my-key-alias>
	(appuyez sur Entrée s'il s'agit du mot de passe du fichier de clés) :  
[Stockage de my-upload-key.keystore]

Warning:
Le fichier de clés JKS utilise un format propriétaire. Il est recommandé de migrer vers PKCS12, qui est un format standard de l'industrie en utilisant "keytool -importkeystore -srckeystore my-upload-key.keystore -destkeystore my-upload-key.keystore -deststoretype pkcs12".
```

move ***my-upload-key.keystore*** previously generated in the ***/android/app/***

# Modification related to android project

## Setting up Gradle variables

go to your **/android/gradle.properties** and add at the end of the file:

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```
Replace the ***** with the password that you use to create your keystore file

In the same file in the line 13 replace

```
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```
by
```
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=1024m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```


## Adding signing config to your app's Gradle config

Go into your **/android/app/build.gradle** and add the following lines:
```
...
android {
    lintOptions {
      abortOnError false
    }
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        ...
        debug {
            ...
            manifestPlaceholders = [protectionLevel: "normal"]
            signingConfig signingConfigs.release
        }
        ...
        release {
            ...
            manifestPlaceholders = [protectionLevel: "signature"]
        }
    }
}
...
```
## Set the correct permission

Go into **/android/app/src/main/AndroidManifest.xml** and add at line number 2
```
<permission android:name="com.somestring.MY_CUSTOM_COMMAND" android:protectionLevel="${protectionLevel}" />
```

## Allocate enought memory to java

Go into **/android/gradlew** replace line:

```
DEFAULT_JVM_OPTS='"-Xmx64m" "-Xms64m"'
```
by
```
DEFAULT_JVM_OPTS='"-Xmx1024m" "-Xms1024m" "-XX:MaxPermSize=1024m"'
```
and in same file replace :
```
    GRADLE_OPTS="$GRADLE_OPTS \"-Xdock:name=$APP_NAME\" \"-Xdock:icon=$APP_HOME/media/gradle.icns\""
```
by
```
    GRADLE_OPTS="$GRADLE_OPTS \"-Xdock:name=$APP_NAME\" \"-Xdock:icon=$APP_HOME/media/gradle.icns\" \"-Xmx1024m\" \"-Xms256m\" \"-XX:MaxPermSize=1024m\""
```

# Set sdk path
Create at root (in ***/android/*** folder) a file named ***local.properties***

and set the path to the sdk like following:
```
sdk.dir=/home/gradle/Android/Sdk
```

And hope that's work...