import React, { useState } from "react";
import axios from "axios";
import './TaxFilingForm.css';

const TaxFilingForm = () => {
  const [language, setLanguage] = useState("english");
  const [formData, setFormData] = useState({
    name: "",
    tin: "",
    totalIncome: {
      rentIncome: "",
      agricultureIncome: "",
      businessIncome: "",
      capitalIncome: "",
      financialIncome: "",
      otherIncome: "",
      foreignIncome: ""
    },
    taxDetails: {
      totalTax: "",
      minimumTax: "",
      turnoverTax: "",
      payableTax: "",
      environmentSurcharge: "",
      interestPenalty: "",
      totalPayableTax: ""
    },
    paymentDetails: {
      withholdingTax: "",
      advanceTax: "",
      refundAdjustment: "",
      remainingTax: "",
      finalPayment: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('totalIncome')) {
      setFormData({
        ...formData,
        totalIncome: {
          ...formData.totalIncome,
          [name.split('.')[1]]: value
        }
      });
    } else if (name.startsWith('taxDetails')) {
      setFormData({
        ...formData,
        taxDetails: {
          ...formData.taxDetails,
          [name.split('.')[1]]: value
        }
      });
    } else if (name.startsWith('paymentDetails')) {
      setFormData({
        ...formData,
        paymentDetails: {
          ...formData.paymentDetails,
          [name.split('.')[1]]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tax/submit", formData);
      alert(language === "english" ? "Tax filed successfully" : "কর সফলভাবে দাখিল হয়েছে");
    } catch (error) {
      console.error(error);
      alert(language === "english" ? "Error submitting the tax form" : "কর ফর্ম দাখিলের সময় ত্রুটি হয়েছে");
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "bangla" : "english");
  };

  return (
    <div className="tax-form-container">
      <button onClick={toggleLanguage} className="language-toggle-btn">
        {language === "english" ? "বাংলা" : "English"}
      </button>

      <form onSubmit={handleSubmit} className="tax-form">
        <h2>{language === "english" ? "Tax Filing Form" : "কর দাখিল ফর্ম"}</h2>

        <div className="form-section">
          <h3>{language === "english" ? "Taxpayer Details" : "করদাতার বিবরণ"}</h3>
          <input
            type="text"
            name="name"
            placeholder={language === "english" ? "Name" : "করদাতার নাম"}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tin"
            placeholder={language === "english" ? "TIN" : "টিআইএন"}
            value={formData.tin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <h3>{language === "english" ? "Income Details" : "মোট আয়ের বিবরণী"}</h3>
          <input
            type="number"
            name="totalIncome.rentIncome"
            placeholder={language === "english" ? "Income from Rent" : "ভাড়া হইতে আয়"}
            value={formData.totalIncome.rentIncome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalIncome.agricultureIncome"
            placeholder={language === "english" ? "Income from Agriculture" : "কৃষি হইতে আয়"}
            value={formData.totalIncome.agricultureIncome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalIncome.businessIncome"
            placeholder={language === "english" ? "Income from Business" : "ব্যবসায় হইতে আয়"}
            value={formData.totalIncome.businessIncome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalIncome.capitalIncome"
            placeholder={language === "english" ? "Capital Income" : "মূলধনি আয়"}
            value={formData.totalIncome.capitalIncome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalIncome.financialIncome"
            placeholder={language === "english" ? "Income from Financial Assets" : "আর্থিক পরিসম্পদ হইতে আয়"}
            value={formData.totalIncome.financialIncome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalIncome.otherIncome"
            placeholder={language === "english" ? "Other Income" : "অন্যান্য উৎস হইতে আয়"}
            value={formData.totalIncome.otherIncome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalIncome.foreignIncome"
            placeholder={language === "english" ? "Foreign Income" : "বিদেশে অর্জিত করযোগ্য আয়"}
            value={formData.totalIncome.foreignIncome}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>{language === "english" ? "Tax Calculation" : "কর পরিগণনা"}</h3>
          <input
            type="number"
            name="taxDetails.totalTax"
            placeholder={language === "english" ? "Total Tax" : "মোট কর"}
            value={formData.taxDetails.totalTax}
            onChange={handleChange}
          />
          <input
            type="number"
            name="taxDetails.minimumTax"
            placeholder={language === "english" ? "Minimum Tax" : "ন্যূনতম কর"}
            value={formData.taxDetails.minimumTax}
            onChange={handleChange}
          />
          <input
            type="number"
            name="taxDetails.turnoverTax"
            placeholder={language === "english" ? "Turnover Tax" : "টার্নওভার কর"}
            value={formData.taxDetails.turnoverTax}
            onChange={handleChange}
          />
          <input
            type="number"
            name="taxDetails.payableTax"
            placeholder={language === "english" ? "Payable Tax" : "প্রদেয় কর"}
            value={formData.taxDetails.payableTax}
            onChange={handleChange}
          />
          <input
            type="number"
            name="taxDetails.environmentSurcharge"
            placeholder={language === "english" ? "Environment Surcharge" : "পরিবেশ সারচার্জ"}
            value={formData.taxDetails.environmentSurcharge}
            onChange={handleChange}
          />
          <input
            type="number"
            name="taxDetails.interestPenalty"
            placeholder={language === "english" ? "Interest/Penalty" : "বিলম্ব সুদ/জরিমানা"}
            value={formData.taxDetails.interestPenalty}
            onChange={handleChange}
          />
          <input
            type="number"
            name="taxDetails.totalPayableTax"
            placeholder={language === "english" ? "Total Payable Tax" : "মোট প্রদেয় কর"}
            value={formData.taxDetails.totalPayableTax}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>{language === "english" ? "Tax Payment Details" : "কর পরিশোধ বিবরণী"}</h3>
          <input
            type="number"
            name="paymentDetails.withholdingTax"
            placeholder={language === "english" ? "Withholding Tax" : "উৎসে কর্তিত কর"}
            value={formData.paymentDetails.withholdingTax}
            onChange={handleChange}
          />
          <input
            type="number"
            name="paymentDetails.advanceTax"
            placeholder={language === "english" ? "Advance Tax" : "পরিশোধিত অগ্রিম কর"}
            value={formData.paymentDetails.advanceTax}
            onChange={handleChange}
          />
          <input
            type="number"
            name="paymentDetails.refundAdjustment"
            placeholder={language === "english" ? "Refund Adjustment" : "প্রত্যর্পণযোগ্য করের সমন্বয়"}
            value={formData.paymentDetails.refundAdjustment}
            onChange={handleChange}
          />
          <input
            type="number"
            name="paymentDetails.remainingTax"
            placeholder={language === "english" ? "Remaining Tax" : "অবশিষ্ট কর"}
            value={formData.paymentDetails.remainingTax}
            onChange={handleChange}
          />
          <input
            type="number"
            name="paymentDetails.finalPayment"
            placeholder={language === "english" ? "Final Payment" : "প্রদত্ত কর"}
            value={formData.paymentDetails.finalPayment}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {language === "english" ? "Submit Tax Return" : "কর দাখিল করুন"}
        </button>
      </form>
    </div>
  );
};

export default TaxFilingForm;
