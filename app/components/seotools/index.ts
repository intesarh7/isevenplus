import HeadingTagChecker from "./HeadingTagChecker";
import ImageAltTagChecker from "./ImageAltTagChecker";
import InternalLinksChecker from "./InternalLinksChecker";
import KeywordDensityChecker from "./KeywordDensityChecker";
import MetaDescriptionChecker from "./MetaDescriptionChecker";
import MetaTagAnalyzer from "./MetaTagAnalyzer";
import TitleTagLengthChecker from "./TitleTagLengthChecker";
// future tools
// import KeywordDensityChecker from "./KeywordDensityChecker";

export const seoToolComponents: Record<string, any> = {
  "meta-tag-analyzer": MetaTagAnalyzer,
  "title-tag-length-checker": TitleTagLengthChecker,
  "meta-description-length-checker": MetaDescriptionChecker,
  "keyword-density-checker": KeywordDensityChecker,
  "heading-tag-checker": HeadingTagChecker,
  "image-alt-tag-checker": ImageAltTagChecker,
  "internal-links-checker": InternalLinksChecker,

};