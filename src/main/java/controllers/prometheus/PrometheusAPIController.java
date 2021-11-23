package controllers.prometheus;

import io.prometheus.client.CollectorRegistry;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.StringWriter;

/**
 * @author Alfred Röttger Rydahl
 * @date 18/11/2021
 **/
@Path("prometheus")
public class PrometheusAPIController
{
	@Path("metrics")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String metrics()
	{
		Metrics.metricRequests.inc();
		
		StringWriter writer = new StringWriter();
		try {
			io.prometheus.client.exporter.common.TextFormat.write004(
					writer, CollectorRegistry.defaultRegistry.metricFamilySamples());
		} catch (Exception e) {
			return e.getMessage();
		}
		return writer.toString();
	}
}
