import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import { generateToolSEO } from "@/app/lib/seos";
import { getCalculatorFAQSchema } from "@/app/lib/calculatorFaqSchema";
import AdSlot from "@/app/components/AdSlot";
import { generateToolSchema } from "@/app/lib/schema";
import AgeCalculator from "@/app/components/personalplanning/AgeCalculator";
import GSTCalculator from "@/app/components/financecalculator/GSTCalculator";
import EMICalculator from "@/app/components/financecalculator/EMICalculator";
import BMICalculator from "@/app/components/healthcalculator/BMICalculator";
import SIPCalculator from "@/app/components/financecalculator/SIPCalculator";
import PercentageCalculator from "@/app/components/personalplanning/PercentageCalculator";
import LoanCalculator from "@/app/components/financecalculator/LoanCalculator";
import IncomeTaxCalculator from "@/app/components/financecalculator/IncomeTaxCalculator";
import HRACalculator from "@/app/components/financecalculator/HRACalculator";
import GratuityCalculator from "@/app/components/salaryandtaxadvanced/GratuityCalculator";
import FDCalculator from "@/app/components/financecalculator/FDCalculator";
import RDCalculator from "@/app/components/financecalculator/RDCalculator";
import CompoundInterestCalculator from "@/app/components/financecalculator/CompoundInterestCalculator";
import SimpleInterestCalculator from "@/app/components/financecalculator/SimpleInterestCalculator";
import PPFCalculator from "@/app/components/financecalculator/PPFCalculator";
import NPSCalculator from "@/app/components/financecalculator/NPSCalculator";
import InflationCalculator from "@/app/components/financecalculator/InflationCalculator";
import SalaryCalculator from "@/app/components/financecalculator/SalaryCalculator";
import ProfitMarginCalculator from "@/app/components/financecalculator/ProfitMarginCalculator";
import BreakEvenCalculator from "@/app/components/personalplanning/BreakEvenCalculator";
import ROICalculator from "@/app/components/financecalculator/ROICalculator";
import GSTReverseCalculator from "@/app/components/financecalculator/GSTReverseCalculator";
import MortgageCalculator from "@/app/components/financecalculator/MortgageCalculator";
import AmortizationCalculator from "@/app/components/financecalculator/AmortizationCalculator";
import MortgagePayoffCalculator from "@/app/components/financecalculator/MortgagePayoffCalculator";
import HouseAffordabilityCalculator from "@/app/components/financecalculator/HouseAffordabilityCalculator";
import RentCalculator from "@/app/components/financecalculator/RentCalculator";
import DebtToIncomeCalculator from "@/app/components/financecalculator/DebtToIncomeCalculator";
import RealEstateCalculator from "@/app/components/financecalculator/RealEstateCalculator";
import RefinanceCalculator from "@/app/components/financecalculator/RefinanceCalculator";
import RentalPropertyCalculator from "@/app/components/financecalculator/RentalPropertyCalculator";
import APRCalculator from "@/app/components/financecalculator/APRCalculator";
import FHALoanCalculator from "@/app/components/financecalculator/FHALoanCalculator";
import VAMortgageCalculator from "@/app/components/financecalculator/VAMortgageCalculator";
import HomeEquityLoanCalculator from "@/app/components/financecalculator/HomeEquityLoanCalculator";
import HELOCCalculator from "@/app/components/personalplanning/HELOCCalculator";
import DownPaymentCalculator from "@/app/components/financecalculator/DownPaymentCalculator";
import RentVsBuyCalculator from "@/app/components/financecalculator/RentVsBuyCalculator";
import CreditCardPayoffCalculator from "@/app/components/financecalculator/CreditCardPayoffCalculator";
import ARMCalculator from "@/app/components/financecalculator/ARMCalculator";
import CollegeCostCalculator from "@/app/components/personalplanning/CollegeCostCalculator";
import NetWorthCalculator from "@/app/components/financecalculator/NetWorthCalculator";
import BMRCalculator from "@/app/components/healthcalculator/BMRCalculator";
import TDEECalculator from "@/app/components/healthcalculator/TDEECalculator";
import CalorieCalculator from "@/app/components/financecalculator/CalorieCalculator";
import IdealWeightCalculator from "@/app/components/healthcalculator/IdealWeightCalculator";
import BodyFatCalculator from "@/app/components/healthcalculator/BodyFatCalculator";
import WaterIntakeCalculator from "@/app/components/healthcalculator/WaterIntakeCalculator";
import PregnancyDueDateCalculator from "@/app/components/healthcalculator/PregnancyDueDateCalculator";
import OvulationCalculator from "@/app/components/healthcalculator/OvulationCalculator";
import PeriodCalculator from "@/app/components/healthcalculator/PeriodCalculator";
import DaysBetweenDatesCalculator from "@/app/components/dateandtimetools/DaysBetweenDatesCalculator";
import WorkingDaysCalculator from "@/app/components/dateandtimetools/WorkingDaysCalculator";
import AgeDifferenceCalculator from "@/app/components/dateandtimetools/AgeDifferenceCalculator";
import CountdownTimerTool from "@/app/components/dateandtimetools/CountdownTimerTool";
import TimeZoneConverter from "@/app/components/dateandtimetools/TimeZoneConverter";
import DateDurationCalculator from "@/app/components/dateandtimetools/DateDurationCalculator";
import PercentageToCGPAConverter from "@/app/components/educationtools/PercentageToCGPAConverter";
import CGPAToPercentageConverter from "@/app/components/educationtools/CGPAToPercentageConverter";
import MarksPercentageCalculator from "@/app/components/educationtools/MarksPercentageCalculator";
import ExamScoreCalculator from "@/app/components/educationtools/ExamScoreCalculator";
import RankPredictorTool from "@/app/components/educationtools/RankPredictorTool";
import SGPAToCGPAConverter from "@/app/components/educationtools/SGPAToCGPAConverter";
import StudyTimeCalculator from "@/app/components/educationtools/StudyTimeCalculator";
import GPAToPercentageInternational from "@/app/components/educationtools/GPAToPercentageInternational";
import AttendancePercentageCalculator from "@/app/components/educationtools/AttendancePercentageCalculator";
import StudyPlannerCalculator from "@/app/components/educationtools/StudyPlannerCalculator";
import CollegeCutoffPredictor from "@/app/components/educationtools/CollegeCutoffPredictor";
import AICollegeRecommendationTool from "@/app/components/educationtools/AICollegeRecommendationTool";
import CollegeComparisonTool from "@/app/components/educationtools/CollegeComparisonTool";
import EducationLoanEMICalculator from "@/app/components/educationtools/EducationLoanEMICalculator";
import ScholarshipEligibilityCalculator from "@/app/components/educationtools/ScholarshipEligibilityCalculator";
import LumpsumCalculator from "@/app/components/investmentandwealthplanning/LumpsumCalculator";
import StepUpSIPCalculator from "@/app/components/investmentandwealthplanning/StepUpSIPCalculator";
import SWPCalculator from "@/app/components/investmentandwealthplanning/SWPCalculator";
import CapitalGainsCalculator from "@/app/components/investmentandwealthplanning/CapitalGainsCalculator";
import AdvancedCapitalGainsCalculator from "@/app/components/investmentandwealthplanning/AdvancedCapitalGainsCalculator";
import PropertyCapitalGainCalculator from "@/app/components/investmentandwealthplanning/PropertyCapitalGainCalculator";
import DividendTaxCalculator from "@/app/components/investmentandwealthplanning/DividendTaxCalculator";
import DividendYieldCalculator from "@/app/components/investmentandwealthplanning/DividendYieldCalculator";
import StockAverageCalculator from "@/app/components/investmentandwealthplanning/StockAverageCalculator";
import StockReturnCalculator from "@/app/components/investmentandwealthplanning/StockReturnCalculator";
import PortfolioReturnCalculator from "@/app/components/investmentandwealthplanning/PortfolioReturnCalculator";
import PropertyCapitalGainWithStampCalculator from "@/app/components/investmentandwealthplanning/PropertyCapitalGainWithStampCalculator";
import MutualFundTaxCalculator from "@/app/components/investmentandwealthplanning/MutualFundTaxCalculator";
import RetirementPlannerPro from "@/app/components/investmentandwealthplanning/RetirementPlannerPro";
import XIRRCalculatorPro from "@/app/components/investmentandwealthplanning/XIRRCalculatorPro";
import RetirementCorpusCalculator from "@/app/components/investmentandwealthplanning/RetirementCorpusCalculator";
import CompleteIncomeTaxCalculator from "@/app/components/financecalculator/CompleteIncomeTaxCalculator";
import InternationalIncomeTaxCalculator from "@/app/components/financecalculator/InternationalIncomeTaxCalculator";
import LoanPrepaymentCalculator from "@/app/components/loanandcredit/LoanPrepaymentCalculator";
import PersonalLoanEligibilityCalculator from "@/app/components/loanandcredit/PersonalLoanEligibilityCalculator";
import CreditScoreImprovementEstimator from "@/app/components/loanandcredit/CreditScoreImprovementEstimator";
import CarLoanEMICalculator from "@/app/components/loanandcredit/CarLoanEMICalculator";
import HomeLoanEMICalculator from "@/app/components/loanandcredit/HomeLoanEMICalculator";
import HomeLoanPrepaymentCalculator from "@/app/components/loanandcredit/HomeLoanPrepaymentCalculator";
import HomeLoanBalanceTransferCalculator from "@/app/components/loanandcredit/HomeLoanBalanceTransferCalculator";
import BikeLoanEMICalculator from "@/app/components/loanandcredit/BikeLoanEMICalculator";
import LoanBalanceTransferCalculator from "@/app/components/loanandcredit/LoanBalanceTransferCalculator";
import TakeHomeSalaryCalculator from "@/app/components/salaryandtaxadvanced/TakeHomeSalaryCalculator";
import HRAExemptionCalculator from "@/app/components/salaryandtaxadvanced/HRAExemptionCalculator";
import Section80CCalculator from "@/app/components/salaryandtaxadvanced/Section80CCalculator";
import PFCalculator from "@/app/components/salaryandtaxadvanced/PFCalculator";
import SalarySlipGenerator from "@/app/components/salaryandtaxadvanced/SalarySlipGenerator";
import Link from "next/link";
import ToolRating from "@/app/components/ToolRating";
import { ArrowRight, Eye, Flame, Folder, Sparkles } from "lucide-react";
import SidebarCard from "@/app/components/sidebarcard/SidebarCard";
import GrossProfitCalculator from "@/app/components/financecalculator/GrossProfitCalculator";
import NetProfitCalculator from "@/app/components/financecalculator/NetProfitCalculator";
import ROIReturnOnInvestmentCalculator from "@/app/components/financecalculator/ROIReturnOnInvestmentCalculator";
import ROASCalculator from "@/app/components/financecalculator/ROASCalculator";
import CostPerUnitCalculator from "@/app/components/financecalculator/CostPerUnitCalculator";
import MarkupCalculator from "@/app/components/financecalculator/MarkupCalculator";
import DiscountCalculator from "@/app/components/financecalculator/DiscountCalculator";
import VATCalculator from "@/app/components/financecalculator/VATCalculator";
import CommissionCalculator from "@/app/components/financecalculator/CommissionCalculator";
import WholesalePriceCalculator from "@/app/components/financecalculator/WholesalePriceCalculator";
import RetailPriceCalculator from "@/app/components/financecalculator/RetailPriceCalculator";
import RevenueCalculator from "@/app/components/financecalculator/RevenueCalculator";
import ContributionMarginCalculator from "@/app/components/financecalculator/ContributionMarginCalculator";
import OperatingMarginCalculator from "@/app/components/financecalculator/OperatingMarginCalculator";
import CashFlowCalculator from "@/app/components/financecalculator/CashFlowCalculator";
import PersonalLoanEMICalculator from "@/app/components/loanandcredit/PersonalLoanEMICalculator";
import BusinessLoanInterestCalculator from "@/app/components/loanandcredit/BusinessLoanInterestCalculator";
import StartupCostCalculator from "@/app/components/startupandbusinessplanning/StartupCostCalculator";
import BusinessValuationCalculator from "@/app/components/startupandbusinessplanning/BusinessValuationCalculator";
import PaybackPeriodCalculator from "@/app/components/startupandbusinessplanning/PaybackPeriodCalculator";
import WorkingCapitalCalculator from "@/app/components/startupandbusinessplanning/WorkingCapitalCalculator";
import BurnRateCalculator from "@/app/components/startupandbusinessplanning/BurnRateCalculator";
import RunwayCalculator from "@/app/components/startupandbusinessplanning/RunwayCalculator";
import InventoryTurnoverCalculator from "@/app/components/startupandbusinessplanning/InventoryTurnoverCalculator";
import NPVCalculator from "@/app/components/startupandbusinessplanning/NPVCalculator";
import DepreciationCalculator from "@/app/components/startupandbusinessplanning/DepreciationCalculator";
import PartnershipProfitSplitCalculator from "@/app/components/startupandbusinessplanning/PartnershipProfitSplitCalculator";
import EquityShareCalculator from "@/app/components/startupandbusinessplanning/EquityShareCalculator";
import CACCalculator from "@/app/components/marketingcalculators/CACCalculator";
import LTVCalculator from "@/app/components/marketingcalculators/LTVCalculator";
import ConversionRateCalculator from "@/app/components/marketingcalculators/ConversionRateCalculator";
import RecurringDepositCalculator from "@/app/components/marketingcalculators/RecurringDepositCalculator";
import CPMCalculator from "@/app/components/marketingcalculators/CPMCalculator";
import CPCCalculator from "@/app/components/marketingcalculators/CPCCalculator";
import CTRCalculator from "@/app/components/marketingcalculators/CTRCalculator";
import EmailROICalculator from "@/app/components/marketingcalculators/EmailROICalculator";
import AdsenseRevenueCalculator from "@/app/components/marketingcalculators/AdsenseRevenueCalculator";
import YouTubeRevenueCalculator from "@/app/components/marketingcalculators/YouTubeRevenueCalculator";
import InstagramEarningsCalculator from "@/app/components/marketingcalculators/InstagramEarningsCalculator";
import AffiliateCommissionCalculator from "@/app/components/marketingcalculators/AffiliateCommissionCalculator";
import FreelanceIncomeCalculator from "@/app/components/marketingcalculators/FreelanceIncomeCalculator";
import BloggingIncomeCalculator from "@/app/components/marketingcalculators/BloggingIncomeCalculator";
import DropshippingProfitCalculator from "@/app/components/ecommercecalculators/DropshippingProfitCalculator";
import SocialMediaEngagementCalculator from "@/app/components/marketingcalculators/SocialMediaEngagementCalculator";
import InfluencerROICalculator from "@/app/components/marketingcalculators/InfluencerROICalculator";
import AmazonFBACalculator from "@/app/components/ecommercecalculators/AmazonFBACalculator";
import ShippingCostCalculator from "@/app/components/ecommercecalculators/ShippingCostCalculator";
import OrderProfitCalculator from "@/app/components/ecommercecalculators/OrderProfitCalculator";
import AdSpendProfitCalculator from "@/app/components/ecommercecalculators/AdSpendProfitCalculator";
import SubscriptionRevenueCalculator from "@/app/components/ecommercecalculators/SubscriptionRevenueCalculator";
import RefundLossCalculator from "@/app/components/ecommercecalculators/RefundLossCalculator";
import MarketplaceCommissionCalculator from "@/app/components/ecommercecalculators/MarketplaceCommissionCalculator";
import InventoryRestockCalculator from "@/app/components/ecommercecalculators/InventoryRestockCalculator";
import BundlePricingCalculator from "@/app/components/ecommercecalculators/BundlePricingCalculator";
import WarehouseCostCalculator from "@/app/components/ecommercecalculators/WarehouseCostCalculator";
import DemandForecastCalculator from "@/app/components/ecommercecalculators/DemandForecastCalculator";
import InventoryHoldingCostCalculator from "@/app/components/ecommercecalculators/InventoryHoldingCostCalculator";
import EOQCalculator from "@/app/components/ecommercecalculators/EOQCalculator";
import InventoryTurnoverCalculatorITR from "@/app/components/ecommercecalculators/InventoryTurnoverCalculator";
import OvertimeCalculator from "@/app/components/salaryandtaxadvanced/OvertimeCalculator";
import PayrollTaxCalculator from "@/app/components/salaryandtaxadvanced/PayrollTaxCalculator";
import EmployeeCostCalculator from "@/app/components/salaryandtaxadvanced/EmployeeCostCalculator";
import FreelancerHourlyRateCalculator from "@/app/components/salaryandtaxadvanced/FreelancerHourlyRateCalculator";
import BonusCalculator from "@/app/components/salaryandtaxadvanced/BonusCalculator";
import SalaryStructureCalculator from "@/app/components/salaryandtaxadvanced/SalaryStructureCalculator";
import MutualFundReturnCalculator from "@/app/components/investmentandwealthplanning/MutualFundReturnCalculator";
import StockProfitCalculator from "@/app/components/investmentandwealthplanning/StockProfitCalculator";
import ProteinIntakeCalculator from "@/app/components/lifestylecalculator/ProteinIntakeCalculator";
import MacroCalculator from "@/app/components/lifestylecalculator/MacroCalculator";
import StepsToCalorieCalculator from "@/app/components/lifestylecalculator/StepsToCalorieCalculator";
import RunningPaceCalculator from "@/app/components/lifestylecalculator/RunningPaceCalculator";
import HeartRateCalculator from "@/app/components/lifestylecalculator/HeartRateCalculator";
import TargetHeartRateCalculator from "@/app/components/lifestylecalculator/TargetHeartRateCalculator";
import WaterIntakeCalculators from "@/app/components/lifestylecalculator/WaterIntakeCalculator";
import LoveCompatibilityCalculator from "@/app/components/personalplanning/LoveCompatibilityCalculator";
import LifePathNumberCalculator from "@/app/components/personalplanning/LifePathNumberCalculator";
import ZodiacCompatibilityCalculator from "@/app/components/personalplanning/ZodiacCompatibilityCalculator";
import AnniversaryCalculator from "@/app/components/personalplanning/AnniversaryCalculator";
import CountdownCalculator from "@/app/components/personalplanning/CountdownCalculator";
import SleepCycleCalculator from "@/app/components/healthcalculator/SleepCycleCalculator";
import TimeDurationCalculator from "@/app/components/personalplanning/TimeDurationCalculator";
import HabitTrackerCalculator from "@/app/components/personalplanning/HabitTrackerCalculator";
import DailyExpenseCalculator from "@/app/components/personalplanning/DailyExpenseCalculator";
import ElectricityBillCalculator from "@/app/components/homeanddailylife/ElectricityBillCalculator";
import WaterBillCalculator from "@/app/components/homeanddailylife/WaterBillCalculator";
import PaintCalculator from "@/app/components/homeanddailylife/PaintCalculator";
import TileCalculator from "@/app/components/homeanddailylife/TileCalculator";
import RoomAreaCalculator from "@/app/components/homeanddailylife/RoomAreaCalculator";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import AdsenseEarningCalculator from "@/app/components/marketingcalculators/AdsenseEarningsCalculator";
import AdsenseIncomeEstimator from "@/app/components/marketingcalculators/AdsenseIncomeEstimator";
import AdsenseRPMCalculator from "@/app/components/marketingcalculators/AdsenseRPMCalculator";
import AdsensePageRPMCalculator from "@/app/components/marketingcalculators/AdsensePageRPMCalculator";
import AdsenseDailyEarningsCalculator from "@/app/components/marketingcalculators/AdsenseDailyEarningsCalculator";
import AdsenseMonthlyIncomeCalculator from "@/app/components/marketingcalculators/AdsenseMonthlyIncomeCalculator";
import AdsenseTrafficIncomeCalculator from "@/app/components/marketingcalculators/AdsenseTrafficIncomeCalculator";
import AdsenseRevenuePerVisitorCalculator from "@/app/components/marketingcalculators/AdsenseRevenuePerVisitorCalculator";
import AdsenseClickEarningsCalculator from "@/app/components/marketingcalculators/AdsenseClickEarningsCalculator";
import AdsenseAdImpressionRevenueCalculator from "@/app/components/marketingcalculators/AdsenseAdImpressionRevenueCalculator";
import WebsiteAdRevenueCalculator from "@/app/components/marketingcalculators/WebsiteAdRevenueCalculator";
import BlinkitCommissionCalculator from "@/app/components/ecommercecalculators/BlinkitCommissionCalculator";
import ZeptoCommissionCalculator from "@/app/components/ecommercecalculators/ZeptoCommissionCalculator";
import SwiggyInstamartCalculator from "@/app/components/ecommercecalculators/SwiggyInstamartCalculator";
import MeeshoSellerCommissionCalculator from "@/app/components/ecommercecalculators/MeeshoSellerCommissionCalculator";
import AmazonSellerFeesCalculator from "@/app/components/ecommercecalculators/AmazonSellerFeesCalculator";
import FlipkartSellerProfitCalculator from "@/app/components/ecommercecalculators/FlipkartSellerProfitCalculator";
import AmazonFBAProfitCalculator from "@/app/components/ecommercecalculators/AmazonFBAProfitCalculator";
import GoogleAdsEarningCalculator from "@/app/components/ecommercecalculators/GoogleAdsEarningCalculator";
import GoogleAdRevenueCalculator from "@/app/components/ecommercecalculators/GoogleAdRevenueCalculator";
import GSTProfitMarginCalculator from "@/app/components/financecalculator/GSTProfitMarginCalculator";

