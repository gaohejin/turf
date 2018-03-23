import { FeatureCollection, Point } from "@turf/helpers";
export interface QuadratAnalysisResult {
    criticalValue: number;
    maxAbsoluteDifference: number;
    isRandom: boolean;
    observedDistribution: number[];
}
/**
 * Quadrat analysis lays a set of equal-size areas(quadrat) over the study area and counts
 * the number of features in each quadrat and creates a frequency table.
 * The table lists the number of quadrats containing no features,
 * the number containing one feature, two features, and so on,
 * all the way up to the quadrat containing the most features.
 * The method then creates the frequency table for the random distribution, usually based on a Poisson distribution.
 * The method uses the distribution to calculate the probability for 0 feature occuring,
 * 1 feature occuring, 2 features, and so on,
 * and lists these probabilities in the frequency table.
 * By comparing the two frequency tables, you can see whether the features create a pattern.
 * If the table for the observed distribution has more quadrats containing many features than the
 * table for the random distribution dose, then the features create a clustered pattern.
 *
 * It is hard to judge the frequency tables are similar or different just by looking at them.
 * So, we can use serval statistical tests to find out how much the frequency tables differ.
 * We use Kolmogorov-Smirnov test.This method calculates cumulative probabilities for both distributions,
 * and then compares the cumulative probabilities at each class level and selects the largest absolute difference D.
 * Then, the test compares D to the critical value for a confidence level you specify.
 * If D is greater than the critical value, the difference between  the observed distribution and
 * the random distribution is significant. The greater the value the bigger the difference.
 *
 * Traditionally, squares are used for the shape of the quadrats, in a regular grid(square-grid).
 * Some researchers suggest that the quadrat size equal twice the size of mean area per feature,
 * which is simply the area of the study area divided by the number of features.
 *
 *
 * @name quadratAnalysis
 * @param {FeatureCollection<Point>} pointFeatureSet point set to study
 * @param {Object} [options={}] optional parameters
 * @param {bbox} [options.studyBbox] bbox representing the study area
 * @param {number} [options.confidenceLevel=20] a confidence level.
 * The unit is percentage . 5 means 95%, value must be in {@link K_TABLE}
 * @returns {Object} result {@link QuadratAnalysisResult}
 * @example
 *
 * var bbox = [-65, 40, -63, 42];
 * var dataset = turf.randomPoint(100, { bbox: bbox });
 * var result = turf.quadratAnalysis(dataset);
 *
 */
export default function quadratAnalysis(pointFeatureSet: FeatureCollection<Point>, options: {
    studyBbox?: [number, number, number, number];
    confidenceLevel?: 20 | 15 | 10 | 5 | 2 | 1;
}): QuadratAnalysisResult;
