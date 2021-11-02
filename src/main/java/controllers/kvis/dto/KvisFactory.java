package controllers.kvis.dto;

import controllers.kvis.dto.kvisAPI.KvisAPIDTO;
import controllers.kvis.dto.kvisDB.KvisDBDTO;
import controllers.kvis.dto.kvisDB.KvisDBPayload;

/**
 * Handles all conversions from DB objects to API objects.
 *
 * @author Alfred Röttger Rydahl
 * @date 02/11/2021
 **/
public class KvisFactory
{
	/**
	 * Convert [KvisDBDTO] to [KvisAPIDTO].
	 *
	 * @param dbdto
	 * @return new KvisAPIDTO object
	 */
	public static KvisAPIDTO DBToAPI(final KvisDBDTO dbdto)
	{
		return new KvisAPIDTO.KvisAPIDTOBuilder()
				.setUuid(dbdto.uuid)
				.setName(dbdto.name)
				.setCreator(dbdto.creator)
				.setTimestamp(dbdto.ts)
				.setQuestions(dbdto.payload.questions)
				.build();
	}
	
	/**
	 * Convert [KvisAPIDTO] to [KvisDBDTO].
	 *
	 * @param apidto
	 * @return new KvisDBDTO object
	 */
	public static KvisDBDTO APIToDB(final KvisAPIDTO apidto)
	{
		return new KvisDBDTO.KvisDBDTOBuilder()
				.setUuid(apidto.uuid)
				.setName(apidto.name)
				.setCreator(apidto.creator)
				.setTimestamp(apidto.ts)
				.setPayload(new KvisDBPayload(apidto.questions))
				.build();
	}
	
	private KvisFactory() {}
}
