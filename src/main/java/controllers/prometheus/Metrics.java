package controllers.prometheus;

import io.prometheus.client.Counter;
import io.prometheus.client.hotspot.GarbageCollectorExports;
import io.prometheus.client.hotspot.MemoryPoolsExports;
import io.prometheus.client.hotspot.StandardExports;

/**
 * @author Alfred Röttger Rydahl
 * @date 18/11/2021
 **/
public class Metrics
{
	// Metrics
	public final static Counter metricRequests = Counter.build().name("metricRequests").help("Total requests for prometheus metrics").register();
	
	// Login
	public final static Counter loginAttemptCounter = Counter.build().name("loginAttempts").help("Total Login Attempts").register();
	public final static Counter loginFailedCounter = Counter.build().name("loginFails").help("Total Failed Attempts").register();
	
	// Kvis
	public final static Counter kvisAllRequestCount = Counter
			.build()
			.name("kvis_all")
			.help("Total requests to the /kvis/all endpoint")
			.register();
	
	public final static Counter kvisIdReqeustCount = Counter
			.build()
			.name("kvis_id")
			.help("Total requests to the /kvis/id/{id} endpoint")
			.register();
	
	// Defaults
	public final static StandardExports standardExports= new StandardExports().register();
	public final static MemoryPoolsExports memoryPoolsExports =  new MemoryPoolsExports().register();
	public final static GarbageCollectorExports garbageCollectorExports = new GarbageCollectorExports().register();
}
