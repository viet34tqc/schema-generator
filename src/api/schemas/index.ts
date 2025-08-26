// Export all schema definitions
export { default as Article } from './Article'
export { default as AudioObject } from './AudioObject'
export { default as Book } from './Book'
export { default as BreadcrumbList } from './BreadcrumbList'
export { default as Course } from './Course'
export { default as CustomJsonLd } from './CustomJsonLd'
export { default as Event } from './Event'
export { default as FAQPage } from './FAQPage'
export { default as HowTo } from './HowTo'
export { default as ImageObject } from './ImageObject'
export { default as JobPosting } from './JobPosting'
export { default as LocalBusiness } from './LocalBusiness'
export { default as Offer } from './Offer'
export { default as Organization } from './Organization'
export { default as Person } from './Person'
export { default as Product } from './Product'
export { default as ProductGroup } from './ProductGroup'
export { default as QAPage } from './QAPage'
export { default as Recipe } from './Recipe'
export { default as Review } from './Review'
export { default as SearchAction } from './SearchAction'
export { default as Service } from './Service'
export { default as SoftwareApplication } from './SoftwareApplication'
export { default as Thing } from './Thing'
export { default as VideoObject } from './VideoObject'
export { default as WebPage } from './WebPage'
export { default as WebSite } from './WebSite'

// Collect all schemas into a single object
import Article from './Article'
import AudioObject from './AudioObject'
import Book from './Book'
import BreadcrumbList from './BreadcrumbList'
import Course from './Course'
import CustomJsonLd from './CustomJsonLd'
import Event from './Event'
import FAQPage from './FAQPage'
import HowTo from './HowTo'
import ImageObject from './ImageObject'
import JobPosting from './JobPosting'
import LocalBusiness from './LocalBusiness'
import Offer from './Offer'
import Organization from './Organization'
import Person from './Person'
import Product from './Product'
import ProductGroup from './ProductGroup'
import QAPage from './QAPage'
import Recipe from './Recipe'
import Review from './Review'
import SearchAction from './SearchAction'
import Service from './Service'
import SoftwareApplication from './SoftwareApplication'
import Thing from './Thing'
import VideoObject from './VideoObject'
import WebPage from './WebPage'
import WebSite from './WebSite'

export const schemaFieldDefinitions = {
  Article,
  Product,
  ProductGroup,
  Organization,
  Book,
  Recipe,
  Event,
  Course,
  JobPosting,
  LocalBusiness,
  HowTo,
  FAQPage,
  Review,
  SoftwareApplication,
  VideoObject,
  ImageObject,
  AudioObject,
  QAPage,
  WebSite,
  WebPage,
  SearchAction,
  BreadcrumbList,
  Thing,
  Person,
  Service,
  Offer,
  CustomJsonLd,
}
