import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox"; // Assuming this is your layout wrapper
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

function NoticeBoard() {
  // Static notices for tax-related information
  const notices = [
    {
      id: 1,
      image: "https://profit-whiz.com/wp-content/uploads/2024/07/Untitled-design144-1024x576.png", // Example image URL
      title: "New Tax Regulations for 2024",
      description: "The government has updated the tax regulations for 2024. Click to learn more.",
      link: "https://nbr.gov.bd/taxtypes/income-tax/income-tax-paripatra/eng",
    },
    {
      id: 2,
      image: "https://finli.com/wp-content/uploads/2024/07/tax-deadline-2024-when-are-taxes-due.webp",
      title: "Deadline for Tax Filing",
      description: "The deadline for tax filing is approaching soon. Make sure to file your taxes on time.",
      link: "https://government-website.com/tax-filing-deadline",
    },
    {
      id: 3,
      image: "https://www.kanakkupillai.com/learn/wp-content/uploads/2022/08/FAQ-Released-by-Income-Tax-Department.png",
      title: "Income Tax FAQs",
      description: "Learn everything related to tax payment.",
      link: "https://nbr.gov.bd/faq/income-tax-faq/eng",
    },
    {
      id: 4,
      image: "https://taishaaccountingservices.com.ng/wp-content/uploads/2024/03/personal-income-tax.png",
      title: "Income Tax Rules",
      description: "Information about the rules and regulation of taxation.",
      link: "https://nbr.gov.bd/regulations/rules/income-tax-rules/eng",
    },
  ];

  return (
    <MDBox p={2}>
      <Grid container spacing={4}> {/* Increased spacing from 3 to 4 */}
        {/* Iterate through static notices and display each one as a card */}
        {notices.map((notice) => (
          <Grid item xs={12} md={6} key={notice.id}>
            <SimpleBlogCard
              image={notice.image} // Image URL for the notice
              title={notice.title} // Title of the notice
              description={notice.description} // Short description of the notice
              action={{
                type: "external",
                route: notice.link, // Link to the government website for that notice
                color: "info", // Button color
                label: "Read More", // Button label
              }}
            />
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}

export default NoticeBoard;
