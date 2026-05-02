import {
  personal,
  skills,
  experience,
  education,
  projects,
  certificates,
  spokenLanguages,
  softSkills,
  navLinks,
} from "../data/portfolioData";

export const defaultPortfolioData = {
  personal,
  skills,
  experience,
  education,
  projects,
  certificates,
  spokenLanguages,
  softSkills,
  navLinks,
};

export function getPortfolioData() {
  const saved = localStorage.getItem("portfolioData");

  if (!saved) return defaultPortfolioData;

  try {
    return JSON.parse(saved);
  } catch {
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data) {
  localStorage.setItem("portfolioData", JSON.stringify(data));
}

export function resetPortfolioData() {
  localStorage.removeItem("portfolioData");
}