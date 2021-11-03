package controllers.kvis.dto.kvisAPI;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import controllers.kvis.dto.Question;

import java.sql.Time;
import java.sql.Timestamp;

/**
 *
 *
 * @author Alfred Röttger Rydahl
 * @date 02/11/2021
 **/
@JsonDeserialize(builder = KvisAPIDTO.KvisAPIDTOBuilder.class)
public class KvisAPIDTO
{
	public final String uuid;
	public final String name;
	public final String creator;
	public final Timestamp ts;
	public final Question[] questions;
	
	private KvisAPIDTO(String uuid, String name, String creator, Timestamp ts, Question[] questions)
	{
		this.uuid = uuid;
		this.name = name;
		this.creator = creator;
		this.ts = ts;
		this.questions = questions;
	}
	
	@JsonPOJOBuilder(withPrefix = "set")
	public static class KvisAPIDTOBuilder
	{
		private String uuid;
		private String name;
		private String creator;
		private Timestamp ts;
		private Question[] questions;
		
		public KvisAPIDTOBuilder setUuid(String uuid)
		{
			this.uuid = uuid;
			return this;
		}
		
		public KvisAPIDTOBuilder setName(String name)
		{
			this.name = name;
			return this;
		}
		
		public KvisAPIDTOBuilder setCreator(String creator)
		{
			this.creator = creator;
			return this;
		}
		
		public KvisAPIDTOBuilder setTimestamp(Timestamp ts)
		{
			this.ts = ts;
			return this;
		}
		
		public KvisAPIDTOBuilder setQuestions(Question[] questions)
		{
			this.questions = questions;
			return this;
		}
		
		public KvisAPIDTO build()
		{
			return new KvisAPIDTO(uuid, name, creator, ts, questions);
		}
	}
}
