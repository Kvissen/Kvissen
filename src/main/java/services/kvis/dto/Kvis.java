package services.kvis.dto;

/**
 * Kvis data class.
 *
 * @author Alfred Röttger Rydahl
 * @date 26/10/2021
 **/
public class Kvis
{
	public final String id;
	public final String description;
	
	public Kvis(final String id, final String description)
	{
		this.id = id;
		this.description = description;
	}
}
