import { RestDetail } from "shared";

export default function (detail: RestDetail) {
  return [
    ["Document Type:", "unknown key"],
    ["Funding Opportunity Number:", detail.opportunityNumber],
    ["Funding Opportunity Title:", detail.opportunityTitle],
    ["Opportunity Category:", detail.opportunityCategory.description],
    ["Opportunity Category Explanation:", "unknown key"],
    [
      "Funding Instrument Type:",
      detail.synopsis.fundingInstruments.map((f) => f.description).join(" "),
    ],
    [
      "Category of Funding Activity:",
      detail.synopsis.fundingActivityCategories
        .map((f) => f.description)
        .join(" "),
    ],
    ["Category Explanation:", "unknown key"],
    ["Expected Number of Awards:", "unknown key"],
    [
      "CFDA Number(s):",
      detail.cfdas.map((v) => `${v.cfdaNumber} ${v.programTitle}`).join(" "),
    ],
    [
      "Cost Sharing or Matching Requirement:",
      detail.synopsis.costSharing ? "Yes" : "No",
    ],
    ["Version:", `Synopsis ${detail.synopsis.version}`],
    ["Posted Date:", detail.synopsis.postingDate + ""],
    ["Last Updated Date:", detail.synopsis.lastUpdatedDate + ""],
    [
      "Original Closing Date for Applications:",
      detail.synopsis.responseDate + "",
    ],
    [
      "Current Closing Date for Applications:",
      detail.synopsis.responseDate + "",
    ],
    ["Archive Date:", detail.synopsis.archiveDate + ""],
    ["Estimated Total Program Funding:", "unknown key"],
    ["Award Ceiling:", "unknown key"],
    ["Award Floor:", "unknown key"],
  ];
}
