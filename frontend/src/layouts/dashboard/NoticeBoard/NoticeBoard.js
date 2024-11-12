import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox"; // Assuming this is your layout wrapper

function NoticeBoard() {
  const notices = [
    {
      id: 1,
      image: "https://profit-whiz.com/wp-content/uploads/2024/07/Untitled-design144-1024x576.png",
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
    <MDBox
      p={3}
      mt={4}
      mb={4}
      style={{
        backgroundImage: `linear-gradient(to right, #e0f7fa, #e3f2fd)`,
        color: "#333",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
        Notice Board
      </Typography>
      <Grid container spacing={4}>
        {notices.map((notice) => (
          <Grid item xs={12} md={6} key={notice.id}>
            <Card
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)", // Light background for each card
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for cards
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={notice.image}
                alt={notice.title}
                style={{ borderRadius: "12px 12px 0 0" }}
              />
              <CardContent>
                <Typography variant="h6" style={{ color: "#333", fontWeight: "bold" }}>
                  {notice.title}
                </Typography>
                <Typography variant="body2" style={{ color: "#555", marginBottom: "12px" }}>
                  {notice.description}
                </Typography>
                <Button
                  variant="contained"
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#00796b",
                    color: "#fff",
                    textTransform: "none",
                    boxShadow: "0px 0px 8px 2px rgba(0, 121, 107, 0.6)", // Glowing neon effect
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = "0px 0px 12px 4px rgba(0, 121, 107, 0.8)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = "0px 0px 8px 2px rgba(0, 121, 107, 0.6)";
                  }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}

export default NoticeBoard;
