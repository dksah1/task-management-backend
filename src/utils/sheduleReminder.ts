import cron from "node-cron";
import express from "express";

const app = express();

const generateTargetReports = () => {
  console.log("Generating target reports");
};

app.get("/send-target-reports", (req, res) => {
  console.log("Sending target reports to sales executives");
  res.send("Target reports sent successfully");
});

cron.schedule("0 17 * * 5", generateTargetReports);
