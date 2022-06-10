FROM gradle:latest

RUN mkdir ~/.android/ && touch ~/.android/repositories.cfg
RUN apt update
RUN apt install -y nodejs
RUN node -v

# support multiarch: i386 architecture
# install Java
# install essential tools
# install Qt
ARG JDK_VERSION=8
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y --no-install-recommends libncurses5:i386 libc6:i386 libstdc++6:i386 lib32gcc1 lib32ncurses6 lib32z1 zlib1g:i386 && \
    apt-get install -y --no-install-recommends openjdk-${JDK_VERSION}-jdk && \
    apt-get install -y --no-install-recommends git wget unzip && \
    apt-get install -y --no-install-recommends qt5-default

# download and install Kotlin compiler
# https://github.com/JetBrains/kotlin/releases/latest
ARG KOTLIN_VERSION=1.4.10
RUN cd /opt && \
    wget -q https://github.com/JetBrains/kotlin/releases/download/v${KOTLIN_VERSION}/kotlin-compiler-${KOTLIN_VERSION}.zip && \
    unzip *kotlin*.zip && \
    rm *kotlin*.zip

# download and install Android SDK
# https://developer.android.com/studio#command-tools
ARG ANDROID_SDK_VERSION=6858069
ENV ANDROID_SDK_ROOT /opt/android-sdk
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_VERSION}_latest.zip && \
    unzip *tools*linux*.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/tools && \
    rm *tools*linux*.zip

# set the environment variables
ENV JAVA_HOME /usr/lib/jvm/java-${JDK_VERSION}-openjdk-amd64
ENV GRADLE_HOME /opt/gradle
ENV KOTLIN_HOME /opt/kotlinc
ENV PATH ${PATH}:${GRADLE_HOME}/bin:${KOTLIN_HOME}/bin:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/emulator
ENV _JAVA_OPTIONS -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap

RUN mkdir $ANDROID_SDK_ROOT/licenses && \
    echo 8933bad161af4178b1185d1a37fbf41ea5269c55 > $ANDROID_SDK_ROOT/licenses/android-sdk-license && \
    echo d56f5187479451eabf01fb78af6dfcb131a6481e >> $ANDROID_SDK_ROOT/licenses/android-sdk-license && \
    echo 24333f8a63b6825ea9c5514f83c2829b004d1fee >> $ANDROID_SDK_ROOT/licenses/android-sdk-license && \
    echo 84831b9409646a918e30573bab4c9c91346d8abd > $ANDROID_SDK_ROOT/licenses/android-sdk-preview-license

#RUN /opt/android-sdk/cmdline-tools/tools/bin/sdkmanager --licenses

WORKDIR /home/gradle/
RUN mkdir mobile
WORKDIR /home/gradle/mobile
RUN curl -L https://www.npmjs.com/install.sh | sh
#RUN npm config set unsafe-perm true
COPY . .
RUN npm i
RUN ls /home/gradle/mobile/
RUN cd android && ./gradlew build
RUN mkdir apk || ls
CMD cp -r /home/gradle/mobile/android/app/build/outputs/apk/release/* ./apk/