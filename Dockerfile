FROM java:8

WORKDIR /
ADD Kvissen.jar Kvissen.jar

# Mappen src/main/webapp skal eksistere i Docker-imaget. 
ADD src/main/webapp /src/main/webapp
EXPOSE 8080

CMD java -jar Kvissen.jar
