FROM java:8

# Update and install maven
RUN sudo apt update -y
RUN sudo apt upgrade -y
RUN sudo apt install maven -y

WORKDIR /

# Add Sources to container
ADD . .

# Build and package
RUN mvn package

EXPOSE 8080

CMD java -jar Kvissen.jar
