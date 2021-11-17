# These versions should follow the ones specified in the pom.xml
FROM maven:3.8.1-jdk-8

# Update and install maven
#RUN apt-get update -y
#RUN apt-get upgrade -y
#RUN apt-get install maven -y

WORKDIR /

# Add Sources to container
ADD . .

# Build and package with two threads
RUN mvn -T 2 package

EXPOSE 8080

CMD java -jar target/Kvissen.jar
