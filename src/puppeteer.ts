const {
  getDataReport,
  readyRenderReport,
  currentHost = "",
}: WindowPuppeteer = window as any;

const puppeteer = { getDataReport, readyRenderReport, currentHost };

export default puppeteer;

/**
 * Types
 */

interface WindowPuppeteer {
  currentHost: string;
  getDataReport?: () => Promise<any>;
  readyRenderReport?: () => Promise<void>;
}
