package controllers;

import org.apache.commons.dbcp2.*;
import org.apache.commons.pool2.ObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPool;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Exposes a pool of connections.
 *
 * This class acts as a wrapper class for Apache Commons DBCP library.
 *
 * This class is a singleton because we only need one, and it can't be solved with static methods as it has state.
 *
 * @author Alfred Röttger Rydahl
 * @date 27/10/2021
 **/
public class ConnectionPool
{
	public static final String connectURI = "jdbc:postgresql://65.21.246.31:5432/postgres?user=admin&password=Kvissen22";
	
	/**
	 * Static instance of this class.
	 */
	private static ConnectionPool instance;
	
	/**
	 * services.ConnectionPool to manage and retrieve database connection from.
	 */
	private final PoolingDataSource<PoolableConnection> connSource;
	
	/**
	 * Gets the current instance of this singleton.
	 *
	 * It handles creation of a new one if there hasn't been instantiated one yet.
	 *
	 * @return [services.ConnectionPool]
	 */
	public static ConnectionPool getInstance()
	{
		if (instance == null)
			instance = new ConnectionPool();
		return instance;
	}
	
	/**
	 * Releases all the resources held by the currently active connection pool.
	 *
	 * This takes all possible Exceptions into consideration, and doesn't throw anything.
	 */
	public static void close()
	{
		try { instance.connSource.close(); } catch(Exception ignored) {}
	}
	
	/**
	 * Retrieves a connection from the Pool.
	 *
	 * OBS: Closing the connection is the same as releasing the connection to the pool!
	 *
	 * @return [Connection]
	 * @throws SQLException
	 */
	public Connection getConnection() throws SQLException
	{
		return this.connSource.getConnection();
	}
	
	/**
	 * Private constructor to avoid instantiation.
	 */
	private ConnectionPool()
	{
		this.connSource = this.setupConnectionSource(connectURI);
	}
	
	/**
	 * Responsible for setting up a Connection source.
	 *
	 * @param connectURI The URI containing
	 * @return [DataSource]
	 */
	private PoolingDataSource<PoolableConnection> setupConnectionSource(final String connectURI)
	{
		// First, we'll create a ConnectionFactory that the
		// pool will use to create Connections
		ConnectionFactory connectionFactory =
							new DriverManagerConnectionFactory(connectURI,null);
		
		// Next we'll create the PoolableConnectionFactory, which wraps
		// the "real" Connections
		PoolableConnectionFactory poolableConnectionFactory =
							new PoolableConnectionFactory(connectionFactory, null);
		
		// Now we'll need a ObjectPool that serves as the
		// actual pool of connections
		ObjectPool<PoolableConnection> connectionPool =
								new GenericObjectPool<>(poolableConnectionFactory);
		
		// Set the factory's pool property to the owning pool
		poolableConnectionFactory.setPool(connectionPool);
		
		// Finally, we create the PoolingDriver itself,
		// passing in the object pool we created.
		return new PoolingDataSource<>(connectionPool);
	}
}
