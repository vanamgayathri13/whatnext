"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "How accurate are WhatNext's career recommendations?",
    answer:
      "Our AI-powered assessment has a 95% accuracy rate based on student feedback and long-term career satisfaction tracking. We continuously improve our algorithms using machine learning and real-world career outcome data.",
  },
  {
    question: "Is WhatNext suitable for students in all grades?",
    answer:
      "WhatNext is primarily designed for students in grades 9-12, but we also provide guidance for college students and young professionals looking to make career transitions. Our assessments are age-appropriate and grade-specific.",
  },
  {
    question: "How does the parent-child alignment feature work?",
    answer:
      "Both students and parents take separate assessments, and our AI analyzes the responses to identify areas of alignment and potential conflicts. We then provide recommendations for family discussions and compromise solutions.",
  },
  {
    question: "What makes WhatNext different from other career guidance platforms?",
    answer:
      "WhatNext combines AI-powered assessments, interactive stream simulations, personalized mentorship, and family alignment analysis. We're specifically designed for the Indian education system and job market.",
  },
  {
    question: "How much does WhatNext cost?",
    answer:
      "We offer a free basic assessment and career exploration tools. Premium features including detailed roadmaps, unlimited mentorship, and advanced analytics are available through our subscription plans starting at ₹999/month.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for all premium subscriptions. If you're not completely satisfied with our service, we'll provide a full refund within the first 30 days.",
  },
  {
    question: "How do I get started with WhatNext?",
    answer:
      "Simply sign up for a free account, complete our initial assessment, and start exploring career options. The entire process takes about 30-45 minutes and provides immediate insights into your career preferences.",
  },
  {
    question: "Do you provide support for studying abroad?",
    answer:
      "Yes, our platform includes guidance for international education opportunities, including university selection, application processes, and career prospects in different countries.",
  },
]

export function ContactFAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Got Questions?
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                We Have Answers
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to the most common questions about WhatNext and our career guidance services.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-semibold">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* Still Have Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help you with any questions about
                WhatNext and career guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Contact Support
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Link href="/auth/login">
                  <Button variant="outline" className="bg-transparent">
                    Try WhatNext Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
