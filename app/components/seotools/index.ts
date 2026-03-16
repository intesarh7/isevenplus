import CanonicalTagChecker from "./CanonicalTagChecker";
import ExternalLinksChecker from "./ExternalLinksChecker";
import GoogleIndexChecker from "./GoogleIndexChecker";
import HeadingTagChecker from "./HeadingTagChecker";
import HttpStatusCodeChecker from "./HttpStatusCodeChecker";
import ImageAltTagChecker from "./ImageAltTagChecker";
import ImageSitemapGenerator from "./ImageSitemapGenerator";
import InternalLinksChecker from "./InternalLinksChecker";
import KeywordDensityChecker from "./KeywordDensityChecker";
import KeywordSuggestionTool from "./KeywordSuggestionTool";
import MetaDescriptionChecker from "./MetaDescriptionChecker";
import MetaTagAnalyzer from "./MetaTagAnalyzer";
import MobileFriendlyChecker from "./MobileFriendlyChecker";
import NewsSitemapGenerator from "./NewsSitemapGenerator";
import OpenGraphTagChecker from "./OpenGraphTagChecker";
import PageSizeChecker from "./PageSizeChecker";
import RobotsTxtGenerator from "./RobotsTxtGenerator";
import RobotsTxtTester from "./RobotsTxtTester";
import TitleTagLengthChecker from "./TitleTagLengthChecker";
import UrlEncoderDecoder from "./UrlEncoderDecoder";
import VideoSitemapGenerator from "./VideoSitemapGenerator";
import WebsiteScreenshotGenerator from "./WebsiteScreenshotGenerator";
import XMLSitemapGenerator from "./XMLSitemapGenerator";

export const seoToolComponents: Record<string, any> = {
  "meta-tag-analyzer": MetaTagAnalyzer,
  "title-tag-length-checker": TitleTagLengthChecker,
  "meta-description-length-checker": MetaDescriptionChecker,
  "keyword-density-checker": KeywordDensityChecker,
  "heading-tag-checker": HeadingTagChecker,
  "image-alt-tag-checker": ImageAltTagChecker,
  "internal-links-checker": InternalLinksChecker,
  "external-links-checker": ExternalLinksChecker,
  "open-graph-tag-checker": OpenGraphTagChecker,
  "canonical-tag-checker": CanonicalTagChecker,
  "xml-sitemap-generator": XMLSitemapGenerator,
  "image-sitemap-generator": ImageSitemapGenerator,
  "news-sitemap-generator": NewsSitemapGenerator,
  "video-sitemap-generator": VideoSitemapGenerator,
  "robots-txt-generator": RobotsTxtGenerator,
  "robots-txt-tester": RobotsTxtTester,
  "google-index-checker": GoogleIndexChecker,
  "http-status-code-checker": HttpStatusCodeChecker,
  "mobile-friendly-checker": MobileFriendlyChecker,
  "page-size-checker": PageSizeChecker,
  "url-encoder-decoder": UrlEncoderDecoder,
  "website-screenshot-generator": WebsiteScreenshotGenerator,
  "keyword-suggestion-tool": KeywordSuggestionTool,
  

};