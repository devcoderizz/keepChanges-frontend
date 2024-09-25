import React from 'react';

const FAQs = () => {
  const faqs = [
    {
      question: "What is a fundraising campaign?",
      answer: "A fundraising campaign is an effort to gather monetary contributions from individuals or organizations to support a specific cause or project.",
    },
    {
      question: "How can I start a fundraising campaign?",
      answer: "To start a fundraising campaign, you need to create an account, click on 'Start a Campaign', and fill in the necessary details including your cause, target amount, and campaign duration.",
    },
    {
      question: "What types of causes can I raise funds for?",
      answer: "You can raise funds for medical bills, education, charity, personal needs, and other important causes as per our terms and conditions.",
    },
    {
      question: "How do I withdraw the funds I raised?",
      answer: "Once your fundraising campaign ends or meets its target, you can request a withdrawal from your campaign dashboard. The funds will be transferred to your linked bank account.",
    },
    {
      question: "Is there a fee for using the platform?",
      answer: "Yes, we charge a small platform fee of 5% on the total funds raised to cover operational costs. Payment gateway fees may also apply.",
    },
    {
      question: "How can donors contribute to a campaign?",
      answer: "Donors can contribute to your campaign by visiting your campaign page and selecting the 'Donate Now' button. They can make payments through various payment options such as credit cards, debit cards, and UPI.",
    },
    {
      question: "Can I track the progress of my fundraising campaign?",
      answer: "Yes, you can track the progress of your campaign through the campaign dashboard, which shows the total amount raised, the number of donors, and other important metrics.",
    },
    {
      question: "Are donations tax-deductible?",
      answer: "Donations may be tax-deductible depending on the country and the type of organization. We recommend consulting with a tax advisor for specific details.",
    },
    {
      question: "What happens if I don't reach my target amount?",
      answer: "If you don't reach your target amount, the funds raised will still be available for withdrawal, depending on the terms of your campaign. Some campaigns may be set to 'all or nothing', in which case no funds will be collected unless the target is met.",
    },
    {
      question: "Who can I contact for further support?",
      answer: "If you need additional support, please reach out to our customer service team at support@fundraisingwebsite.com.",
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
