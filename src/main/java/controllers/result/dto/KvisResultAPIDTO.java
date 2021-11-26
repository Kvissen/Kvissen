package controllers.result.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.sql.Timestamp;

/**
 * @author Alfred Röttger Rydahl
 * @date 26/11/2021
 **/
@JsonDeserialize(builder = KvisResultAPIDTO.Builder.class)
public class KvisResultAPIDTO
{
	public final String id;
	public final String kvisId;
	public final String name;
	public final Timestamp kvisStarted;
	public final Timestamp kvisEnded;
	public final int score;
	public final int correctAnswers;
	public final int wrongAnswers;
	
	private KvisResultAPIDTO(String id, String kvisId, String name, Timestamp kvisStarted, Timestamp kvisEnded, int score, int correctAnswers, int wrongAnswers)
	{
		this.id 			= id;
		this.kvisId 		= kvisId;
		this.name 			= name;
		this.kvisStarted 	= kvisStarted;
		this.kvisEnded 		= kvisEnded;
		this.score 			= score;
		this.correctAnswers = correctAnswers;
		this.wrongAnswers 	= wrongAnswers;
	}
	
	@JsonPOJOBuilder(withPrefix = "set")
	public static class Builder
	{
		private String id;
		private String kvisId;
		private String name;
		private Timestamp kvisStarted;
		private Timestamp kvisEnded;
		private int score;
		private int correctAnswers;
		private int wrongAnswers;
		
		public KvisResultAPIDTO build()
		{
			return new KvisResultAPIDTO(
					id,
					kvisId,
					name,
					kvisStarted,
					kvisEnded,
					score,
					correctAnswers,
					wrongAnswers
			);
		}
		
		public Builder setId(String id)
		{
			this.id = id;
			return this;
		}
		
		public Builder setKvisId(String kvisId)
		{
			this.kvisId = kvisId;
			return this;
		}
		
		public Builder setName(String name)
		{
			this.name = name;
			return this;
		}
		
		public Builder setKvisStarted(Timestamp kvisStarted)
		{
			this.kvisStarted = kvisStarted;
			return this;
		}
		
		public Builder setKvisEnded(Timestamp kvisEnded)
		{
			this.kvisEnded = kvisEnded;
			return this;
		}
		
		public Builder setScore(int score)
		{
			this.score = score;
			return this;
		}
		
		public Builder setCorrectAnswers(int correctAnswers)
		{
			this.correctAnswers = correctAnswers;
			return this;
		}
		
		public Builder setWrongAnswers(int wrongAnswers)
		{
			this.wrongAnswers = wrongAnswers;
			return this;
		}
	}
}