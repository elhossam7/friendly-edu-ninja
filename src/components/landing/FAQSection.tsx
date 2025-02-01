import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How long does it take to set up EduManager?",
      answer: "Setup typically takes less than an hour. Our step-by-step wizard guides you through the entire process, from institution registration to system configuration."
    },
    {
      question: "Is my data secure with EduManager?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your data. All information is stored in secure, encrypted databases."
    },
    {
      question: "Can I import existing student data?",
      answer: "Yes, EduManager supports bulk import of student data via CSV files. Our support team can assist you with the data migration process."
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#9b87f5]" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};