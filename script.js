"use strict";

const STORAGE_KEY = "civicConnectReports";

const issueForm = document.getElementById("issueForm");
const formMessage = document.getElementById("formMessage");
const reportsList = document.getElementById("reportsList");
const reportCount = document.getElementById("reportCount");
const searchForm = document.getElementById("searchForm");
const searchIdInput = document.getElementById("searchId");
const searchResult = document.getElementById("searchResult");

function loadReports() {
  try {
    const reports = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(reports) ? reports : [];
  } catch {
    return [];
  }
}

function saveReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

function createComplaintId() {
  const timePart = Date.now().toString().slice(-6);
  const randomPart = Math.floor(Math.random() * 10);
  return `CIV-${timePart}${randomPart}`;
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateString));
}

function getStatusClass(status) {
  if (status === "In progress") return "badge-in-progress";
  if (status === "Resolved") return "badge-resolved";
  return "badge-received";
}


