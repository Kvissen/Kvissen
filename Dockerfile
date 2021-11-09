FROM java:8

# Update and install maven
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install maven -y

WORKDIR /

# Add Sources to container
ADD . .

# Build and package
RUN mvn package

EXPOSE 8080

CMD java -jar Kvissen.jar
