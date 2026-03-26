import BacklinkChecker from "./BacklinkChecker";
import BrokenLinksFinder from "./BrokenLinksFinder";
import CanonicalTagChecker from "./CanonicalTagChecker";
import CssBeautifier from "./CssBeautifier";
import CssMinifier from "./CssMinifier";
import DnsLookup from "./DnsLookup";
import DomainAuthorityChecker from "./DomainAuthorityChecker";
import ExternalLinksChecker from "./ExternalLinksChecker";
import GoogleIndexChecker from "./GoogleIndexChecker";
import HeadingTagChecker from "./HeadingTagChecker";
import HtmlBeautifier from "./HtmlBeautifier";
import HtmlMinifier from "./HtmlMinifier";
import HttpStatusCodeChecker from "./HttpStatusCodeChecker";
import ImageAltTagChecker from "./ImageAltTagChecker";
import ImageSitemapGenerator from "./ImageSitemapGenerator";
import InternalLinksChecker from "./InternalLinksChecker";
import JsBeautifier from "./JsBeautifier";
import JsMinifier from "./JsMinifier";
import KeywordDensityChecker from "./KeywordDensityChecker";
import KeywordDifficultyChecker from "./KeywordDifficultyChecker";
import KeywordPositionChecker from "./KeywordPositionChecker";
import KeywordSuggestionTool from "./KeywordSuggestionTool";
import LinkAnalyzer from "./LinkAnalyzer";
import LongTailKeywordGenerator from "./LongTailKeywordGenerator";
import MetaDescriptionChecker from "./MetaDescriptionChecker";
import MetaTagAnalyzer from "./MetaTagAnalyzer";
import MobileFriendlyChecker from "./MobileFriendlyChecker";
import NewsSitemapGenerator from "./NewsSitemapGenerator";
import OpenGraphTagChecker from "./OpenGraphTagChecker";
import PageAuthorityChecker from "./PageAuthorityChecker";
import PageSizeChecker from "./PageSizeChecker";
import RobotsTxtGenerator from "./RobotsTxtGenerator";
import RobotsTxtTester from "./RobotsTxtTester";
import SeoTitleGenerator from "./SeoTitleGenerator";
import TitleTagLengthChecker from "./TitleTagLengthChecker";
import UrlEncoderDecoder from "./UrlEncoderDecoder";
import UrlSlugGenerator from "./UrlSlugGenerator";
import VideoSitemapGenerator from "./VideoSitemapGenerator";
import WebsiteLinkCountChecker from "./WebsiteLinkCountChecker";
import WebsiteScreenshotGenerator from "./WebsiteScreenshotGenerator";
import WordCounterTool from "./WordCounterTool";
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
  "keyword-difficulty-checker": KeywordDifficultyChecker,
  "long-tail-keyword-generator": LongTailKeywordGenerator,
  "keyword-position-checker": KeywordPositionChecker,
  "backlink-checker-tool": BacklinkChecker,
  "domain-authority-checker": DomainAuthorityChecker,
  "page-authority-checker": PageAuthorityChecker,
  "broken-links-finder": BrokenLinksFinder,
  "website-link-analyzer-tool": LinkAnalyzer,
  "website-link-count-checker": WebsiteLinkCountChecker,
  "word-counter-tool": WordCounterTool,
  "seo-title-generator": SeoTitleGenerator,
  "html-minifier": HtmlMinifier,
  "html-beautifier": HtmlBeautifier,
  "js-minifier": JsMinifier,
  "js-beautifier": JsBeautifier,
  "css-minifier": CssMinifier,
  "css-beautifier": CssBeautifier,
  "url-slug-generator": UrlSlugGenerator,
  "dns-lookup": DnsLookup,

};