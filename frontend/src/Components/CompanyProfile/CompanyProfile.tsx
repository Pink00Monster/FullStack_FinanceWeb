import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyKeyMetrics } from "../../company";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinners/Spinner";
import {
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import StockComment from "../StockComment/StockComment";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowToEquityTTM),
    subTitle:
      "Free cash flow to equity is the cash available to the company's equity shareholders after all expenses, reinvestments, and debt repayments.",
  },
  {
    label: "Net Current Asset Value",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.netCurrentAssetValueTTM),
    subTitle:
      "Net current asset value is the difference between a company's current assets and current liabilities.",
  },
  {
    label: "Tangible Asset Value",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.tangibleAssetValueTTM),
    subTitle: "A tangible asset is a physical item with a finite monetary value that can be touched and utilized, such as land, buildings, or machinery, and is recorded on a company's balance sheet.",
  },
  {
    label: "Capex To Revenue",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexToRevenueTTM),
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.grahamNumberTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "Operating Cycle",
    render: (company: CompanyKeyMetrics) => formatRatio(company.operatingCycleTTM),
    subTitle:
      "The operating cycle is the average period of time it takes for a company to purchase inventory, sell it, and collect cash from customers.",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  useEffect(() => {
    const getCompanyKeyRatios = async () => {
      const value = await getKeyMetrics(ticker);
      setCompanyData(value?.data[0]);
    };
    getCompanyKeyRatios();
  }, []);
  return (
    <>
      {companyData ? (
        <>
          <RatioList config={tableConfig} data={companyData} />
          <StockComment stockSymbol={ticker} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;
