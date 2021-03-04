export const message = "hello world";

/**
 * Types
 */
export interface OppHits {
  id: string;
  number: string;
  title: string;
  agencyCode: string;
  agency: string;
  openDate: string;
  closeDate: string;
  oppStatus: string;
  docType: string;
  cfdaList: string[];
}

export interface RestOpportunity {
  searchParams: {
    resultType: string;
    searchOnly: boolean;
    oppNum: string;
    cfda: string;
    sortBy: string;
    oppStatuses: string;
    startRecordNum: number;
    eligibilities: string;
    fundingInstruments: string;
    fundingCategories: string;
    agencies: string;
    rows: number;
    keyword: string;
    keywordEncoded: boolean;
  };
  hitCount: number;
  startRecord: number;
  oppHits: OppHits[];
  oppStatusOptions: {
    label: string;
    value: string;
    count: number;
  }[];
  dateRangeOptions: {
    label: string;
    value: string;
    count: number;
  }[];
  suggestion: string;
  eligibilities: {
    label: string;
    value: string;
    count: number;
  }[];
  fundingCategories: {
    label: string;
    value: string;
    count: number;
  }[];
  fundingInstruments: {
    label: string;
    value: string;
    count: number;
  }[];
  agencies: {
    subAgencyOptions: {
      label: string;
      value: string;
      count: number;
    }[];
    label: string;
    value: string;
    count: number;
  }[];
  accessKey: string;
  errorMsgs: never[];
}

export interface RestDetail {
  id: number;
  revision: number;
  opportunityNumber: string;
  opportunityTitle: string;
  owningAgencyCode: string;
  listed: string;
  publisherUid: string;
  flag2006: string;
  opportunityCategory: {
    category: string;
    description: string;
  };
  synopsis: {
    opportunityId: number;
    version: number;
    agencyCode: string;
    agencyName: string;
    agencyPhone: string;
    agencyAddressDesc: string;
    agencyDetails: {
      code: string;
      seed: string;
      agencyName: string;
      agencyCode: string;
      topAgencyCode: string;
    };
    topAgencyDetails: {
      code: string;
      seed: string;
      agencyName: string;
      agencyCode: string;
      topAgencyCode: string;
    };
    agencyContactPhone: string;
    agencyContactName: string;
    agencyContactDesc: string;
    agencyContactEmail: string;
    agencyContactEmailDesc: string;
    synopsisDesc: string;
    responseDate: string;
    fundingDescLinkUrl: string;
    fundingDescLinkDesc: string;
    postingDate: string;
    archiveDate: string;
    costSharing: boolean;
    awardCeiling: string;
    awardFloor: string;
    applicantEligibilityDesc: string;
    sendEmail: string;
    createTimeStamp: string;
    createdDate: string;
    lastUpdatedDate: string;
    applicantTypes: {
      id: string;
      description: string;
    }[];
    fundingInstruments: {
      id: string;
      description: string;
    }[];
    fundingActivityCategories: {
      id: string;
      description: string;
    }[];
    responseDateStr: string;
    postingDateStr: string;
    archiveDateStr: string;
    createTimeStampStr: string;
  };
  agencyDetails: {
    code: string;
    seed: string;
    agencyName: string;
    agencyCode: string;
    topAgencyCode: string;
  };
  topAgencyDetails: {
    code: string;
    seed: string;
    agencyName: string;
    agencyCode: string;
    topAgencyCode: string;
  };
  synopsisAttachmentFolders: never[];
  synopsisDocumentURLs: never[];
  synAttChangeComments: never[];
  cfdas: {
    id: number;
    opportunityId: number;
    cfdaNumber: string;
    programTitle: string;
  }[];
  opportunityHistoryDetails: never[];
  opportunityPkgs: never[];
  closedOpportunityPkgs: never[];
  originalDueDate: string;
  synopsisModifiedFields: never[];
  forecastModifiedFields: never[];
  errorMessages: never[];
  synPostDateInPast: boolean;
  docType: string;
  forecastHistCount: number;
  synopsisHistCount: number;
  assistCompatible: boolean;
  assistURL: string;
  relatedOpps: never[];
  draftMode: string;
}
