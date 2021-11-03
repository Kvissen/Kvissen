package controllers.kvis.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 *
 * @author Alfred Röttger Rydahl
 * @date 02/11/2021
 **/
public class Answer
{
	public final String answer;
	public final boolean isCorrect;
	
	@JsonCreator
	public Answer(@JsonProperty("answer") String answer, @JsonProperty("isCorrect") boolean isCorrect)
	{
		this.answer = answer;
		this.isCorrect = isCorrect;
	}
}
