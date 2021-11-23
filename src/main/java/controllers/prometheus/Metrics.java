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
	
	public final static Counter kvisUsernameRequestCount = Counter
			.build()
			.name("kvis_username")
			.help("Total request to the /kvis/user/{username}")
			.register();
	
	public final static Counter kvisCreateAttempts = Counter
			.build()
			.name("kvis_create_attempts")
			.help("Total Kvis Creation attempts")
			.register();
	
	public final static Counter kvisCreateFailed = Counter
			.build()
			.name("kvis_create_failed")
			.help("Total Kvis Creation failed attempts")
			.register();
	
	public final static Counter kvisActivateAttempts = Counter
			.build()
			.name("kvis_activate_attempts")
			.help("Total kvis activation Attempts")
			.register();
	
	public final static Counter kvisActivatesFailed = Counter
			.build()
			.name("kvis_activates_failed")
			.help("Total Kvis activations failed")
			.register();
	
	public final static Counter kvisActivatedRequests = Counter
			.build()
			.name("kvis_get_activated")
			.help("Total Requests on /kvis/activate/{findId}")
			.register();
	
	public final static Counter kvisActivatedRequestWrongId = Counter
			.build()
			.name("kvis_get_activated_wrong_id")
			.help("Total Failed requests on /kvis/activate/{findId} where findId doesn't exist")
			.register();
	
	public final static Counter kvisActivatedRequestFailed = Counter
			.build()
			.name("kvis_get_activated_failed")
			.help("Total Failed requests on /kvis/activate/{findId} due to Exception")
			.register();
	
	// Defaults
	public final static StandardExports standardExports= new StandardExports().register();
	public final static MemoryPoolsExports memoryPoolsExports =  new MemoryPoolsExports().register();
	public final static GarbageCollectorExports garbageCollectorExports = new GarbageCollectorExports().register();
}
