package controllers.kvis.dto.kvisDB;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.sql.Timestamp;

/**
 *
 *
 * @author Alfred Röttger Rydahl
 * @date 02/11/2021
 **/
@JsonDeserialize(builder = KvisDBDTO.KvisDBDTOBuilder.class)
public class KvisDBDTO
{
	public final String uuid;
	public final String name;
	public final String creator;
	public final Timestamp ts;
	public final KvisDBPayload payload;
	
	private KvisDBDTO(String uuid, String name, String creator, Timestamp ts, KvisDBPayload payload)
	{
		this.uuid = uuid;
		this.name = name;
		this.creator = creator;
		this.ts = ts;
		this.payload = payload;
	}
	
	@JsonPOJOBuilder(withPrefix = "set")
	public static class KvisDBDTOBuilder
	{
		private String uuid;
		private String name;
		private String creator;
		private Timestamp ts;
		private KvisDBPayload payload;
		
		public KvisDBDTOBuilder setUuid(String uuid)
		{
			this.uuid = uuid;
			return this;
		}
		
		public KvisDBDTOBuilder setName(String name)
		{
			this.name = name;
			return this;
		}
		
		public KvisDBDTOBuilder setCreator(String creator)
		{
			this.creator = creator;
			return this;
		}
		
		public KvisDBDTOBuilder setTimestamp(Timestamp ts)
		{
			this.ts = ts;
			return this;
		}
		
		public KvisDBDTOBuilder setPayload(KvisDBPayload payload)
		{
			this.payload = payload;
			return this;
		}
		
		public KvisDBDTO build()
		{
			return new KvisDBDTO(uuid, name, creator, ts, payload);
		}
	}
}
