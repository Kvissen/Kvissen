FROM java:8

# Update and install maven
RUN apt update -y
RUN apt upgrade -y
RUN apt install maven -y

WORKDIR /

# Add Sources to container
ADD . .

# Build and package
RUN mvn package

EXPOSE 8080

CMD java -jar Kvissen.jar
