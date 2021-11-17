import io.prometheus.client.exporter.MetricsServlet;
import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.Server;
import org.apache.catalina.startup.Tomcat;
import controllers.ConnectionPool;

import java.io.File;
import java.util.Optional;

/**
 * @author Alfred Röttger Rydahl
 * @date 31/08/2021
 * @description
 **/
public class Main
{
	public static void main(String[] args) throws LifecycleException
	{
		Tomcat tomcat = new Tomcat();
		tomcat.setBaseDir("temp");
		
		// Retrieve alternative port it env is given
		String port = Optional.ofNullable(System.getenv("PORT")).orElse("8080");
		
		//tomcat.addServlet("/metrics", "prometheus", new MetricsServlet());
		tomcat.setPort(Integer.parseInt(port));
		tomcat.getConnector(); //Creates a default HTTP connector
		
		tomcat.addWebapp("", new File("src/main/webapp").getAbsolutePath());
		
		tomcat.start();
		tomcat.getServer().await();
		
		// Upon exist, close the connection pool
		ConnectionPool.close();
	}
	
	public static void addPrometheus(final Tomcat tomcat)
	{
		tomcat.addServlet("/metrics", "prometheus", new MetricsServlet());
	}
}
