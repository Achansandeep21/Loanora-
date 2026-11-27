import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./HomePage.css";
import Navbar from "./Navbar";

const HomePage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const { hash } = useLocation();

  const features = [
    { icon: "₹", title: "Loan Amount", value: "₹50,000 - ₹25 Lakhs" },
    { icon: "%", title: "Interest Rate", value: "Starting from 10.5% p.a." },
    { icon: "◷", title: "Loan Tenure", value: "12 - 60 Months" },
    { icon: "✓", title: "Approval", value: "Quick Processing" },
  ];

  const benefits = [
    ["⚡", "Quick Approval", "Get your loan application processed quickly."],
    ["📄", "Minimal Documents", "Simple documentation and verification."],
    ["💰", "Flexible Loan Amount", "Choose a loan amount that suits your needs."],
    ["📅", "Flexible Repayment", "Select a repayment tenure that works for you."],
  ];

  const steps = [
    ["01", "Apply Online", "Fill in your personal and loan details."],
    ["02", "Document Verification", "Submit the required documents."],
    ["03", "Loan Approval", "Your application is reviewed."],
    ["04", "Get Funds", "Receive the approved loan amount."],
  ];

  const faqs = [
    {
      question: "What is a personal loan?",
      answer:
        "A personal loan is an unsecured loan that can be used for medical expenses, education, travel, home renovation and other personal needs."
    },
    {
      question: "What is the minimum salary required?",
      answer:
        "The minimum income requirement depends on the lender, employment type and location."
    },
    {
      question: "Do I need collateral?",
      answer:
        "No. A personal loan is generally unsecured and does not require property or other collateral."
    },
    {
      question: "How can I apply for a personal loan?",
      answer:
        "You can apply online by providing your personal details, employment information and required documents."
    },
    {
      question: "Can I repay my loan early?",
      answer:
        "Prepayment and foreclosure options depend on the lender's terms and conditions."
    },
  ];
  useEffect(() => {
    if (!hash) return undefined;

    const sectionId = decodeURIComponent(hash.slice(1));
    const timeoutId = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [hash]);

  return (
    <div className="loan-page">
      <Navbar />
      {/* Hero */}
      <section className="loan-hero" id="home">
        <div className="loan-hero-content">
          <span className="eyebrow">PERSONAL LOAN</span>
          <h1>
            Make Your Dreams
            <br />
            <span>Come True With Us.</span>
          </h1>
          <p>
            Get financial support when you need it.
            Enjoy flexible repayment options and a simple
            online application process.
          </p>

          <div className="hero-buttons">
            <a href="/loan-menu" className="apply-btn">Apply For Loan →</a>
            <a href="#features" className="outline-btn">Explore Features</a>
          </div>

          <div className="hero-note">
            ✓ Simple Application &nbsp; ✓ Flexible Tenure
          </div>
        </div>

        <div className="loan-hero-visual">
          <div className="hero-circle">
            <div className="money-card">
              <div className="money-card-top">
                <span>PERSONAL LOAN</span>
                <span>✦</span>
              </div>
              <div className="money-symbol">₹</div>
              <h2>₹25,00,000</h2>
              <p>Financial freedom starts here</p>
              <div className="money-card-bottom">
                <span>Loanora </span>
                <span>•••• 2048</span>
              </div>
            </div>
            <div className="floating-tag">Quick & Easy Process</div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="loan-features" id="features">
        <div className="section-heading">
          <span className="eyebrow">LOAN AT A GLANCE</span>
          <h2>Personal Loan Features</h2>
          <p>Everything you need to know before applying.</p>
        </div>

        <div className="feature-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <p className="disclaimer">
          *Illustrative loan terms only. Actual rates, amounts and charges
          depend on lender policies and applicant eligibility.
        </p>
      </section>

      {/* Benefits */}
      <section className="loan-benefits" id="benefits">
        <div className="section-heading">
          <span className="eyebrow">WHY CHOOSE US</span>
          <h2>Benefits of Personal Loan</h2>
          <p>Simple borrowing with a customer-first approach.</p>
        </div>

        <div className="benefit-grid">
          {benefits.map((item, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-icon">{item[0]}</div>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="eligibility-section" id="Eligibility">
        <div className="eligibility-content">
          <span className="eyebrow">CHECK BEFORE APPLYING</span>
          <h2>Personal Loan Eligibility</h2>
          <p>
            Applicants generally need to meet the following criteria.
            Final eligibility depends on the lender.
          </p>

          <ul className="eligibility-list">
            <li>✓ Applicant must be at least 21 years old.</li>
            <li>✓ Must have a regular source of income.</li>
            <li>✓ Salaried or self-employed applicants may apply.</li>
            <li>✓ Must maintain a satisfactory credit history.</li>
            <li>✓ Must meet the lender's income requirements.</li>
          </ul>

          <a href="/apply" className="apply-btn">Check Eligibility →</a>
        </div>

        <div className="eligibility-box">
          <div className="eligibility-box-icon">✓</div>
          <h3>Ready to Apply?</h3>
          <p>Check your eligibility and start your loan application.</p>
          <a href="/loan-menu">Start Application →</a>
        </div>
      </section>

      {/* Documents */}
      <section className="documents-section">
        <div className="section-heading">
          <span className="eyebrow">DOCUMENTATION</span>
          <h2>Documents Required</h2>
          <p>Keep these documents ready for a smoother application.</p>
        </div>

        <div className="document-grid">
          <div className="document-card">
            <span>🪪</span>
            <h3>Identity Proof</h3>
            <p>PAN Card, Aadhaar Card or other accepted ID.</p>
          </div>
          <div className="document-card">
            <span>🏠</span>
            <h3>Address Proof</h3>
            <p>Aadhaar, passport or other accepted address proof.</p>
          </div>
          <div className="document-card">
            <span>💼</span>
            <h3>Income Proof</h3>
            <p>Recent salary slips or income documents.</p>
          </div>
          <div className="document-card">
            <span>🏦</span>
            <h3>Bank Statement</h3>
            <p>Recent bank statements as requested by the lender.</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <div className="section-heading">
          <span className="eyebrow">SIMPLE PROCESS</span>
          <h2>How It Works</h2>
          <p>Four simple steps to apply for your personal loan.</p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div className="process-card" key={index}>
              <div className="step-number">{step[0]}</div>
              <h3>{step[1]}</h3>
              <p>{step[2]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-heading">
          <span className="eyebrow">HAVE QUESTIONS?</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() =>
                  setActiveFaq(activeFaq === index ? null : index)
                }
                aria-expanded={activeFaq === index}
              >
                {faq.question}
                <span>{activeFaq === index ? "−" : "+"}</span>
              </button>

              {activeFaq === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="loan-cta">
        <h2>Need Financial Support?</h2>
        <p>Take the next step towards achieving your goals.</p>
        <a href="/apply" className="cta-button">Apply For Personal Loan →</a>
      </section>

      {/* Footer */}
      <footer className="loan-footer" id="contact">
        <div>
          <h2><span>Easy</span>Loan.</h2>
          <p>Your trusted partner for financial solutions.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/loan-menu">Loan</a>
          <a href="/login">Login</a>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>Email: supporteasy@example.com</p>
          <p>Phone: +91 8374542928</p>
        </div>
        <div>
          <h3>Legal</h3>
          <a href="#contact">Privacy Policy</a>
          <a href="#contact">Terms & Conditions</a>
        </div>
      </footer>

      <div className="copyright">
        © 2026 Loanora . All Rights Reserved.
      </div>
    </div>
  );
};

export default HomePage;