/* =========================================================
   ✅ SEO METADATA (Dynamic Title + Keywords + OG + Canonical)
========================================================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [rows]: any = await db.query(
    `SELECT tools.*, tool_categories.name as categoryName
     FROM tools
     LEFT JOIN tool_categories
     ON tools.categoryId = tool_categories.id
     WHERE tools.slug=?`,
    [slug]
  );

  const tool = rows[0];
  if (!tool) return {};

  return generateToolSEO({
    name: tool.name,
    slug: tool.slug,
    description: tool.metaDescription,
    category: tool.categoryName,
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  // ✅ Get Tool + Category Slug
  const [rows] = await db.query(
    `SELECT tools.*, 
            tool_categories.name as categoryName,
            tool_categories.slug as categorySlug
     FROM tools
     LEFT JOIN tool_categories
     ON tools.categoryId = tool_categories.id
     WHERE tools.slug=? AND tools.isActive=1`,
    [slug]
  );

  const tool = (rows as any[])[0];
  if (!tool) return notFound();

  /* =========================================================
      ✅ USAGE COUNTER (SEO Behavioral Signal)
   ========================================================= */
  await db.query(
    "UPDATE tools SET usageCount = usageCount + 1 WHERE slug=?",
    [slug]
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  /* =========================================================
     ✅ STRUCTURED DATA SCHEMAS
  ========================================================= */
  const faqSchema = getCalculatorFAQSchema(tool.slug, tool.name);

  const softwareSchema = generateToolSchema({
    name: tool.name,
    description: tool.metaDescription,
    url: `${baseUrl}/tools/${tool.slug}`,
  });




  /* =========================================================
     ✅ INTERNAL LINK BOOST (SEO LINK JUICE)
  ========================================================= */
  const [popular] = await db.query<RowDataPacket[]>(
    "SELECT slug, name FROM tools WHERE isActive=1 ORDER BY usageCount DESC LIMIT 5"
  );

  const [recent] = await db.query<RowDataPacket[]>(
    "SELECT slug, name FROM tools WHERE isActive=1 ORDER BY createdAt DESC LIMIT 5"
  );

  const [categories] = await db.query<RowDataPacket[]>(
    "SELECT slug, name FROM tool_categories ORDER BY name ASC"
  );

  const [related] = await db.query(
    `SELECT slug, name 
     FROM tools 
     WHERE categoryId=? 
     AND slug!=?
     AND isActive=1
     LIMIT 6`,
    [tool.categoryId, slug]
  );

  return (
    <>


      <div className="w-full mx-auto px-0 py-5 md:flex gap-10">
        {/* ================= LEFT SIDE ================= */}
        <div className="w-full">

          {/* ================= BREADCRUMB UI ================= */}
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">›</span>

            <Link
              href={`/category/${tool.categorySlug}`}
              className="hover:underline"
            >
              {tool.categoryName}
            </Link>

            <span className="mx-2">›</span>

            <span className="text-gray-700 font-medium">
              {tool.name}
            </span>
          </nav>

          {/* ================= BREADCRUMB SCHEMA ================= */}
          <BreadcrumbSchema
            items={[
              { name: "Home", url: baseUrl },
              {
                name: tool.categoryName,
                url: `${baseUrl}/category/${tool.categorySlug}`,
              },
              {
                name: tool.name,
                url: `${baseUrl}/tools/${tool.slug}`,
              },
            ]}
          />

          <h1 className="text-3xl font-bold">
            {tool.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Eye size={16} className="text-gray-400" />
            <span>{tool.usageCount} views</span>
          </div>
          <p className="text-sm text-blue-600 mb-4">
            Category: {tool.categoryName}
          </p>

          <p className="mb-8 text-gray-600">
            {tool.description}
          </p>

          <div className="flex items-center gap-3 mb-6">

            <ToolRating
              slug={tool.slug}
              rating={Number(tool.rating)}
              ratingCount={Number(tool.ratingCount)}
            />
          </div>
          {tool.slug === "age-calculator" && <AgeCalculator />}
          {tool.slug === "gst-calculator" && <GSTCalculator />}
          {tool.slug === "emi-calculator" && <EMICalculator />}
          {tool.slug === "bmi-calculator" && <BMICalculator />}
          {tool.slug === "sip-calculator" && <SIPCalculator />}
          {tool.slug === "percentage-calculator" && <PercentageCalculator />}
          {tool.slug === "loan-calculator" && <LoanCalculator />}
          {tool.slug === "income-tax-calculator" && <IncomeTaxCalculator />}
          {tool.slug === "hra-calculator" && <HRACalculator />}
          {tool.slug === "gratuity-calculator" && <GratuityCalculator />}
          {tool.slug === "fd-calculator" && <FDCalculator />}
          {tool.slug === "rd-calculator" && <RDCalculator />}
          {tool.slug === "compound-interest-calculator" && (<CompoundInterestCalculator />)}
          {tool.slug === "simple-interest-calculator" && (<SimpleInterestCalculator />)}
          {tool.slug === "ppf-calculator" && <PPFCalculator />}
          {tool.slug === "nps-calculator" && <NPSCalculator />}
          {tool.slug === "inflation-calculator" && <InflationCalculator />}
          {tool.slug === "salary-calculator" && <SalaryCalculator />}
          {tool.slug === "profit-margin-calculator" && (<ProfitMarginCalculator />)}
          {tool.slug === "break-even-calculator" && (<BreakEvenCalculator />)}
          {tool.slug === "roi-calculator" && <ROICalculator />}
          {tool.slug === "gst-reverse-calculator" && (<GSTReverseCalculator />)}
          {tool.slug === "mortgage-calculator" && (<MortgageCalculator />)}
          {tool.slug === "amortization-calculator" && (<AmortizationCalculator />)}
          {tool.slug === "mortgage-payoff-calculator" && (<MortgagePayoffCalculator />)}
          {tool.slug === "house-affordability-calculator" && (<HouseAffordabilityCalculator />)}
          {tool.slug === "rent-calculator" && <RentCalculator />}
          {tool.slug === "debt-to-income-calculator" && (<DebtToIncomeCalculator />)}
          {tool.slug === "real-estate-calculator" && (<RealEstateCalculator />)}
          {tool.slug === "refinance-calculator" && (<RefinanceCalculator />)}
          {tool.slug === "rental-property-calculator" && (<RentalPropertyCalculator />)}
          {tool.slug === "apr-calculator" && <APRCalculator />}
          {tool.slug === "fha-loan-calculator" && (<FHALoanCalculator />)}
          {tool.slug === "va-mortgage-calculator" && (<VAMortgageCalculator />)}
          {tool.slug === "home-equity-loan-calculator" && (<HomeEquityLoanCalculator />)}
          {tool.slug === "heloc-calculator" && (<HELOCCalculator />)}
          {tool.slug === "down-payment-calculator" && (<DownPaymentCalculator />)}
          {tool.slug === "rent-vs-buy-calculator" && (<RentVsBuyCalculator />)}
          {tool.slug === "credit-card-payoff-calculator" && (<CreditCardPayoffCalculator />)}
          {tool.slug === "arm-calculator" && (<ARMCalculator />)}
          {tool.slug === "college-cost-calculator" && (<CollegeCostCalculator />)}
          {tool.slug === "net-worth-calculator" && (<NetWorthCalculator />)}
          {tool.slug === "bmr-calculator" && <BMRCalculator />}
          {tool.slug === "tdee-calculator" && <TDEECalculator />}
          {tool.slug === "calorie-calculator" && <CalorieCalculator />}
          {tool.slug === "ideal-weight-calculator" && <IdealWeightCalculator />}
          {tool.slug === "body-fat-calculator" && <BodyFatCalculator />}
          {tool.slug === "water-intake-calculator" && <WaterIntakeCalculator />}
          {tool.slug === "pregnancy-due-date-calculator" && <PregnancyDueDateCalculator />}
          {tool.slug === "ovulation-calculator" && <OvulationCalculator />}
          {tool.slug === "period-calculator" && <PeriodCalculator />}
          {tool.slug === "days-between-dates-calculator" && <DaysBetweenDatesCalculator />}
          {tool.slug === "working-days-calculator" && <WorkingDaysCalculator />}
          {tool.slug === "age-difference-calculator" && <AgeDifferenceCalculator />}
          {tool.slug === "countdown-timer-tool" && <CountdownTimerTool />}
          {tool.slug === "time-zone-converter" && <TimeZoneConverter />}
          {tool.slug === "date-duration-calculator" && <DateDurationCalculator />}
          {tool.slug === "percentage-to-cgpa-converter" && <PercentageToCGPAConverter />}
          {tool.slug === "cgpa-to-percentage-converter" && <CGPAToPercentageConverter />}
          {tool.slug === "marks-percentage-calculator" && <MarksPercentageCalculator />}
          {tool.slug === "exam-score-calculator" && <ExamScoreCalculator />}
          {tool.slug === "rank-predictor-tool" && <RankPredictorTool />}
          {tool.slug === "sgpa-to-cgpa-converter" && <SGPAToCGPAConverter />}
          {tool.slug === "study-time-calculator" && <StudyTimeCalculator />}
          {tool.slug === "gpa-to-percentage-international" && <GPAToPercentageInternational />}
          {tool.slug === "attendance-percentage-calculator" && <AttendancePercentageCalculator />}
          {tool.slug === "study-planner-calculator" && <StudyPlannerCalculator />}
          {tool.slug === "college-cutoff-predictor" && <CollegeCutoffPredictor />}
          {tool.slug === "ai-college-recommendation-tool" && <AICollegeRecommendationTool />}
          {tool.slug === "college-comparison-tool" && <CollegeComparisonTool />}
          {tool.slug === "education-loan-emi-calculator" && <EducationLoanEMICalculator />}
          {tool.slug === "scholarship-eligibility-calculator" && <ScholarshipEligibilityCalculator />}
          {tool.slug === "lumpsum-investment-calculator" && <LumpsumCalculator />}
          {tool.slug === "step-up-sip-calculator" && <StepUpSIPCalculator />}
          {tool.slug === "swp-calculator" && <SWPCalculator />}
          {tool.slug === "capital-gains-tax-calculator" && <CapitalGainsCalculator />}
          {tool.slug === "advanced-capital-gains-calculator" && <AdvancedCapitalGainsCalculator />}
          {tool.slug === "property-capital-gain-calculator" && <PropertyCapitalGainCalculator />}
          {tool.slug === "dividend-tax-calculator" && <DividendTaxCalculator />}
          {tool.slug === "dividend-yield-calculator" && <DividendYieldCalculator />}
          {tool.slug === "stock-average-calculator" && <StockAverageCalculator />}
          {tool.slug === "stock-return-calculator" && <StockReturnCalculator />}
          {tool.slug === "portfolio-return-calculator" && <PortfolioReturnCalculator />}
          {tool.slug === "property-capital-gain-with-stamp-duty" && <PropertyCapitalGainWithStampCalculator />}
          {tool.slug === "mutual-fund-tax-calculator" && <MutualFundTaxCalculator />}
          {tool.slug === "retirement-planner-pro" && <RetirementPlannerPro />}
          {tool.slug === "xirr-calculator-pro" && <XIRRCalculatorPro />}
          {tool.slug === "retirement-corpus-calculator" && <RetirementCorpusCalculator />}
          {tool.slug === "complete-income-tax-calculator" && <CompleteIncomeTaxCalculator />}
          {tool.slug === "international-income-tax-calculator" && <InternationalIncomeTaxCalculator />}
          {tool.slug === "loan-prepayment-calculator" && <LoanPrepaymentCalculator />}
          {tool.slug === "personal-loan-eligibility-calculator" && <PersonalLoanEligibilityCalculator />}
          {tool.slug === "credit-score-improvement-estimator" && <CreditScoreImprovementEstimator />}
          {tool.slug === "car-loan-emi-calculator" && <CarLoanEMICalculator />}
          {tool.slug === "home-loan-emi-calculator" && <HomeLoanEMICalculator />}
          {tool.slug === "home-loan-prepayment-calculator" && <HomeLoanPrepaymentCalculator />}
          {tool.slug === "home-loan-balance-transfer-calculator" && <HomeLoanBalanceTransferCalculator />}
          {tool.slug === "bike-loan-emi-calculator" && <BikeLoanEMICalculator />}
          {tool.slug === "loan-balance-transfer-calculator" && <LoanBalanceTransferCalculator />}
          {tool.slug === "take-home-salary-calculator" && <TakeHomeSalaryCalculator />}
          {tool.slug === "hra-exemption-calculator" && <HRAExemptionCalculator />}
          {tool.slug === "section-80c-calculator" && <Section80CCalculator />}
          {tool.slug === "pf-calculator" && <PFCalculator />}
          {tool.slug === "salary-slip-generator" && <SalarySlipGenerator />}
          {tool.slug === "gross-profit-calculator" && <GrossProfitCalculator />}
          {tool.slug === "net-profit-calculator" && <NetProfitCalculator />}
          {tool.slug === "roi-return-on-investment-calculator" && <ROIReturnOnInvestmentCalculator />}
          {tool.slug === "roas-calculator" && <ROASCalculator />}
          {tool.slug === "cost-per-unit-calculator" && <CostPerUnitCalculator />}
          {tool.slug === "markup-calculator" && <MarkupCalculator />}
          {tool.slug === "discount-calculator" && <DiscountCalculator />}
          {tool.slug === "vat-calculator" && <VATCalculator />}
          {tool.slug === "commission-calculator" && <CommissionCalculator />}
          {tool.slug === "wholesale-price-calculator" && <WholesalePriceCalculator />}
          {tool.slug === "retail-price-calculator" && <RetailPriceCalculator />}
          {tool.slug === "revenue-calculator" && <RevenueCalculator />}
          {tool.slug === "contribution-margin-calculator" && <ContributionMarginCalculator />}
          {tool.slug === "operating-margin-calculator" && <OperatingMarginCalculator />}
          {tool.slug === "cash-flow-calculator" && <CashFlowCalculator />}
          {tool.slug === "personal-loan-emi-calculator" && <PersonalLoanEMICalculator />}
          {tool.slug === "business-loan-interest-calculator" && <BusinessLoanInterestCalculator />}
          {tool.slug === "startup-cost-calculator" && <StartupCostCalculator />}
          {tool.slug === "business-valuation-calculator" && <BusinessValuationCalculator />}
          {tool.slug === "payback-period-calculator" && <PaybackPeriodCalculator />}
          {tool.slug === "working-capital-calculator" && <WorkingCapitalCalculator />}
          {tool.slug === "burn-rate-calculator" && <BurnRateCalculator />}
          {tool.slug === "runway-calculator" && <RunwayCalculator />}
          {tool.slug === "inventory-turnover-calculator" && <InventoryTurnoverCalculator />}
          {tool.slug === "npv-calculator" && <NPVCalculator />}
          {tool.slug === "depreciation-calculator" && <DepreciationCalculator />}
          {tool.slug === "partnership-profit-split-calculator" && <PartnershipProfitSplitCalculator />}
          {tool.slug === "equity-share-calculator" && <EquityShareCalculator />}
          {tool.slug === "customer-acquisition-cost-calculator" && <CACCalculator />}
          {tool.slug === "customer-lifetime-value-calculator" && <LTVCalculator />}
          {tool.slug === "conversion-rate-calculator" && <ConversionRateCalculator />}
          {tool.slug === "recurring-deposit-calculator" && <RecurringDepositCalculator />}
          {tool.slug === "cpm-calculator" && <CPMCalculator />}
          {tool.slug === "cpc-calculator" && <CPCCalculator />}
          {tool.slug === "ctr-calculator" && <CTRCalculator />}
          {tool.slug === "email-roi-calculator" && <EmailROICalculator />}
          {tool.slug === "adsense-revenue-calculator" && <AdsenseRevenueCalculator />}
          {tool.slug === "youtube-revenue-calculator" && <YouTubeRevenueCalculator />}
          {tool.slug === "instagram-earnings-calculator" && <InstagramEarningsCalculator />}
          {tool.slug === "affiliate-commission-calculator" && <AffiliateCommissionCalculator />}
          {tool.slug === "freelance-income-calculator" && <FreelanceIncomeCalculator />}
          {tool.slug === "blogging-income-calculator" && <BloggingIncomeCalculator />}
          {tool.slug === "dropshipping-profit-calculator" && <DropshippingProfitCalculator />}
          {tool.slug === "social-media-engagement-rate-calculator" && <SocialMediaEngagementCalculator />}
          {tool.slug === "influencer-roi-calculator" && <InfluencerROICalculator />}
          {tool.slug === "amazon-fba-fee-calculator" && <AmazonFBACalculator />}
          {tool.slug === "shipping-cost-calculator" && <ShippingCostCalculator />}
          {tool.slug === "order-profit-calculator" && <OrderProfitCalculator />}
          {tool.slug === "ad-spend-profit-calculator" && <AdSpendProfitCalculator />}
          {tool.slug === "subscription-revenue-calculator" && <SubscriptionRevenueCalculator />}
          {tool.slug === "refund-loss-calculator" && <RefundLossCalculator />}
          {tool.slug === "marketplace-commission-calculator" && <MarketplaceCommissionCalculator />}
          {tool.slug === "inventory-restock-calculator" && <InventoryRestockCalculator />}
          {tool.slug === "bundle-pricing-calculator" && <BundlePricingCalculator />}
          {tool.slug === "warehouse-cost-calculator" && <WarehouseCostCalculator />}
          {tool.slug === "demand-forecast-calculator" && <DemandForecastCalculator />}
          {tool.slug === "inventory-holding-cost-calculator" && <InventoryHoldingCostCalculator />}
          {tool.slug === "economic-order-quantity-eoq-calculator" && <EOQCalculator />}
          {tool.slug === "inventory-turnover-ratio-calculator" && <InventoryTurnoverCalculatorITR />}
          {tool.slug === "overtime-calculator" && <OvertimeCalculator />}
          {tool.slug === "payroll-tax-calculator" && <PayrollTaxCalculator />}
          {tool.slug === "employee-cost-calculator" && <EmployeeCostCalculator />}
          {tool.slug === "freelancer-hourly-rate-calculator" && <FreelancerHourlyRateCalculator />}
          {tool.slug === "bonus-calculator" && <BonusCalculator />}
          {tool.slug === "salary-structure-calculator" && <SalaryStructureCalculator />}
          {tool.slug === "mutual-fund-return-calculator" && <MutualFundReturnCalculator />}
          {tool.slug === "stock-profit-calculator" && <StockProfitCalculator />}
          {tool.slug === "protein-intake-calculator" && <ProteinIntakeCalculator />}
          {tool.slug === "macro-calculator" && <MacroCalculator />}
          {tool.slug === "steps-to-calorie-calculator" && <StepsToCalorieCalculator />}
          {tool.slug === "running-pace-calculator" && <RunningPaceCalculator />}
          {tool.slug === "heart-rate-calculator" && <HeartRateCalculator />}
          {tool.slug === "target-heart-rate-calculator" && <TargetHeartRateCalculator />}
          {tool.slug === "water-in-take-calculator" && <WaterIntakeCalculators />}
          {tool.slug === "love-compatibility-calculator" && <LoveCompatibilityCalculator />}
          {tool.slug === "life-path-number-calculator" && <LifePathNumberCalculator />}
          {tool.slug === "zodiac-compatibility-calculator" && <ZodiacCompatibilityCalculator />}
          {tool.slug === "anniversary-calculator" && <AnniversaryCalculator />}
          {tool.slug === "countdown-calculator" && <CountdownCalculator />}
          {tool.slug === "sleep-cycle-calculator" && <SleepCycleCalculator />}
          {tool.slug === "time-duration-calculator" && <TimeDurationCalculator />}
          {tool.slug === "habit-tracker-calculator" && <HabitTrackerCalculator />}
          {tool.slug === "daily-expense-calculator" && <DailyExpenseCalculator />}
          {tool.slug === "electricity-bill-calculator" && <ElectricityBillCalculator />}
          {tool.slug === "water-bill-calculator" && <WaterBillCalculator />}
          {tool.slug === "paint-calculator" && <PaintCalculator />}
          {tool.slug === "tile-calculator" && <TileCalculator />}
          {tool.slug === "room-area-calculator" && <RoomAreaCalculator />}
          {tool.slug === "adsense-earnings-calculator" && <AdsenseEarningCalculator />}
          {tool.slug === "adsense-income-estimator" && <AdsenseIncomeEstimator />}
          {tool.slug === "adsense-rpm-calculator" && <AdsenseRPMCalculator />}
          {tool.slug === "adsense-page-rpm-calculator" && <AdsensePageRPMCalculator />}
          {tool.slug === "adsense-daily-earnings-calculator" && <AdsenseDailyEarningsCalculator />}
          {tool.slug === "adsense-monthly-income-calculator" && <AdsenseMonthlyIncomeCalculator />}
          {tool.slug === "adsense-traffic-income-calculator" && <AdsenseTrafficIncomeCalculator />}
          {tool.slug === "adsense-revenue-per-visitor-calculator" && <AdsenseRevenuePerVisitorCalculator />}
          {tool.slug === "adsense-click-earnings-calculator" && <AdsenseClickEarningsCalculator />}
          {tool.slug === "adsense-ad-impression-revenue-calculator" && <AdsenseAdImpressionRevenueCalculator />}
          {tool.slug === "website-ad-revenue-calculator" && <WebsiteAdRevenueCalculator />}
          {tool.slug === "blinkit-seller-commission-calculator" && <BlinkitCommissionCalculator />}
          {tool.slug === "zepto-seller-commission-calculator" && (<><ZeptoCommissionCalculator /></>)}
          {tool.slug === "swiggy-instamart-seller-calculator" && (<><SwiggyInstamartCalculator /></>)}
          {tool.slug === "meesho-seller-commission-calculator" && (<MeeshoSellerCommissionCalculator />)}
          {tool.slug === "amazon-seller-fees-calculator" && (<AmazonSellerFeesCalculator/>)}
          {tool.slug === "flipkart-seller-profit-calculator" && (<FlipkartSellerProfitCalculator/>)}
          {tool.slug === "amazon-fba-profit-calculator" && (<AmazonFBAProfitCalculator/>)}
          {tool.slug === "google-ads-earning-calculator" && (<GoogleAdsEarningCalculator/>)}
          {tool.slug === "google-ad-revenue-calculator" && (<GoogleAdRevenueCalculator/>)}
          {tool.slug === "gst-profit-margin-calculator" && (<GSTProfitMarginCalculator/>)}









          <AdSlot location="tool_middle" />

          {/* About Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">
              About {tool.name}
            </h2>

            <p className="text-gray-700 leading-7">
              {tool.metaDescription}
            </p>
          </div>

          {/* Related Tools */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">
              Related Tools
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              {(related as any[]).map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools/${item.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">

                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {item.name}
                    </h4>

                    <ArrowRight
                      size={18}
                      className="text-gray-400 group-hover:text-blue-600 transition"
                    />
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Explore and calculate instantly using our {item.name}.
                  </p>

                </Link>
              ))}

            </div>
          </div>
        </div>
        {/* ================= RIGHT SIDEBAR ================= */}

      </div>
    </>
  );
}