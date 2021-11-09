FROM java:8

WORKDIR /

# Add Sources to container
ADD . .

# Build and package
RUN mvn package

EXPOSE 8080

CMD java -jar Kvissen.jar
