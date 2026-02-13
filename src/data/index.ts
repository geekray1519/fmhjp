import { Category } from "@/lib/types";
import aiData from "./resources/ai.json";
import audioData from "./resources/audio.json";
import developerToolsData from "./resources/developer-tools.json";
import downloadingData from "./resources/downloading.json";
import educationalData from "./resources/educational.json";
import fileToolsData from "./resources/file-tools.json";
import gamingData from "./resources/gaming.json";
import gamingToolsData from "./resources/gaming-tools.json";
import imageToolsData from "./resources/image-tools.json";
import internetToolsData from "./resources/internet-tools.json";
import linuxMacosData from "./resources/linux-macos.json";
import miscData from "./resources/misc.json";
import mobileData from "./resources/mobile.json";
import nonEnglishData from "./resources/non-english.json";
import privacyData from "./resources/privacy.json";
import readingData from "./resources/reading.json";
import socialMediaToolsData from "./resources/social-media-tools.json";
import storageData from "./resources/storage.json";
import systemToolsData from "./resources/system-tools.json";
import textToolsData from "./resources/text-tools.json";
import torrentingData from "./resources/torrenting.json";
import videoData from "./resources/video.json";
import videoToolsData from "./resources/video-tools.json";
import unsafeData from "./resources/unsafe.json";

export const categories: Category[] = [
  aiData as Category,
  audioData as Category,
  developerToolsData as Category,
  downloadingData as Category,
  educationalData as Category,
  fileToolsData as Category,
  gamingData as Category,
  gamingToolsData as Category,
  imageToolsData as Category,
  internetToolsData as Category,
  linuxMacosData as Category,
  miscData as Category,
  mobileData as Category,
  nonEnglishData as Category,
  privacyData as Category,
  readingData as Category,
  socialMediaToolsData as Category,
  storageData as Category,
  systemToolsData as Category,
  textToolsData as Category,
  torrentingData as Category,
  videoData as Category,
  videoToolsData as Category,
  unsafeData as Category,
];
