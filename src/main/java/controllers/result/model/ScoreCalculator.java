package controllers.result.model;

/**
 * @author Alfred Röttger Rydahl
 * @date 30/11/2021
 **/
public class ScoreCalculator
{
	public static int calculate(final int correct, final int total)
	{
		return (int) Math.round((double)correct * 100.0 / (double)total);
	}
}
